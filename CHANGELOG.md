# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
