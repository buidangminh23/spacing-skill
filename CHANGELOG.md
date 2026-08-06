# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.6.1] - 2026-08-06

### Changed
- **§12** — clarified that converting inline layout properties to classes is a
  judgement per site rather than a find-and-replace: the class you move to has
  to carry §8.B's question (what the narrower cell holds), so at least two are
  needed — one that collapses and one that stays two-up. Sending every site to
  the collapsing class reproduces anti-pattern #16. Evidence from one sweep of
  82 sites: 59 collapse, 23 do not.

## [2.6.0] - 2026-08-06

### Added
- **§12 — an inline style outranks every media query** (from a real field bug):
  a layout property written inline (`style={{ gridTemplateColumns: … }}`) has no
  responsive behaviour at all, and the failure is silent — the breakpoint rule
  is written and correct, it fires, and the layout does not move. Measured on
  one app: four dashboards stayed two-column on a phone with the narrow side at
  107px while the collapse rule sat in the stylesheet. The fix is to let the
  inline set a **custom property** and keep the property itself in CSS, since a
  variable does not outrank a media query; `!important` wins at every width
  rather than the one you meant.
- **Anti-pattern #17** — layout property written inline.

## [2.5.0] - 2026-08-06

### Added
- **§8.B — column count follows the narrowest cell, not the grid** (from a real
  field bug): the compressible-vs-not test was written only about *gaps*, while
  §9.D's reflow language invites a blanket `@media (max-width:760px) { .cols-*
  { 1fr } }`. Reflow requires no *horizontal scroll*, not a single column. A
  cell holding one number and its label wants about half a phone's width; a
  cell holding a table, a chart or prose wants all of it. Measured on one
  dashboard: four one-number stat cards took **822px** of a 375px screen before
  any real content, **371px** after the same four went two-up. Target the row
  that holds the small cells (`:has(> .stat)`, or a modifier class as fallback)
  rather than the breakpoint as a whole.
- **Anti-pattern #16** — blanket one-column collapse on mobile.

## [2.4.1] - 2026-07-04

### Added
- **§9.D — scroll-region overflow** (from a real field bug): an intentional
  `overflow-x-auto` scroller (pill nav, toolbar, chip row) still blows the page out
  when its wrapper sits in an `auto`-sized grid/flex track — the track grows to the
  scroller's max-content and the scroll never engages. A grid defined with only a
  desktop `lg:grid-cols-[…]` template falls back to an implicit `auto` column on
  mobile. Fix: cap the track with an explicit `grid-cols-1` (`minmax(0, 1fr)`) plus
  `min-w-0` on the item; verify `scrollWidth` at the narrowest width.

## [2.4.0] - 2026-07-04

### Added
- **§9.A — net-zero hit-box expansion.** Reaching the target-size floor by adding
  padding alone spreads a tight control cluster (header icon buttons, a VN/EN toggle)
  and breaks its `gap` rhythm. Pair the padding with an **equal negative margin** so the
  hit box grows while the margin-box — every sibling gap and edge — stays put
  (`-m-2.5 p-2.5` → a 20px icon becomes a 40px target, layout unmoved; `-my-*`/`py-*`
  for a vertical-only grow). Plus: re-anchor an `absolute` badge/dot to an inner
  wrapper around the icon so it doesn't jump to the padded box's corner.

## [2.3.0] - 2026-06-30

### Added
- **§5.A — stacked-diacritic heading floor.** Multi-line headings in scripts whose
  marks stack both above *and* below a letter (Vietnamese, Thai, Arabic, Devanagari)
  must hold line-height ≥ 1.1; display leading under ~1.05 collides an under-dot on
  one line with a circumflex/breve on the next. Gated by content language, not taste.
- **§11 anti-pattern #15** — tight display leading colliding stacked diacritics, with the fix.

## [2.2.1] - 2026-06-29

### Added
- **§9.D — no-wrap overflow guidance** (from a real field bug): `white-space:nowrap`
  stat/KPI values overflow the card when a multi-column metric grid sits inside a
  narrow (`lg:grid-cols-2`) card. Fix: size the value to fit (font cap / fluid
  `clamp()` / container-query) **and** drop columns when the container is narrow;
  verify at the narrowest column, not the widest.

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
