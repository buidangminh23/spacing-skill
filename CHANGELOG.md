# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-06-29

### Added
- **§15 Continuous Improvement — the field-learnings loop.** The skill now
  improves from use: every real spacing/alignment edit is captured in
  `LEARNINGS.md` (Space Read + real numbers + a `covered` / `gap` / `refinement`
  verdict), and lessons that generalize are distilled back into §0–§14 with a
  version bump. README section count 15 → 16.
- **`LEARNINGS.md`** — append-only field journal that seeds the loop, kept out of
  the context-loaded `SKILL.md` so it can grow without bloating the skill.

## [2.1.0] - 2026-06-21

### Added
- **§14 Document & Long-Form (Word / Google Docs / PDF / Markdown)** — page margins
  (academic / business / bound), measure in documents, line-spacing presets, the
  indent-vs-space single-separator rule, heading styles with asymmetric spacing,
  lists/quotes/tables in prose, print pagination (widow/orphan, keep-with-next),
  a concept→tool mapping table (CSS / Word / Docs / Markdown), and a document
  pre-flight checklist. Scope and description broadened to cover written documents.

## [2.0.1] - 2026-06-21

### Removed
- All references to other skills from the README and SKILL.md.

### Fixed
- Applied a 4-lens adversarial review (accuracy / coherence / intelligence / completeness).
  - Snapped off-scale recipe values to the scale (inline inset `28→24`; landing `clamp()` MAX `200/80 → 160/64`, now with the required `rem` term).
  - Reconciled the optical-nudge ceiling to a single value (≤4px) across §2.D / §7 / §11.
  - Added the DENSITY computation rule (start at range midpoint → sum §1.B deltas → clamp `[1,10]`; content shifts override the surface band) and override-clamp semantics.
  - Mapped the modular-scale ratio to DENSITY; clarified derived control insets, baseline-RIGOR precedence, and the Material line-box note.

### Added
- New coverage: chart/data-viz spacing, scroll-padding/scroll-margin under sticky headers, forced-colors/dark-mode, motion, print/email, intrinsic sizing, multi-line wrap gaps, and intentional truncation.

## [2.0.0] - 2026-06-21

### Changed
- Substantial rewrite into the most complete edition (14 sections). Built from a
  multi-agent research pass across 12 spacing/alignment dimensions, synthesized
  into one coherent skill. Install name unchanged (`design-spacing-rhythm`).

### Added
- **§0 Space Inference** — signals, the one-line "Space Read", anti-default discipline.
- **§4 Layout grid & alignment** — 12-col grid, measure (45–75ch), flex/grid alignment toolkit, subgrid for aligned card internals.
- **§9 Accessibility floors** — verified WCAG numbers: 2.5.8 (24px AA) + spacing exception, 2.5.5 (44px AAA), 1.4.12 text-spacing, 1.4.10 reflow at 320px, focus-ring spacing; Apple 44pt / Material 48dp.
- **§12 Implementation per stack** — Tailwind, plain CSS, MUI/Chakra/Radix/shadcn, design tokens, debugging.
- **§13 Operating procedure** — 8-step pipeline, conversational override protocol, full pre-flight checklist.
- Expanded scale (px-keyed, Tailwind-aligned), primitive vs semantic tokens, modular-scale macro tier, container queries, fluid `clamp()` spacing, logical properties, safe-area insets, and a 14-row anti-pattern catalog.

## [1.0.0] - 2026-06-21

### Added
- Initial release of `spacing-skill` (`design-spacing-rhythm`).
- Three-dial configuration: `SPACING_STEP`, `DENSITY`, `ALIGNMENT_RIGOR`.
- Single Tailwind-compatible spacing scale (no magic numbers).
- Sections: space inference, spacing primitives, vertical rhythm, whitespace
  hierarchy, optical alignment, responsive spacing, component recipes,
  anti-pattern catalog, pre-flight checklist, and stack-specific notes.
- Claude Code plugin manifests (`.claude-plugin/plugin.json`,
  `.claude-plugin/marketplace.json`).
