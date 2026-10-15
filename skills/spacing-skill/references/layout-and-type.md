# Layout And Type

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 4. LAYOUT GRID & ALIGNMENT
- 4.A Column grid, gutters, page margins
- 4.B Measure & content max-width
- 4.C Alignment toolkit (reach for these before any margin/`auto` hack)
- 4.D Subgrid — align nested card content across siblings
- 4.E Centering — by what you're centering
- 5. VERTICAL RHYTHM — Type Drives Spacing
- 5.A Line-height is the base unit
- 5.B Baseline grid — pragmatic, not dogmatic
- 5.C Heading spacing is ASYMMETRIC — more above, less below
- 5.D A paired modular TYPE scale
- 5.E Control heights = line-height + inset, never a clamped fixed height

## 4. LAYOUT GRID & ALIGNMENT

### 4.A Column grid, gutters, page margins

Use a 12-column grid (divisible by 2/3/4/6) when content must align across rows of differing components. **Gutters and page margins are fixed per breakpoint; column widths are fluid (`%`/`fr`).** Material 3 reference: 16dp margins at compact, 24dp gutters + margins at the tablet range.

| Viewport | Columns | Gutter | Page margin |
|----------|:---:|:---:|:---:|
| Mobile (<600) | 4 | 16 | 16 |
| Tablet (600–1024) | 8 | 24 | 24 |
| Desktop (>1024) | 12 | 24–32 | `clamp`, see 4.B |

```css
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--gutter); }
```

Use `minmax(0, 1fr)` for fluid tracks so a long unbroken string can't blow out a column and break the gap; reach for `fit-content`/`min-content` where a track should hug its content. This also protects the §9.D reflow guarantee.

### 4.B Measure & content max-width

Unbounded text on wide viewports destroys readability. **Cap the measure at 45–75 characters (~66 ideal).** Use `ch` for prose so the measure holds across font sizes; center the *block* with `margin-inline:auto`, keep page margins as `padding-inline` so text never kisses the edge.

```css
.prose { width: min(100% - 2 * var(--page-margin), 65ch); margin-inline: auto; }
```

### 4.C Alignment toolkit (reach for these before any margin/`auto` hack)

| Property | Axis | Use |
|----------|------|-----|
| `justify-content` | main / inline | distribute along the row (`space-between` for logo↔nav, `space-evenly` for segmented controls) |
| `align-items` | cross | line items up across the cross axis (`baseline` for icon+text, number+label) |
| `align-content` | wrapped lines | distribute wrapped rows |
| `place-items` | both (grid) | `place-items:center` centers a single child on both axes |
| `gap` | both | the space owner (§3.A) |

- Mixed-height inline items must align to text → `align-items:baseline`, not `center`.
- Equal-height cards in a row → `align-items:stretch` + a flex-column card with `margin-top:auto` on the footer (the one sanctioned auto-margin — it pushes *within* a flex child, owns nothing between siblings).
- **That auto-margin only pushes when the child has slack — otherwise it is silently `0`.** `margin-top:auto` consumes *free space*; in a column that hugs its content (`flex:none`, `height:auto`, a grid cell sized to `max-content`) there is none, so the footer lands flush against the block above and the gap you "set" never existed. No warning, no overflow, nothing to see in the rule — the declaration is present and its computed value is zero. Measured across one layout's two variants: an identical footer meant to clear its subtitle rendered **44px** in the landscape build, where the column was the flex item absorbing leftover height, and **0px** in the portrait build, where the same column was `flex:none`. Reach for `auto` only where stretch is guaranteed; everywhere else give the gap a real value from the scale (§2). The symptom generalizes: *a spacing rule whose value depends on free space disappears the moment the container stops having any.*
- A bottom-aligned row that **mixes an editable control with static text** aligns the *boxes*, not the *text*: the control carries a touch-target `min-height` (44/48px) and centers its text, while a bare `<span>` is one line tall and sits flush at the bottom — so the two labels land at visibly different heights. Give every slot the same box (`min-height` + padding) and center the static ones (`display:flex; align-items:center`). The touch-target floor (§9) is an alignment constraint, not just an ergonomic one.
- **A hug-width child inside a Stack still fills the cross axis.** `width:auto` (`w-auto`, `fit-content`) says nothing about the cross axis of a `flex-direction:column` parent — `align-items:stretch`, the default, does. A secondary button sized to hug its label renders full-bleed until the child gets `align-self:start` (or the Stack gets `align-items:start`). Measured on one settings screen: `sm:w-auto` alone left the button at **640px**; adding `sm:self-start` brought it to **184px**, its true content width. Same trap for any hug-sized chip, badge, or card stacked vertically — and it hides on mobile, where full-bleed is what you wanted anyway, then surfaces at the first wide breakpoint.
- **A leading icon opens a text column — the row's actions belong in it.** In an icon + title/description row, the copy starts at `icon width + gap` while a control placed after it, being a sibling of the icon block, starts back at the container inset; the eye reads two competing left edges. Indent the action by exactly that amount (icon 44 + gap 12 → `padding-inline-start: 56px`) so title, description, and control share one spine. Mandatory at `RIGOR ≥ 7`. Below `sm`, where the control goes full-width for touch, drop the indent and let it align to the card edge instead — one spine per breakpoint, never a half-step between them.
- **In a flex row, decide which item yields — the ellipsis belongs to the text that can lose its tail.** Flex shrink lands on every item whose minimum can shrink, in proportion to its size, so unless you say otherwise the wrong item gives way. Two ways it goes wrong: a long title set `flex:none` inside an `overflow:hidden` wrapper is cut mid-glyph with no ellipsis while its short neighbor is squeezed to nothing, and a button whose component defaults to `min-width:0` is squeezed until it clips its own label. Give the long, tail-tolerant text (a name, an email, a path) `flex:0 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis`, and make short fixed-meaning items — buttons, plan or status badges, counters — `flex:none` (cap a badge that can run long with a `max-width` in `em`). Measured on one tray popup at 320px: a card title "Claude · <29-char email>" needed 283px of a 209px slot, so the plan badge that told two accounts of one brand apart rendered **0px** wide; after the swap the title truncated at 166px and the badge kept its 37.8px. On the same popup a "no account" row squeezed its button from 102px to 79px until the button went `flex:none`. Verify `scrollWidth ≤ clientWidth` on every button and badge at the narrowest width, and pair a truncated text with a hover tooltip that shows it whole.
- `ALIGNMENT_RIGOR`: at 1–3 freeform centering and optical nudges are fine; at 7–10 every edge lands on a column line and body content uses `start`/`stretch` (not `center`) so left edges lock to the grid.

### 4.D Subgrid — align nested card content across siblings

Cards with different title lengths lose internal alignment. `align-items:stretch` equalizes *height* but not internal tracks. **Subgrid fixes it** — each card adopts the row's tracks, so titles/bodies/footers align across the row regardless of text length (widely supported: Chrome/Edge 117+, Firefox 71+, Safari 16+).

```css
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.cards > .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }
```

### 4.E Centering — by what you're centering

| Situation | Strategy |
|-----------|----------|
| One element, both axes | `display:grid; place-items:center` |
| One element horizontally, block flow | `margin-inline:auto` + `max-width` |
| Text within its box | `text-align:center` (text only) |
| A row of items as a group | flex parent + `justify-content:center` |

**Centering acts on the box, not on the ink.** An item whose `max-content` is wider than its container is clamped to the container, so the text inside wraps and leaves dead space on the trailing edge — `align-items:center` then centers a box wider than anything it draws, and the group reads pulled toward the leading edge. The drift *is* that leftover, so it grows with the container: one logo + company-name lockup sat 10.7px off at 375px wide and 63.2px off at 674px from identical markup, which is exactly why it survives a phone-only check. Fix the sizing, not the position — make the wrap deterministic so `max-content` equals the longest line (force the break, or cap the text at that measure) until the item shrink-wraps; only then does any strategy above bite. Acceptance test is `item box width === longest rendered line`, measured at the widest viewport you support.

**Never center long-form body copy** (ragged edges wreck the return sweep) — center the *block*, left-align the *text*. Centering is a DENSITY 1–4 move; at higher density / `RIGOR ≥ 6`, left-align and lock to the grid.

---

## 5. VERTICAL RHYTHM — Type Drives Spacing

Vertical space is emitted *by* the text. Line-height is the atom; set type first, then let it dictate rhythm.

### 5.A Line-height is the base unit

The **line box** (computed line-height), not the font size, is what stacks: 16px × 1.5 = a 24px line box. Reason in line boxes.

| Role | line-height | Why |
|------|:---:|-----|
| Body / paragraph | **1.5–1.6** | WCAG 1.4.12 needs ≥1.5; ship 1.5 minimum |
| Long-form reading | 1.6–1.75 | longer measure needs taller leading |
| UI body / dense rows | 1.4–1.5 | tighter, never below 1.4 on wrapping text |
| Headings (large type) | 1.0–1.25 | big glyphs need less leading |
| Single-line labels/buttons | 1.0–1.2 | inset owns the height (5.E) |

Leading shrinks as size grows. DENSITY trims leading before gaps (≥7 → 1.4; ≤3 → 1.6+), but **never below 1.4 on wrapping text** regardless of DENSITY.

**Stacked-diacritic scripts raise the heading floor.** Scripts whose marks stack *both above and below* a letter — Vietnamese (`Ệ Ợ Ằ Ầ`), and similarly Thai / Arabic / Devanagari — need multi-line headings held at **line-height ≥ 1.1**: below ~1.05 an under-dot on one line collides with a circumflex/breve on the next. Latin all-caps tolerates 0.95; the same heading set in Vietnamese does not. This is gated by the *content language*, not by taste — a `leading-[0.95]` display heading is a latent collision the instant it wraps to two lines of marked caps, so set the floor whenever the text can be localized into a mark-stacking script.

### 5.B Baseline grid — pragmatic, not dogmatic

Round the computed line-height to a multiple of SPACING_STEP so every line lands on the grid (16px body → **24px** line box on an 8-grid). Align line *boxes* to the grid; don't chase per-font baselines. `ALIGNMENT_RIGOR`: ≤3 loose multipliers, no snapping; 4–7 snap line-heights and block gaps (headings may break locally); ≥8 snap everything and insert a corrective spacer to re-sync after off-grid media (images, embeds).

### 5.C Heading spacing is ASYMMETRIC — more above, less below

A heading **belongs to the content beneath it**. Space above separates it from the previous block; space below must be smaller so it bonds to its paragraph. Equal space orphans the heading. Ratio `above ≈ 2–3× below`; both are scale multiples. Zero out the top space on a `:first-child` heading (the container's padding owns it).

| Level | font-size | above | below |
|-------|:---:|:---:|:---:|
| H1 / page title | 36–48 | **48** | 16 |
| H2 / section | 28–32 | **40** | 16 |
| H3 / subsection | 22–24 | **32** | 12 |
| H4 | 18–20 | **24** | 8 |
| H5 / eyebrow | 14–16 | **16** | 8 |

Collapse the asymmetry into one owner (heading `margin-top` + small/zero `margin-bottom`, or container gap) — never set both heading margins *and* the next paragraph's top margin.

### 5.D A paired modular TYPE scale

Type scale and spacing scale share the same `SPACING_STEP` rhythm so sizes and gaps never fight. Ratio by context: 1.333–1.5 for marketing (DENSITY ≤3), **1.25 (major third)** default, 1.2–1.125 for dense UI (≥7). Material 3's line-*boxes* are 4-grid-aligned (body 16/24, title 22/28, headline 24/32, 28/36, 32/40, display 57/**64**) — note some font-sizes (e.g. 57) aren't multiples of 4, so anchor the rhythm to the line boxes, not the sizes.

### 5.E Control heights = line-height + inset, never a clamped fixed height

A button/input height is `line-height + padding + borders` — computed, not asserted. A rigid `height:36px` with centered text clips descenders (g, y, p) when font/zoom/line-height change. Use `min-height` (a floor), never `height` (a clamp).

| Control | font / lh | inset (each side) | height | grid |
|---------|:---:|:---:|:---:|:---:|
| Small | 14 / 20 | 6 | 32 | 4× |
| Medium | 14–16 / 20–24 | 8–10 | 40 | 5× |
| Large | 16 / 24 | 12 | 48 | 6× |

Vertical inset is a **derived** value — pick it so total height lands on a grid multiple (the grid-locked quantity is the **height** 32/40/48, so a computed inset like 6px is exempt, like line-height). Inset is the density dial (≥7 → tighter, ≤3 → 12–14px), but the **touch target must still clear 44×44px / 48×48dp** — pad the hit area, never shrink the target (§9).

**Floor-not-clamp applies to the INLINE axis too — and fails louder there.** An icon rail, logo strip, avatar column, or badge tray given a fixed `width` to line up a text column is the same clamp: it holds only until a row carries one more item than the slot was measured against. Use `min-width` so the slot keeps the shared text edge for the common case and still grows for the fat one. The inline failure is nastier than the block one: a too-short box clips or scrolls, whereas a too-narrow slot whose children are `shrink-0` (or hold an image at `max-w-none`) **overflows and paints over the next flex sibling** — no clip, no scrollbar, no warning, just glyphs on top of glyphs. It also hides until someone adds item N+1 to *one* row, so it reads as "that row is broken" rather than a sizing error, while the untouched rows keep looking right. Measured on one checkout: a rail sized 64px for a single badge got a second row of Visa + `gap-1` + Mastercard needing 96px, and 32px of logo landed 20px deep in its own description text. **When a shared alignment spine and the proximity ladder collide, the ladder wins** — do not widen every rail to the fattest one if that inflates a sparse row's icon↔label gap past its inter-item gap (§6.B); let the fat row run wider and keep each row's own gap tight.

---
