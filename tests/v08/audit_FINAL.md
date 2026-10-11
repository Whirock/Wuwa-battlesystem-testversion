# test.8 independent candidate QA

Final frozen aggregate: PASS, 28/28 commands, 81.586 seconds, 234 runtime and asset files with identical before/after SHA-256. `audit_results.json` is authoritative. Retains all 20 test.7 aggregate commands plus eight test.8 suites. Do not add overlapping suite assertions into a misleading unique test total.

Independent focused suites: 17 party-control cases, 11 real-app/fake-IndexedDB appearance cases, 13 layout/async-callback cases, 9 icon/XSS/HUD cases. Supplementary implementation suites were rerun independently inside the same frozen aggregate: 12 appearance snapshots, 8 scale contracts, 20 icon contracts and 5 actual-app icon integration checks.

One defect independently found and repaired: repeating the original Done handler after picker dismissal used its cleared appearance draft and erased the newly accepted skin. The closed-picker/draft guard now makes repeated completion idempotent, and the failing case passes. Real pointer double-click dismissal is not separately certified; see browser report.

The old test.7 app XSS test had three blanket `img` selectors updated to allow only generated static icon classes. No tests were removed; existing literal-text/event/script checks remain. `audit_test7_xss_adaptation.diff` records the exact change. The new independent suite enforces a fixed local image allowlist and checks hostile strings spoofing those icon classes.

Real cloud Chrome: core four requested changes, 1366x768 and1920x1080 desktop CSS layouts,390x844 narrow controls/scrolling, live skin pixels, nested cancellation, keyboard focus/navigation, one real preset+reload, workbench synchronization, explicit preset restore and next-encounter appearance all passed.26 real rendered scale samples were individually viewed. Precise scope, metadata-only deployment difference, private screenshot hashes and an unexecuted supplemental HUD inspection appear in `audit_browser_results.json`.

First aggregate had all27 commands pass but correctly failed the freeze gate when SOURCES.json changed; it remains in `audit_results_source_drift.json`. The pre-metadata28-command pass remains in `audit_results_pre_metadata.json`. The pre-publication-doc result remains in `audit_results_pre_publication_docs.json`. Final result was rerun after publication-document updates at 2026-10-11T11:25:09.781Z, with zero drift. Relative to the previous passing aggregate, only assets/ui-icons/ICON_USAGE.md and assets/ui-icons/SOURCES.json changed. Browser coverage and all explicitly unexecuted items are unchanged.

No public release, native Windows, actual audio, physical mobile, exhaustive accessibility, final balance or user artwork acceptance is claimed.
