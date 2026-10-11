# test.7 rendered-browser verification

Result: passed within the scope recorded in `coverage.json`. Final long-name CSS fix and r004 clothing assets were rechecked. No blocking issue remains in the tested scope.

- Real Chrome: top-level 1180 × 757, plus measured iframe CSS viewports 1366 × 768, 1920 × 1080, 2048 × 949 and 390 × 844. These are not physical mobile-device tests.
- Actual editor → catalog → party → encounter → skill/attack/guard → save → reload → export completed.
- Party, picker, role detail, stage and creation views were visually reviewed at all four iframe sizes. Keyboard and top-level mouse operations were exercised.
- 40 real-rendered appearance samples were visually reviewed. Separately, all 280 combinations returned nonempty bounded output with zero errors. This is not 280 individual visual approvals.
- Artificial imported snapshots covered both bodies' injury/down/guard views, old Amy mecha head clearance, long names/descriptions and 1,025-status pagination. See the explicit fixture caveats in the JSON.
- The 40-character side-card overflow found during this review was repaired without shortening input and passed desktop/mobile real-browser retests.

## Reproduce manually

Serve the release root using the normal offline launcher or another local static server. Use browser viewport emulation or a same-origin iframe with the exact CSS dimensions above. Create and save a character through the three editor tabs, apply it to a team, choose Crownless, execute actions, save and refresh. Check numeric commit, undo, incomplete input, break-limit confirmation and safe literal strings.

The compressed JSON files in `fixtures/` are synthetic test projects. Decompress using any gzip tool, then use Asset Workbench → Project / Cache → Import Project. Import replaces only the current local test project; export anything you want to keep first. No fixture implies naturally attained injuries, energy or status stacks. Fixture SHA-256 values are recorded in `coverage.json`.

For art checks, `CreationArt.render(appearance, pose)` and `CreationArt.portrait(appearance)` are the same renderer used by the application. Test two body profiles, seven hair IDs, four iris IDs and five poses using the supplied data enums; verify actual canvases visually and bounds separately.

Screenshots and raw browser snapshots are deliberately excluded from the public package. `coverage.json` records precise outcomes and source hashes. Audio playback, Windows execution, full accessibility, physical mobile interaction and final balance remain outside this result.
