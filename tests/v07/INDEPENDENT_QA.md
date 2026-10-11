# test.7 independent integration audit

Status: final 20-command frozen aggregate passed with no source drift (72.774 seconds). Real-browser coverage completed as separately documented in tests/v07/browser/coverage.json. No blocking issue remains in the tested scope. This is not final balance certification.

## Historical baseline and migration

The unmodified test.6 copy passed all 24 historical aggregate commands before changes. The test.7 gate explicitly replaces obsolete copy/version/storage/setup assertions rather than silently dropping them. Retained engine/effect/card/BP/battle-matrix/victory checks still run.

Authored content retention: 9 role configurations, 61 cards, 7 encounters, 191 mapped PNGs. Existing image bytes are unchanged. Exactly six reviewed parameter metadata leaves changed; schema_version and authored mechanical values did not change. parameters.js agrees with parameters.json.

A frozen test.6 runtime is bundled in a hash-checked compressed fixture. 189 old/new scenarios across 9 profiles, 7 encounters and levels 1/20/90 produced 5,126 identical paired actions and equivalent engine state/logs apart from presentation text.

## Focused independent checks

- 112 creation core contracts: strict parsing, normal clamp, break-limit semantics, schemas, IDs, trusted compilation, growth and finite large values.
- 7,200 frozen attribute-range fields and 45,900 assertions.
- 50 custom runtime contracts: original-action/attack/hit distinction, SP pooling, positive SP exchange through consumed actions, miss semantics, CD, derived-event non-recursion, supported mechanisms and stacking.
- 6 capacity contracts: synthetic 12-target mechanism setup, multi-owner projectile restore, finite heavy success, whole-team capacity preflight, and transactional rollback for player and enemy turns. The 12-target setup is a test fixture, not a claim of a natural 12-unit encounter or UI support.
- 22 creation editor DOM contracts, including raw invalid input retention, field-local undo, blank mechanism rows, switch confirmation, separate character caches and failed persistence receipts.
- 13 party/stage DOM contracts; 13 whole-app/import/persistence contracts.
- 9 original profiles produce all 61 authored menu entries through the new party/stage path. Geometry presence is checked; no real-pixel claim.
- 6 art registration transaction contracts use mocked renderer outputs to verify all-five-pose atomic publication, failure cleanup, stale import suppression and slot pruning. They do not verify art.
- 5 status-capacity contracts under a strict-restored 1,025-status fixture: control-first main list, complete overflow counts, all 43 pages, bounded DOM and state-preserving dismissal. This is not measured browser performance.
- 20 synthetic art-cache lifecycle checks, independently rerun from the creation worker scenarios. Real pixels are not tested here.
- 12 persistence degradation checks under simulated unavailable IndexedDB and quota errors, independently rerun from the UI worker scenarios. Session edits remain exportable and messages do not falsely promise a durable save.

Latest retained focused engine checks: 81 core/effect tests; 413 independent runtime checks including all 61 cards and 238 legal BP variants; 938 full-team matrix battles; 26 effect audit and 23 taunt tests. See the aggregate reports for authoritative command results and source hashes.

## Defects found and verified repaired

Strict record IDs; fixed-pool conditional SP distribution; immune-target taunt gating; snapshot creationRoster boundary; unsafe detail header HTML interpolation; duplicate-label unfinished input restoration; raw input dirty/navigation handling; immune group targets; multi-owner projectile restore; whole-team capacity bound and atomic runtime rollback; defensive snapshot validation across expiring buffs; additive damage and defense windows; cross-character mechanism editing cache isolation.

## Reproduction and limitations

The portable independent suite is installed under tests/v07 in the release. Follow its README and run node tests/v07/run_all.cjs. Its aggregate hashes source before and after to reject mid-run changes. No network or private workspace baseline is needed once the bundled dependencies are installed.

Real-browser CSS viewport, mouse/keyboard, actual creation-to-reload flow, 40 reviewed renderer samples and 280 output-integrity checks passed within the separate browser report. Screenshots remain private local evidence. No actual audio, Windows executable launch, full accessibility audit, exhaustive visual custom-color combinations, human playthrough or final game-balance certification is asserted.
