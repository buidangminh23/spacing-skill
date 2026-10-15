# Implementation

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 12. IMPLEMENTATION PER STACK
- 12.A Vanilla CSS — tokens, aliases, and one gap owner
- 12.B Other stacks and cascade pitfalls

## 12. IMPLEMENTATION PER STACK

The system is stack-agnostic; the expression is not. **One source of truth for spacing per project** — if a token system exists, conform; never author a second scale beside it.

| Stack | Native primitive | SPACING_STEP lever | Forbidden |
|-------|------------------|--------------------|-----------|
| Tailwind v4 | `--spacing` + `p-4`/`gap-6` | redefine `--spacing` in `@theme` | `p-[13px]`, `gap-[15px]` |
| Tailwind v3 | `theme.spacing` | `theme.extend.spacing` | arbitrary `[13px]` |
| Plain CSS | `--space-*` at `:root` | edit the ramp | hard-coded px in rules |
| MUI | `theme.spacing(n)` (factor 8) | `spacing:` factor | raw px in `sx` |
| Chakra | `space` tokens (`gap={4}`) | extend `theme.space` | string `"13px"` props |
| Radix Themes | `gap`/padding props `1–9` | `scaling` on `<Theme>` | inline overrides |
| shadcn/ui | **is Tailwind** | `--spacing` | arbitrary values |

### 12.A Vanilla CSS — tokens, aliases, and one gap owner

Keep the project's existing names. If starting fresh, use one documented convention: `--space-N` means **N times the base step**, matching §2.E (`--space-2` is 16px at STEP 8, not Tailwind's 8px). Do not mix multiplier keys with px keys. Declare the ramp once; semantic aliases express roles and can change for density without a build tool.

```css
:root {
  --space-step: 0.5rem;
  --space-half: calc(var(--space-step) * 0.5);
  --space-1: var(--space-step);
  --space-2: calc(var(--space-step) * 2);
  --space-3: calc(var(--space-step) * 3);
  --space-4: calc(var(--space-step) * 4);
  --detail-inset: var(--space-2);
  --detail-grid-gap: var(--space-2);
  --detail-icon-gap: var(--space-1);
  --detail-label-gap: var(--space-half);
  --contact-group-gap: var(--space-4);
}
.contact-section { display: grid; gap: var(--contact-group-gap); }
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--detail-grid-gap);
}
.detail-card {
  display: flex;
  align-items: flex-start;
  gap: var(--detail-icon-gap);
  padding: var(--detail-inset);
}
.detail-card > .brand-tile { flex: none; }
.detail-copy {
  min-inline-size: 0;
  display: grid;
  gap: var(--detail-label-gap);
}
.detail-copy > * { margin: 0; }
.detail-value {
  white-space: normal;
  word-break: normal;
  overflow-wrap: anywhere;
}
@media (max-width: 40rem) {
  .contact-grid { grid-template-columns: minmax(0, 1fr); }
}
[data-density="compact"] {
  --detail-inset: calc(var(--space-step) * 1.5);
  --detail-icon-gap: var(--space-half);
}
```

The 40rem collapse point is an example: choose it from the actual content's fit, including intermediate widths. Here the grid owns card↔card gaps, the outer section owns grid↔CTA separation, and each card owns icon↔copy and label↔value gaps. Reset margins only on the children whose spacing that container owns; do not zero all document typography. For ordinary block flow or HTML email where `gap` is unavailable, let one sibling rule or table-cell inset own each gap instead; never add a margin to an already gap-separated pair. Use logical properties, and keep icon sizing separate from text wrapping (§7.G, §9.D).

### 12.B Other stacks and cascade pitfalls

- **Tailwind:** the default scale *is* the grid (`--spacing` = 4px). At `SPACING_STEP 8`, prefer even steps (`2,4,6,8,12`). Extend `theme.spacing` only for **named semantic tokens** (`--spacing-section`), never one-off pixels. Own spacing from the parent (`gap` / `space-y-*`), not `mt-*` on every child.
- **Unlayered CSS outranks every layered utility — the same trap one level up from inline styles.** A design system on `@layer` (Tailwind v4 puts every utility in `@layer utilities`) loses to *any* rule written outside a layer, **regardless of specificity**: a bare `input { font: inherit }` beats `.text-input { font-size: 1.375rem }`, because layer order is decided before specificity is ever consulted. This bites hardest in the one place it is most tempting to write plain CSS — the **critical/inline `<style>` block** meant to hold type steady before the main stylesheet lands. Measured on one login screen: an unlayered two-line critical block silently pulled the field from 22px to 18px while every test stayed green, the class was still on the element, and the rule was still in the stylesheet. **Wrap critical CSS in the same base layer the system uses** (`@layer base { … }`) so it keeps its job — supplying defaults — without outranking the utilities layered above it. Grep for a `<style>` that has no `@layer` before trusting any utility it touches; the failure shows up as a value the DOM class says should be different.
  ```css
  @layer base { input, button, select, textarea { font: inherit } }
  ```

- **Print: the `@page` margin box is also the browser's header/footer canvas.** Chrome, Edge and Firefox draw the date, page title, URL and page number *inside* the `@page` margin — they are chrome, not content, so no selector reaches them and `display:none` is useless. The only CSS lever is `@page { margin: 0 }`: with no margin box there is nowhere to draw. The paper whitespace then has to come back as `padding` on the print root. **Scope that to single-page documents only** — `padding` on a root box is not per-page: left/right repeats on every sheet, top/bottom lands only on the first and last, so a multi-page report with `margin: 0` prints its middle pages edge-to-edge and the printer's own hardware margin clips those rows. Use a named page (`@page name { margin: 0 }` + `page: name` on the one-page root) and leave long documents on the default margin. Pick the direction whose failure adds whitespace rather than removes it.

```css
@page slip { size: A4 portrait; margin: 0; }        /* no margin box ⇒ no browser header/footer */
main[data-print-page='slip'] { padding: 10mm; page: slip; }   /* whitespace moves onto the content */
```

- **Only `<input>` visibly changes size when the stylesheet is late.** The UA sheet renders body text at 16px but form controls at ~13.3px, so a page whose CSS arrives late reads as *"the box where you type shrinks, then grows"* while every other line looks roughly right — which is exactly how users report it, and why the bug gets hunted in the field component instead of in CSS delivery. The floor to hold in critical CSS is therefore `font: inherit` on `input, button, select, textarea` plus the body font-size; that alone moved a measured field from 13.3px to 18px against a 22px target, turning a 65% jump into 22%.
- **Inline styles outrank every media query — so a layout property written inline has no responsive behaviour at all.** A JSX `style={{ gridTemplateColumns: '1.5fr 1fr' }}` cannot be collapsed by `@media (max-width: …)`, and nothing warns you: the rule is written, the breakpoint fires, the layout does not move. Measured on one app, four dashboards stayed two-column on a phone with the narrow side at 107px, and the collapse rule had been sitting in the stylesheet the whole time. **Let the inline set a custom property and keep the property itself in CSS** — a variable does not outrank a media query, so the breakpoint stays reachable while a screen can still ask for its own proportions.
  ```css
  .split { display: grid; grid-template-columns: var(--split-main, 1.5fr) 1fr; }
  @media (max-width: 760px) { .split { grid-template-columns: 1fr; } }
  ```
  ```jsx
  <div className="split" style={{ '--split-main': '1.2fr' }}>   {/* not gridTemplateColumns */}
  ```
  **Converting a codebase full of these is a judgement per site, not a find-and-replace** — the class you
  move to has to encode §8.B's question, what the narrower cell holds, so you need at least two: one that
  collapses and one that stays two-up. Sending all of them to the collapsing one reproduces anti-pattern #16.
  Measured on one sweep: 82 sites, 59 collapse and 23 do not.
  The same trap covers any inline `width`, `padding`, `flex-direction` or `gap`. Grep for the property name in markup before trusting a breakpoint: `!important` "fixes" it and is the wrong tool, because it wins everywhere rather than at the breakpoint you meant.
- **Component libs:** use the theme transform (`theme.spacing(2)`, `gap={4}`, Radix `scaling`), never raw px. shadcn = Tailwind rules.
- **Design tokens as SSOT:** if `tokens.json` / Style Dictionary / Figma variables exist, import and reference — if a value isn't in the set, *add a named token*, don't inline a number. Tokens flow one direction: Figma → Style Dictionary → CSS vars / Tailwind theme → components.

**Helper primitives + debugging:**

```css
.stack  { display:flex; flex-direction:column; gap:var(--space-2); }
.inline { display:flex; align-items:center; gap:var(--space-1); flex-wrap:wrap; }
.grid-auto { display:grid; gap:var(--space-6); grid-template-columns:repeat(auto-fill,minmax(16rem,1fr)); }

* { outline: 1px solid rgba(255,0,0,.25); }   /* surface every box: spot off-scale & uneven gaps */
```

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| gap bigger than spec between siblings | double-owned (parent gap + child margin) | remove the child margin |
| inconsistent rhythm down a list | per-child `mt`/`mb` | move to container `gap` |
| value not a step multiple | arbitrary px / off-scale token | snap to nearest rung or add a token |
| collapsing/overlapping vertical margins | adjacent margin-collapse | switch to `gap` on a flex/grid parent |

**Print & email** are distinct spacing environments: `@media print` — fixed page margins, and snap `clamp()` section spacing to its MAX (`vw` is unreliable on paper). HTML email — flex/grid `gap` is unsupported, so spacing lives on `<td>` padding + `margin` (inline-styled); keep one token set.

---
