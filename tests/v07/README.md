# test.7 independent integration QA

Copy this complete directory to tests/v07 in the release. It is self-contained apart from the bundled game and existing tests/independent/v02 dependency lock/fixtures and retained tests/v06 rule suites. No Git, network, private thread, Library or outside-workspace source is required.

From release root:

    npm ci --ignore-scripts --prefix tests/independent/v02
    node tests/v07/run_all.cjs > tests/v07/results.json

Use Node 20+ (verified Node 24). The runner rejects source changes during its run. CreationArt is deliberately disabled in mechanics/persistence DOM tests; art-registration tests inject a synthetic renderer only to test atomic registration and stale-import handling. None of these checks certifies artwork. Real pixels, raster assembly, browser layout and actual keyboard/mouse are covered separately, never inferred from these results.

The baseline-test6-runtime.json.gz contains four frozen public test.6 source files and verifies their SHA-256 before materializing an owned temporary directory; the directory is cleaned on exit. baseline-creation-attributes.json.gz freezes the published numeric candidate table only. baseline-contract.json retains authored role/encounter identities and all 191 existing image hashes. New images are permitted; existing image replacements require an explicit reviewed baseline change.

The old copy_purity/mechanics_identity/test5_identity/version/storage/setup-screen gates are intentionally superseded for test.7. They remain unchanged as historical test.6 evidence. The new suite replaces their relevant obligations with exact authored parameter/image retention apart from the six explicitly reviewed metadata leaves in approved-parameter-metadata.json, 189 old/new battle differentials, new-party roster/menu tests, test.7 schema/namespace/import tests and custom-schema safety. No silent blanket waiver is used. Unchanged core/effect/card/BP/full-team-matrix/victory tests still run.

A finite very large construction is not called an infinite loop. Capacity tests allow bounded complete execution or an explicit preflight/transactional rejection that leaves all state unchanged. A deliberately synthesized 12-target fixture is identified as such, not as a natural 12-unit victory or UI layout certification.
