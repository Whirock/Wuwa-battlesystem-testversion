# test.8 independent candidate audit

This is candidate QA, not a publication or final artwork approval. Tests are independent of the supplementary implementation tests. Existing test.7 tests are retained, with one documented XSS-selector adaptation allowing verified static icon images. See `audit_test7_xss_adaptation.diff` and its JSON rationale; the new independent icon suite also checks a strict source allowlist and hostile forged-class strings.

## Reproduce

From the release root with Node 20+:

    npm ci --ignore-scripts --prefix tests/independent/v02
    node tests/v08/audit_run_all.cjs > tests/v08/audit_results.json

The runner checks source SHA-256 before and after all commands and fails on drift. It includes the entire 20-command test.7 regression suite plus eight test.8 suites; it does not silently replace previously passing gates. A final frozen run must be repeated after any implementation change.

## Acceptance matrix

1. Body scale: each existing character and selectable skin uses the same body-height target and ground line rather than fitting transparent canvas extents. Verify real draw calls and metadata bounds separately from browser appearance. Keep head, feet, hair, weapons, and authored non-mirrored facing visible. Portraits retain their own authored crop.
2. Role detail: show a real full-body preview; switch only legal cosmetic skins; preview changes without starting a battle. In a picker, edits stay in its own draft. Returning from detail preserves that draft; cancelling the picker discards appearance, modes and team changes. Cancelling party discards its draft. Applying party persists it for the next encounter and leaves the active engine snapshot untouched.
3. Quick picker: role-detail button precedes mode or gender controls in DOM and visual order. Repeated gender clicks are idempotent and do not select, deselect, duplicate, or re-order a character. The four Rover elements share one identity and one appearance; switching gender preserves the selected clothing family. Selected and unselected character appearance edits are retained after completing the picker. Amy/Denia temporary battle transformations cannot become cosmetic starting forms.
4. Saved icons: use verified saved Wuwa icons for covered attributes. No inferred official provenance. Missing or unmapped icons retain explicit fallback behavior. Verify local files, valid dimensions, mapping completeness and browser visibility without treating a source-code string as visual evidence.

## Persistence and interruption matrix

- Save all five presets with distinct appearance snapshots, reload storage, restore the exact selected snapshot.
- Workbench `Set as current appearance` synchronizes current project and applied party appearance without rewriting saved presets. An explicit preset load intentionally restores that preset's snapshot.
- Old test.7 project and pre-test.7 migration keep supported appearance data. Invalid appearance imports reject atomically.
- Repeated Apply/Save/Done events, cancel via footer, close button, Escape, role detail return, rejected discard confirmation, reopen.
- Delayed older image success and failure, detached preview canvases, newer skin selection, synthetic creation-art completion. A stale completion cannot draw over the latest preview.
- All nine authored configurations, 61 skills, seven encounters, 191 existing PNG bytes, battle rules, creation editor, degradation receipts and old/new mechanics differentials remain covered by retained test.7 regression with the documented icon-image selector adaptation.

## Required real-browser stage

Use a real Chrome session for this stage. Desktop CSS viewports 1920x1080 and 1366x768 plus 390x844 narrow layout. Capture party body comparison, role-detail before/after skin switch, picker mode/gender order, applied result and storage reload. Check mouse/keyboard navigation, scrolling, no clipping or horizontal overflow, focus returns, and Escape cancellation. Real images are inspected manually; DOM and mocked canvas tests do not certify pixels, layout, mobile hardware, audio, Windows launch, battle balance or final user art approval.

Results and browser evidence must state exact tested source hashes and distinguish PASS, FAIL and NOT RUN.
