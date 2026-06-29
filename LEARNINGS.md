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

### 2026-06-29 — Personal-Web / stat-card grid — `whitespace-nowrap` values overflow narrow columns → folded into §9.D
- Space Read: stat-card grid · packed · STEP 4 · DENSITY 6 · RIGOR 8 · value must fit its column at the *narrowest* breakpoint
- Did: capped value font `md:text-3xl`(30) → `sm:text-2xl`(24); stat grid `sm:grid-cols-3` → `+ lg:grid-cols-2` (both `MY_CREATED_SKILLS` & `shownAiSkills` blocks sit in `lg:grid-cols-2` cards). Measured 8 values overflowing a 102px column at 1024px (Telegraphic +63, AI→Human +53, SKILL.md +32, Universal +30, …); after fix 0/52 overflow at 375/900/1024/1280.
- Taught: `whitespace-nowrap` + a multi-col stat grid inside a half-width (2-col) card = guaranteed edge overflow at desktop. It hides at wide viewports (columns wide) and bites at the `lg` breakpoint where cards halve but font/columns don't. Always verify at the narrowest column, not the widest.
- Verdict: gap(§9.D)
- Action: folded into §9.D @ v2.2.1 — a clear, visible bug → hardened on first occurrence; it's a failure-mode warning, not a baseline-default change, so §15.D's "wait for a repeat" doesn't gate it.

### 2026-06-29 — Personal-Web / project stat-card grid — bottom-align captions with `flex-1` value, not bare `mt-auto`
- Space Read: stat-card grid · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · captions must baseline-align across the row; tile inset on-scale & uncramped
- Did: per-card `px-2 py-3` → `p-3` (kept `sm:p-4`); added `flex flex-col` to the card and `flex-1` to the value block; value↔label `mt-1` → `mt-2` (4 → 8px). Applied to both stat-grid blocks in `src/App.tsx`.
- Taught: to bottom-align captions across a row of unequal-length values, `flex-col` card + `flex-1` on the value keeps a fixed value↔label min-gap, whereas the bare §4.C `mt-auto`-on-footer collapses that gap to 0 when a row's cards are already equal height (no free space for the auto-margin to absorb).
- Verdict: refinement(§4.C)
- Action: pending pattern — single datapoint; per §15.D, harden into §4.C/§10 only on a repeat.
