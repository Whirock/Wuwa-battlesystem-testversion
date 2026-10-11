"""Verify an untouched public package before installing dependencies or running QA.

Both package variants require exact SHA256SUMS tree coverage and asset metadata.
Explicit --repository mode permits retained history outside the active assets tree;
these unlisted files are reported and are not certified by the current release.
The full-source variant also carries tests/build_manifest.json. No gameplay,
rendered-browser, artwork acceptance or source-authenticity claim is made here.
"""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import re
import struct
import sys


def verify(root, repository=False):
    root = root.resolve()
    errors, listed = [], {}
    checked = 0

    def target(relative):
        if not isinstance(relative, str):
            raise ValueError('Path must be a string')
        p = PurePosixPath(relative)
        if not relative or p.is_absolute() or '\\' in relative or '..' in p.parts or str(p) != relative:
            raise ValueError('Unsafe path: ' + relative)
        f = root / relative
        if not f.resolve().is_relative_to(root):
            raise ValueError('Path escapes package: ' + relative)
        if f.is_symlink():
            raise ValueError('Symlink not permitted: ' + relative)
        return f

    def check_entry(entry, label):
        try:
            f = target(entry['path'])
            if not f.is_file() or f.stat().st_size != entry['size']:
                errors.append(label + ' size/missing: ' + entry['path'])
            elif hashlib.sha256(f.read_bytes()).hexdigest() != entry['sha256']:
                errors.append(label + ' hash mismatch: ' + entry['path'])
        except (KeyError, TypeError, ValueError, OSError) as e:
            errors.append(label + ': ' + str(e))

    try:
        for number, line in enumerate((root / 'SHA256SUMS.txt').read_text(encoding='utf-8').splitlines(), 1):
            m = re.fullmatch(r'([0-9a-f]{64})  (.+)', line)
            if not m:
                errors.append('Malformed SHA row ' + str(number))
                continue
            sha, relative = m.groups()
            if relative == 'SHA256SUMS.txt' or relative in listed:
                errors.append('Duplicate/self SHA entry: ' + relative)
                continue
            try:
                f = target(relative)
                listed[relative] = sha
                if not f.is_file():
                    errors.append('Missing: ' + relative)
                elif hashlib.sha256(f.read_bytes()).hexdigest() != sha:
                    errors.append('Hash mismatch: ' + relative)
                checked += 1
            except (ValueError, OSError) as e:
                errors.append(str(e))
    except (OSError, UnicodeError) as e:
        errors.append('Cannot read SHA256SUMS.txt: ' + str(e))
    actual = set()
    for f in root.rglob('*'):
        relative = f.relative_to(root)
        if '.git' in relative.parts:
            continue
        if f.is_symlink():
            errors.append('Symlink in tree: ' + relative.as_posix())
        if f.is_file() and relative.as_posix() != 'SHA256SUMS.txt':
            actual.add(relative.as_posix())
    unlisted = actual - set(listed)
    retained_unverified = sorted(
        relative for relative in unlisted
        if repository and not relative.startswith('assets/'))
    for relative in sorted(unlisted - set(retained_unverified)):
        errors.append('Unlisted file: ' + relative)
    for relative in sorted(set(listed) - actual):
        errors.append('Listed file absent from tree: ' + relative)
    pngs = sorted((root / 'assets').rglob('*.png'))
    try:
        runtime = json.loads((root / 'RUNTIME_ASSETS.json').read_text(encoding='utf-8'))
        for entry in runtime['assets']:
            check_entry(entry, 'RUNTIME_ASSETS')
            if 'width' in entry and 'height' in entry:
                f = target(entry['path'])
                if f.is_file():
                    raw = f.read_bytes()[:24]
                    if len(raw) != 24 or raw[:8] != b'\x89PNG\r\n\x1a\n' or struct.unpack('>II', raw[16:24]) != (entry['width'], entry['height']):
                        errors.append('PNG dimensions/signature mismatch: ' + entry['path'])
        if len(pngs) != runtime['runtime_png_count']:
            errors.append('RUNTIME_ASSETS runtime PNG count mismatch')
        declared_pngs = {entry['path'] for entry in runtime['assets']}
        actual_pngs = {p.relative_to(root).as_posix() for p in pngs}
        if declared_pngs != actual_pngs:
            errors.append('RUNTIME_ASSETS does not cover the exact standalone PNG tree')
    except (OSError, ValueError, KeyError, TypeError) as e:
        errors.append('Cannot validate RUNTIME_ASSETS.json: ' + str(e))
    manifest_path = root / 'tests/build_manifest.json'
    if manifest_path.is_file():
        try:
            manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
            entries = manifest['core'] + manifest['assets'] + manifest.get('archived_assets', [])
            if isinstance(manifest.get('parameter_json'), dict):
                entries.append(manifest['parameter_json'])
            for entry in entries:
                check_entry(entry, 'build_manifest')
            if len(pngs) != manifest.get('runtime_png_count', len(manifest['assets'])):
                errors.append('build_manifest runtime PNG count mismatch')
        except (OSError, ValueError, KeyError, TypeError) as e:
            errors.append('Cannot validate build_manifest: ' + str(e))
    return {'passed': not errors, 'verification_mode': 'repository' if repository else 'package',
            'checked_files': checked, 'runtime_pngs': len(pngs),
            'retained_unverified_extra_count': len(retained_unverified),
            'retained_unverified_extra_files': retained_unverified,
            'scope': ('Listed test.7 files, exact active assets tree and build manifest; retained extra files are not verified.'
                      if repository else 'Exact package file tree, listed hashes, active assets and optional build manifest.'),
            'build_manifest_present': manifest_path.is_file(), 'errors': errors}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository', action='store_true',
                        help='Permit and report unverified retained history outside assets; keep current listed files/assets strict.')
    args = parser.parse_args()
    result = verify(Path(__file__).resolve().parent.parent, repository=args.repository)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    sys.exit(not result['passed'])
