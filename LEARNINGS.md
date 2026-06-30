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

### 2026-06-30 — Personal-Web / policy page → sidebar policy hub — §4 grid + sticky sidebar + tab nav (covered)
- Space Read: docs/policy hub · balanced · STEP 8 · DENSITY 4 · RIGOR 7 · two-col `[280px_1fr]`, sticky menu (top-24), one section shown at a time
- Did: redesigned `/chinh-sach` to breadcrumb + title, `lg:grid-cols-[280px_1fr]` gap-12, sticky left menu (`lg:sticky lg:top-24 lg:self-start`) with numbered active-highlight items, content card `p-10`. Menu collapses to horizontal pill tabs on mobile (`flex overflow-x-auto` → `lg:flex-col`). Active section tied to URL hash so footer `#hoan-tien` opens the right tab.
- Taught: nothing new — §4 layout grid + sticky-aside pattern + §10 nav/section recipe applied to a CellphoneS-style policy hub. Mobile menu = compressible layout region (§8.B) so it drops to a scroll-row.
- Verdict: covered
- Action: none

### 2026-06-30 — Personal-Web / shared footer + policy page — §6 ladder + §10 footer recipe + §4 measure (covered)
- Space Read: site footer (utility) · balanced · STEP 8 · DENSITY 4 · RIGOR 7 · group↔group 40px > intra 8–12px; policy = long-form, measure ~70ch
- Did: shared Footer (brand / 3 policy links / 6 payment logos / copyright) with proximity ladder — link list `gap-2.5` (10) < column groups `gap-10` (40) < copyright divider `pt-6` (24) after `border-t`; `py-12` footer band (lighter than the `py-24` CTA above it). Policy page `max-w-3xl` (~70ch), section `gap-14`, bullet list `gap-3.5`, heading↔items `mt-5`, `scroll-mt-28` for anchored links.
- Taught: nothing new — textbook §6 proximity ladder, §10 footer/section recipe, §4 measure for the long-form policy. No skill gap.
- Verdict: covered
- Action: none

### 2026-06-30 — Personal-Web / footer CTA heading — tight display leading collides Vietnamese diacritics → folded into §5.A
- Space Read: marketing closing-CTA · airy · STEP 8 · DENSITY 2 · RIGOR 4 · two-line VN display heading must clear stacked tone marks
- Did: heading `leading-[0.95]` → `leading-[1.1]` across the footer CTA + 4 section headings (footer later nudged to `1.2`); the dot-below on line 1 (`TẠO`/`TUYỆT`) was touching the circumflex/breve on line 2 (`ĐIỀU`/`Ờ`/`Ệ`).
- Taught: Vietnamese (and Thai / Arabic / Devanagari) caps stack marks both above AND below; sub-1.05 display leading that is fine for Latin all-caps collides marks between wrapped lines. The floor is set by content language, not aesthetics, and stays latent until the heading wraps to two lines.
- Verdict: gap(§5.A)
- Action: folded into §5.A @ v2.3.0 — also added anti-pattern #15.

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
