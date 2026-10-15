# Responsive Accessibility

[Core rules and reference map](../SKILL.md). Section numbers remain stable across the skill.

## Contents

- 8. RESPONSIVE & FLUID SPACING
- 8.A `clamp()` for fluid section rhythm
- 8.B Step DENSITY +1 on mobile — outer skeleton only
- 8.C Container queries vs viewport
- 8.D Logical properties
- 8.E safe-area insets
- 8.F `vw` pitfalls
- 8.G Anchored scroll under a sticky header
- 8.H Motion preserves the scale
- 8.I A resize is a round trip — re-measure what the toolkit cached
- 9. ACCESSIBILITY — Spacing Floors That Override Every Dial
- 9.A Target size
- 9.B The 2.5.8 spacing exception — how dense UIs stay legal
- 9.C Text spacing must survive overrides — WCAG 1.4.12
- 9.D Reflow at 320px — WCAG 1.4.10
- 9.E Focus indicator — budget space for it
- 9.F Spacing as cognitive-load reduction
- 9.G Forced colors

## 8. RESPONSIVE & FLUID SPACING

Space is a function of viewport and container — resolve it with math, gate the breakpoints with the dials, and let components respond to *their* width.

### 8.A `clamp()` for fluid section rhythm

`clamp(MIN, PREFERRED, MAX)` replaces a breakpoint stack. PREFERRED carries a `vw` term so it scales; **always include a `rem` term so it survives zoom**, and snap MIN/MAX to the scale (mid-scroll interpolation off-grid is invisible).

```css
/* 48px @360 → 128px @1440, STEP 8 */
.section { padding-block: clamp(3rem, 1.33rem + 7.41vw, 8rem); }
```

| Signal | clamp band |
|--------|-----------|
| Hero / section, DENSITY 1–3 | `clamp(4rem, …, 10rem)` |
| Standard section, DENSITY 4–6 | `clamp(3rem, …, 6rem)` |
| Dense app shell, DENSITY 7–10 | `clamp(1rem, …, 2rem)` |
| Component padding | `clamp(1rem, …, 1.5rem)` — narrow band |

Keep the fluid band wide for large spaces, narrow for small ones — a 4px→40px icon gap reads as broken.

### 8.B Step DENSITY +1 on mobile — outer skeleton only

On narrow viewports, compress *layout* gaps (section/margin/gutter drop 1–2 steps) but **hold intra-item gaps and touch targets**. If a gap separates layout regions, it is compressible; if it separates parts of one comprehensible unit, it is not.

**The same test governs COLUMN COUNT — and a blanket "collapse everything to one column" is where a phone screen gets spent.** Reflow (§9.D) requires no *horizontal scroll*; it does not require a single column. Set the mobile column count from the **narrowest cell's content demand**, not from the grid it happens to live in: a cell holding one number and its label wants about half a phone's width, while a cell holding a table, a chart or prose wants all of it. A four-up stat row therefore belongs **two-up** at 375px — collapsing it costs roughly a screen of scroll per four cells (measured on one dashboard: 822px of stat cards before the first real content, 371px after the same four went two-up). Target the row that holds the small cells (`:has(> .stat)`, or a modifier class where `:has()` is not available) rather than the breakpoint as a whole, so cells that genuinely need the width still get it.

### 8.C Container queries vs viewport

A component should respond to its **container**, not the window — a card in a 320px sidebar and a 900px column differ at one viewport width. Page chrome → `@media`; everything reusable inside it → `@container` (query `inline-size` for RTL safety).

```css
.card-wrap { container-type: inline-size; }
@container (min-width: 28rem) { .card { --pad: 1.5rem; } }
```

### 8.D Logical properties

Author with `padding-block` / `padding-inline` / `margin-inline` / `inset-*`, not physical `top/right/bottom/left`. They flow with writing direction (LTR/RTL/vertical) with zero overrides and cut declarations roughly in half. In vertical writing modes (CJK), the block/inline axes swap — the §5 line-box rhythm then runs along the inline axis, so re-check the baseline logic there.

### 8.E safe-area insets

Pad against `env(safe-area-inset-*)` for edge-anchored UI (fixed headers, bottom tab bars, FABs). Requires `<meta name="viewport" content="…, viewport-fit=cover">` or insets resolve to 0. **Add to your token, never replace it:** `padding-block-end: calc(1rem + env(safe-area-inset-bottom, 0px))`.

**Anything composited *over* the layout is a safe area too** — burnt-in subtitles, a player's control bar, a stream HUD, a watermark, a floating cookie bar. `env()` knows nothing about these, so the band has to be reserved by hand: measure the overlay's real box (font size × line count + its own bottom margin), then add it to the container's block-end padding. Measured on a 1920×1080 slide: content was padded 72px from the bottom while a 46px caption sat 56px up, so the caption's box covered the last two lines of a panel; padding the layout to 184px cleared it. The trap is *when* it appears — the layout is correct in the browser and only breaks once the overlay is composited, so it survives every check that looks at the page instead of the finished frame. Reserve the band in the layout; never rely on the overlay landing somewhere empty.

### 8.F `vw` pitfalls

Never size spacing/type with bare `vw` (no floor/ceiling, ignores zoom) — always wrap in `clamp()` with a `rem` term. Avoid `100vw` (scrollbar overflow → use `100%`/`100dvw`); prefer `dvh`/`svh`/`lvh` over `vh` so mobile URL-bar changes don't jump the layout.

### 8.G Anchored scroll under a sticky header

A fixed/sticky header (the nav in §10) hides in-page scroll targets. Reserve the space in scale multiples: `scroll-padding-block-start` on the scroll container = header height + a buffer, and `scroll-margin-block-start` on anchor targets.

```css
html      { scroll-padding-block-start: calc(var(--header-h) + var(--space-2)); }
:target   { scroll-margin-block-start: var(--space-2); }
```

### 8.H Motion preserves the scale

Animate `opacity`/`transform`, never layout (`gap`/`padding`/`width`) — animated layout reflows the grid and breaks rhythm. Stagger list reveals by *time*, not by spacing. Honor `prefers-reduced-motion`.

### 8.I A resize is a round trip — re-measure what the toolkit cached

Checking a layout once at each width proves each width, not the trip between them. Toolkits keep sizes they measured while the container was narrow: grid rows auto-sized only while visible, controls that auto-size and only ever grow (WinForms `GrowOnly`), fill columns whose working ratio shifted when one of them hit its minimum width, virtualized lists that cache measured row heights. Widen the container and those sizes stay: rows too tall, a toolbar still wrapped, the least important column still wide. Measured on one WinForms table: two rows grown to 78px at 1000px kept 78px at 1680px where they needed the 54px floor, and the name / status / file columns came back as 216 / 151 / 112px instead of 226 / 157 / 96px at the same width. **Once the width settles, re-measure every item — off-screen ones included — and put working ratios back to the declared ones;** debounce it (~150ms) so dragging stays cheap (a full pass cost 131ms at 300 rows, a drag step 15ms). Test the round trip narrow → wide → narrow, not each width once.

- **WinForms `DataGridView`:** while an `AutoSizeRowsMode` is active, `AutoResizeRows` only caches heights — set the mode to `None`, run `AutoResizeRows(AllCellsExceptHeaders)`, restore the mode. Nudging one `FillWeight` up and back makes fill columns redistribute from their current weights (a column the user dragged keeps its width: the drag already rewrote its `FillWeight`).
- **The settle pass must not re-arm itself.** Resetting a ratio or re-measuring changes widths, which fires the same width-changed event that scheduled the pass. Ignore the events your own pass raises, and re-measure only when the widths really moved; otherwise the pass runs every debounce interval forever (measured: a 150ms timer that never settled, so a test harness waiting for the table to go idle timed out after 240s).
- **Virtualized lists:** reset the measured-size cache when the container width changes (react-window `resetAfterIndex(0)`, react-virtualized `CellMeasurerCache.clearAll()`).
- **Auto-sized controls:** a label that changes with data must keep a constant width or reserve its widest text; `GrowOnly` never gives the space back, so one transient long caption keeps a toolbar wrapped for the rest of the session.

---

## 9. ACCESSIBILITY — Spacing Floors That Override Every Dial

These are floors verified against the spec, not preferences. When a dial collides with a floor, the floor wins and you clamp the dial.

### 9.A Target size

| Standard | Minimum hit area | Level |
|----------|:---:|:---:|
| WCAG 2.5.8 Target Size (Minimum) | **24×24 CSS px** | AA |
| WCAG 2.5.5 Target Size (Enhanced) | **44×44 CSS px** | AAA |
| Apple HIG | **44×44 pt** | platform |
| Material 3 / Android | **48×48 dp** | platform |

**Separate hit area from visual size** — a 16px icon + padding reaches the target: +4px → 24px (AA), +14px → 44px (AAA). DENSITY picks which floor (1–3 → 44; 4–7 → 24 AA, 44 on primary CTAs; 8–10 → 24 AA + the spacing exception) but **never** pushes a hit area below 24px.

**Grow the hit box at zero layout cost — padding + negative margin.** In a tight cluster on a fixed `gap` (header icon buttons, a VN/EN toggle, a toolbar), padding *alone* to reach the floor spreads the row and breaks its rhythm. Pair the padding with an **equal negative margin**: the padding enlarges the hit box, the negative margin restores the margin-box, so every sibling gap and edge holds. `-m-2.5 p-2.5` makes a 20px icon a 40px target with the layout unmoved (`-my-*`/`py-*` for a vertical-only grow on an inline text toggle) — the actionable form of §5.E's *pad the hit area, never shrink the target* when the surrounding spacing is load-bearing. **Re-anchor overlays to the glyph:** a badge/dot set `absolute` on the button jumps to the *padded* corner once you inset it — wrap the icon (+ overlay) in an inner `relative` span so it stays pinned to the icon, not the hit area.

### 9.B The 2.5.8 spacing exception — how dense UIs stay legal

A target smaller than 24×24 passes AA **if** a 24px-diameter circle centered on it does not intersect another target's circle — i.e. centers ≥24px apart, so **min edge-gap = `24 − targetSize`**.

| Undersized target | Min edge-gap | On STEP |
|---|:---:|---|
| 20×20 | **4px** | one 4-grid step |
| 16×16 | **8px** | one 8-grid step |

This is the *only* legal way to pack interactive elements tighter than 24px — why DENSITY 8–10 tables on STEP 4 work (a 20px icon-button + 4px gutter passes AA geometrically). Also exempt: inline targets in text, user-agent-styled native controls, essential presentations.

### 9.C Text spacing must survive overrides — WCAG 1.4.12

Layout must not break (no clip, overlap, or lost content) when the user applies **all four**: `line-height ≥1.5×`, paragraph spacing `≥2×` font-size, `letter-spacing ≥0.12em`, `word-spacing ≥0.16em`. → Never set fixed-px line-height or fixed-height text containers; default to `min-height` + `height:auto`; express vertical text spacing in `rem`/`em`/grid multiples so it scales with the override. Any `overflow:hidden` / `white-space:nowrap` text box is a failure risk. When truncation is *intentional*, reserve a fixed number of line-boxes with `-webkit-line-clamp` + `min-height` (never `height`) so rows keep their rhythm without clipping.

### 9.D Reflow at 320px — WCAG 1.4.10

Content must work with no 2-D scrolling at 320 CSS px wide (= 1280px @400% zoom). No fixed-px widths on layout containers (use `%`/`max-width`/`minmax()`); multi-column grids collapse to one column. Exempt content (tables, images, maps, diagrams, video, toolbars) may scroll in 2D — wrap it in an `overflow:auto` container so the *page* never scrolls horizontally. RIGOR's strict columns still apply *within* a breakpoint but never exempt the collapse below it.

**No-wrap overflow (the silent one):** text pinned to one line (`white-space:nowrap` — e.g. a stat/KPI value) overflows the instant its column is narrower than the text. The classic trigger is a multi-column metric grid inside a **narrow card** — `sm:grid-cols-3` stats living in a `lg:grid-cols-2` half-width card give ~100px columns at desktop while the value font is still ~30px. Apply **both** fixes: (1) **size the value to fit** — cap the font, or make it fluid (`clamp()` / a container-query `cqi` font); (2) **drop columns when the container is narrow** (`@container`, or a `lg:` step matching the card going multi-column), so a column is never narrower than the longest value. Verify by measuring `scrollWidth` vs the column at the **narrowest** breakpoint, not the widest — the bug hides on wide viewports and bites at the breakpoint where cards halve but the font/columns don't.

**Scroll-region overflow (`overflow-x-auto` is not self-contained):** an *intentional* horizontal scroller (pill nav, toolbar, chip row, wide table) still blows the page out when its wrapper sits in an **`auto`-sized grid/flex track** — the track grows to the scroller's *max-content* (every `shrink-0` child laid end to end) so `overflow-x-auto` never engages. The classic trigger: a grid given only a desktop template (`lg:grid-cols-[…]`) falls back to an implicit `auto` column on mobile, which the scroll row inflates to thousands of px. Fix by capping the track **and** letting the item shrink: an explicit mobile `grid-cols-1` (Tailwind = `minmax(0, 1fr)` — min `0`, not the default `auto`) or `minmax(0, …)` tracks (§4.A), plus `min-w-0` on the grid/flex item holding the scroller. Then the scroll happens *inside* the box. Same verify: page `scrollWidth` at the narrowest width, not the widest.

**Dynamic text at its widest value:** a no-wrap label assembled from parts that data or the viewer's settings choose (a count, the selection size, language, 12/24-hour clock, time-zone offset, date order, currency) has no single width. Its real width is the sum of each part's widest form, and the combination on the developer's machine is rarely that one. Build the worst string (`12:48 PM`, not `9:06`; `GMT+5:30`, not `GMT+7`; `Wednesday`, not `Monday`; `999`, not `2`; the longest shipped language) and measure it against the width the container allots, including the control's own padding. Never compare against the control's auto-sized width, which shrinks with its text and makes the check self-referential. Measured on a 320px tray popup: a reset caption fitted its 256px slot at 244px in Vietnamese 24-hour and overflowed at 258–298px in 12-hour, half-hour-zone and English builds. When the worst string does not fit, an ellipsis is the wrong fallback if the tail carries meaning (an offset, a unit, a status), because it cuts exactly the part that says what the number is. Split the text into lines by meaning, each short enough at its worst (time + offset on one line, the qualifier on the next: 210.5px and 149.5px at the worst English combination), or keep the label constant and move the variable part to a tooltip. Toolkits whose autosize only grows (WinForms `GrowOnly`) keep one transient long value's width for the rest of the session (§8.I).

**Long values that must remain fully readable (email, URL, filename):** remove `white-space:nowrap` and any ellipsis/clamp. Use `white-space:normal; word-break:normal; overflow-wrap:anywhere`, `min-inline-size:0` on the grid/flex text item, and `repeat(2, minmax(0, 1fr))` rather than two auto-minimum `1fr` tracks. Collapse to one column when the card no longer fits its icon, gap, and readable text. Check intermediate widths (especially 500–700px), not just phone and desktop.

`overflow-wrap:anywhere` keeps normal line-breaking opportunities and adds emergency breaks for an otherwise unbreakable run; those breaks also reduce min-content size. `break-word` is an alternative when tracks/items already have explicit shrink constraints, but its emergency breaks do **not** reduce min-content size. Neither guarantees a break at `@`, `/`, or `.`; language and line-breaking rules decide that. Add deliberate `<wbr>` opportunities when a specific display split matters, keeping the link destination unchanged. Avoid `word-break:break-all` for addresses: it can split every word even when a normal break would suffice. Do not apply it as a general CJK rule either; honor the language's line-breaking behavior. See [CSS Text wrapping](https://www.w3.org/TR/css-text-3/#overflow-wrap-property) and [grid automatic minimums](https://www.w3.org/TR/css-grid-2/#min-size-auto).

### 9.E Focus indicator — budget space for it

The ring is a spacing consumer. `outline-offset ≥ 2px`; reserve a gutter (width + offset, ≈4px) so the ring isn't clipped by an `overflow:hidden` ancestor or a neighbor. Never `outline:none` without an equivalent (fails 2.4.7 / 2.4.11). At high DENSITY on STEP 4, bump the focusable gutter to 8px so the ring fits.

### 9.F Spacing as cognitive-load reduction

Whitespace groups related controls and isolates unrelated ones — directly helping low-vision, cognitive, and attention-affected users. Enforce within-group ≤ ½ between-group at **every** DENSITY; even a cockpit keeps within=4 / between=8, never both equal.

### 9.G Forced colors

Under `forced-colors` / Windows High Contrast, background tints and elevation are stripped — so the §6.F separation ladder must not rely on tint or shadow alone; keep a **structural** fallback (a real gap or border) so groups stay separated. For theme-specific optical checks, see §6.G; forced colors and dark mode are separate conditions.

---
