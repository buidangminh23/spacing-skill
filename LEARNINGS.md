# Field Learnings — `design-spacing-rhythm`

Append-only journal for the **§15 Continuous-Improvement loop** in
`skills/spacing-skill/SKILL.md`. Every real spacing/alignment edit lands here as
one dated entry; lessons that generalize are distilled into the skill (with a
`CHANGELOG.md` bump) and then pruned here to a one-line pointer.

> Accessibility floors (§9) outrank any preference recorded in this file. Log
> only edits you actually made — **evidence, not vibes.**

## How to add an entry

1. Make (and ideally render) the spacing/alignment edit.
2. Append one entry at the **top** of *Entries* using the template below.
3. If the verdict is `gap` or `refinement` **and** the lesson generalizes, fold
   it into the right section of `SKILL.md`, bump `CHANGELOG.md`, then replace the
   entry here with a one-line pointer: `→ folded into §n @ vX.Y.Z`.

### Template

```text
### YYYY-MM-DD — <project / surface> — <one-line lesson>
- Space Read: <surface · airy|balanced|packed · STEP · DENSITY · RIGOR · the ratio that mattered>
- Did: <the change + the real numbers>
- Taught: <what the situation revealed>
- Verdict: covered | gap(§n) | refinement(§n)
- Action: none | folded into §n @ vX.Y.Z | pending pattern
```

## Entries

<!-- newest first -->

### 2026-06-29 — Personal-Web / project stat-card grid — bottom-align captions with `flex-1` value, not bare `mt-auto`
- Space Read: stat-card grid · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · captions must baseline-align across the row; tile inset on-scale & uncramped
- Did: per-card `px-2 py-3` → `p-3` (kept `sm:p-4`); added `flex flex-col` to the card and `flex-1` to the value block; value↔label `mt-1` → `mt-2` (4 → 8px). Applied to both stat-grid blocks in `src/App.tsx`.
- Taught: to bottom-align captions across a row of unequal-length values, `flex-col` card + `flex-1` on the value keeps a fixed value↔label min-gap, whereas the bare §4.C `mt-auto`-on-footer collapses that gap to 0 when a row's cards are already equal height (no free space for the auto-margin to absorb).
- Verdict: refinement(§4.C)
- Action: pending pattern — single datapoint; per §15.D, harden into §4.C/§10 only on a repeat.
