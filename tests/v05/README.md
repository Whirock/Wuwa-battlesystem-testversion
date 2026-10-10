# test.5 independent executable regression suite

Run from the repository root:

    npm ci --ignore-scripts --prefix tests/independent/v02
    python -m pip install Pillow
    node tests/v05/run_all.cjs > tests/v05/results/independent_final_full.json

Node.js 24.19.0 is the verified runtime. Node distributions must expose the bundled Acorn parser or have the `acorn` package installed. Python 3 and Pillow are needed for the PNG decoder audit. Runtime app usage does not require any test dependencies.

The runner forces the full runtime matrix on. A source file changed during the run causes the aggregate to fail, even if its individual commands passed.

Coverage retained from test.4:

- 81 core and skill-effect rules
- Frozen independent parameter/growth oracle
- All 61 authored cards and every legal BP tier
- 134 legal team compositions across seven encounters, 938 seeded battles
- Save/restore validation, deterministic continuation and legacy rejection
- Target/branch/R2/Boost/queue/status/import/export interactions
- Natural same-level Dreamless victory replay and PNG decoding

New test.5 gates:

- All 9,867 numeric/boolean/null parameter leaves and all non-presentation identifiers must equal frozen test.4
- Executable AST equivalence outside narrowly named display functions/fields
- 63 paired old/new battle scenarios and 1,434 deterministic actions
- 2,440 description reads without state mutation
- Nine profile menus, 61 authored cards and 244 BP/detail views
- Dynamic BP3 healing, field and branch coefficients in the visible target panel
- test.5 IndexedDB save/clear isolation from test.4
- Enlarged body scaling, proportional viewport-safe boss bounds, projectile visibility and synchronized click/status anchors

`baseline-test4.json.gz` contains only the four frozen public-project baseline files needed to reproduce the mechanics comparison, plus their SHA256 checksums. It is immutable test data. `baseline.cjs` validates these checksums and creates temporary files only when the old engine must be executed; the temporary directory is deleted on normal process exit. Set `TEST4_BASELINE` to an explicit checkout path only when intentionally investigating a different baseline.

`tests/v04` remains historical evidence and is not modified by this suite. Copied assertions are changed only where test.5 intentionally changed display text, project schema, or responsive placement. Mechanical assertions are retained.

jsdom checks execute real app, engine and storage code with canvas/media/clock/IndexedDB doubles. They do not certify actual browser layout, font rendering, audio, accessibility, Windows double-click behavior, human playability or art acceptance. Those require separately identified evidence.
