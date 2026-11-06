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

The owner has standing opt-in to capture every new, verified spacing or alignment
method from their projects in this repository. See §15 for the maintainer and
recipient boundaries.

### 2026-11-05 — Gemera dashboard / review queue — size columns by content, not by equal share

- Space Read: review queue on a 3180 px screen · packed · STEP 4 · DENSITY 8 · RIGOR 8 · 94 of 97 posts sit in one of six buckets, so equal columns leave most of the width blank
- Did: three equal channel columns, each with two equal buckets, gave the busiest bucket about 1/6 of the width. Changed to a stack: a group with content takes the full row and flows cards in `repeat(auto-fill,minmax(min(100%,360px),1fr))`, and an empty group keeps its required toolbar in a shared row. Groups sort by item count so short groups never sit below a long list. Measured on the mock at 3175 px: 7 card columns, fill 1.0, first card 453 px below the queue top; no overflow at 7 widths from 320 to 3175 in 3 scenarios.
- Taught: a toolbar laid out for a narrow column turns into a tall block with very wide buttons when its column becomes full width. A container query on the column switches it from 2×2 to 4 across, independent of the viewport. Sorting by count needs a mobile exception, because stacked empty toolbars would otherwise push the first card down by more than one screen.
- Verdict: refinement(§3, §8).
- Action: logged here as measurement evidence; not yet folded into the skill.

### 2026-10-26 — Personal-Web / invoice PDF payment row — align the label with the R in VietQR

- Space Read: exported invoice payment row · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · the text's visible midpoint must match the blue R, not the full logo box.
- Did: rendered the PDF at 4× and isolated the blue R and payment-label ink. Their midpoints were 237 and 223 px before correction. Changed the bank label's PDF `baselineOffset` from -3.5 to -7 pt; both midpoints became 237 px in the local render. The served invoice independently measured both midpoints at 405 px in a 4× render.
- Taught: centering against a multicolor logo's full image box can leave text visibly high relative to the letter the reader uses as its anchor. Measure the requested glyph's ink bounds on the final output, convert the pixel delta back to document units, and re-render; do not reuse the -7 pt value for other logos or fonts.
- Verdict: refinement(§7.G).
- Action: folded into §7.G in this update; the example remains here as measurement evidence.

### 2026-10-26 — Personal-Web / invoice PDF payment row — use a rendered baseline check

- Space Read: payment logo beside bank-transfer text · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · both items must read as one level row in the exported PDF.
- Did: used one PDF payment row with a logo scaled to fit a 64 × 22 pt box and text starting 78 pt from the left margin. Added a paragraph baseline adjustment, first -3 pt and then -3.5 pt, to bring the text closer to the logo's visible lettering. The whole-mark visual check still left the bank text 14 px above the blue R at a 4× render, leading to the glyph-specific correction recorded above. The shared invoice PDF renderer feeds the actual, downloaded, emailed, and Telegram invoice paths.
- Taught: a PDF text baseline and an image's bounding box do not express the same visual center. Keep the horizontal row geometry stable, adjust the text baseline from a rendered measurement, and check the real PDF delivered through the shared renderer instead of accepting only a local preview.
- Verdict: refinement(§7.G).
- Action: folded into §7.G with the glyph-specific correction above.

### 2026-10-26 — Personal-Web / VietQR invoice logo — transparent containment removes false rules

- Space Read: wide brand mark in a narrow PDF row · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · logo edges must remain clean after raster containment.
- Did: the contained VietQR PNG showed two dark horizontal bars absent from its source SVG. Regenerated the PNG with an explicit transparent resize background (`alpha: 0`); the top and bottom rows of the result were transparent, and the actual invoice PDF no longer showed the bars.
- Taught: when a transparent wide logo is fitted inside a raster box, the renderer's default padding color can become visible on an exported document. Inspect the generated image's alpha and the delivered PDF, not only the source SVG.
- Verdict: gap(§7.G).
- Action: folded into §7.G in this update.

### 2026-10-26 — Personal-Web / invoice payment brands — one PDF layout for every delivery

- Space Read: branded payment method in a financial document · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · logo and label need one repeatable row across all invoice copies.
- Did: added bank and card payment logos to the invoice brand mapping and shared PDF renderer. Kept the original method text beside the corresponding logo and checked a real served bank invoice plus its downloaded copy, rather than testing only a constructed invoice object.
- Taught: when a document has live, download, email, and messaging copies, put the layout in their common renderer and verify a delivered artifact. Otherwise a logo may appear only in one path while the other copies retain the text-only row.
- Verdict: covered(§4, §14).
- Action: journal evidence; the shared-renderer lesson is application architecture rather than a new default spacing rule.

### 2026-10-20 — Application form and shared footer — align paired controls without styling native choice inputs

- Space Read: application form and four-column footer · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · inherited 16 px row gaps and 24 px column gaps; pair controls on a shared top edge.
- Did: scoped full-width control styling to direct field children so nested radios no longer inherit text-input padding. Reserved a 56 px label region above desktop controls, with an 8 px label gap; removed that reserve when the form stacks below 768 px. Text inputs and select measured 48 px high. First/last name, street/suburb, state/postcode and email/phone pairs measured identical top coordinates at desktop widths. Choice label specificity is reset explicitly at both mobile breakpoints. Footer columns collapse from four to two at 1024 px and one at 480 px; a 240 px-high map sits beside navigation. Connected Chrome checks across four pages and five widths (320, 375, 768, 1024 and 1280 px) measured zero horizontal page overflow in all 20 cases.
- Taught: align the label region as well as the control box when helper text differs; scope generic input rules so nested radios and checkboxes retain native geometry. Reflow long footer contact content before compressing its essential text.
- Verdict: covered (§4 alignment, §8 responsive reflow, §9 target sizes).
- Action: journal only; existing rules cover this case.

### 2026-10-13 — Repository badges and skill-card artwork — intrinsic SVG sizes survive host CSS

- Space Read: GitHub README badge rows and portfolio skill cards · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · web badges 24 px, wrapping gap 8 px, artwork 144 × 52 px.
- Did: GitHub rendered the generated analytics badges at 24 px while adjacent external badges were 20 px; the host's image height:auto overrode HTML height attributes. Normalized the three generated SVGs to intrinsic height 20 px with proportional widths and unchanged viewBox. On the portfolio, a shared component sets all badge images and link targets to 24 px, with an 8 px flex gap. Chrome measurements at 320 px and 390 px viewport widths found zero horizontal overflow; all loaded bridge badges were 24 px high. Changed the shared bridge artwork from self-start to self-center for both card sections. After reconnecting Chrome, both production cards measured equal left/right insets: 207 px on desktop and 91.5 px at a 390 px viewport, with the artwork still 144 × 52 px and no horizontal overflow. GitHub README readback confirmed all seven badges at 20 px and identical top coordinates within each row.
- Taught: HTML dimension attributes do not override host CSS. Normalize the delivered asset dimensions when the host owns image sizing, and use one shared layout component where the application owns CSS. Preserve image aspect ratios rather than stretching each badge to the same width.
- Verdict: covered (§3 — consistent rhythm; §4 — one owner per space and cross-axis alignment; §9 — minimum target floor; §15 — verify the rendered result).
- Action: journal only; existing guidance covers this case. Renderer regression tests and public SVG readback verified 20 px intrinsic height. Portfolio unit suite passed 404/404 locally and in a fresh source archive.

### 2026-09-25 — Gemera dashboard / mobile login card — a status line reserved *below* the last control is dead space: the card's bottom inset came out twice its top

- Space Read: web login page for a dark admin dashboard, one centred card · balanced · STEP 8 · card `max-width:380px`, padding 32 px block / 24 px inline, field groups 16 px apart, label → input 8 px, inputs and button `min-height:48px` (touch floor), input text 16 px so iOS does not zoom · DENSITY 5 · RIGOR 7 · rendered in WebKit 26.5 with Playwright's iPhone 15 Pro and iPad Pro 11 profiles.
- Did: the status line under the submit button (`#msg{min-height:20px}`, filled only on error) was reserved so an error would not shift anything. Empty, it still cost the flex `gap` (16 px) plus its own 20 px: measured on the 3× screenshot, card top → logo = 34 px, button → card bottom = 69 px. Changed to `#msg:empty{display:none}`: an element with `display:none` is not a flex item, so the gap goes with it and the bottom inset returns to the 32 px padding. The line sits below the last control, so when an error appears only the card's own bottom grows (16 + 20 px); the fields and the button do not move. Same pass: inputs and the button drew in the UA serif because form controls do not inherit `font-family`; `input,button{font:inherit}`.
- Taught: reserving space for dynamic text prevents layout shift only when something *after* the slot would move. A slot that is the last thing in its box protects nothing and instead adds its height plus one gap to the container's end inset, which reads as unbalanced padding. Reserve slots that sit above other content; collapse trailing ones when empty, and collapse them with `display:none` (or `:empty`) rather than `height:0`, so the parent's `gap` disappears with them.
- Verdict: refinement(§4 — one owner per space: a reserved-but-empty trailing slot silently becomes a second owner of the container's end inset) · covered(§9 — 48 px targets, 16 px input text).
- Action: pending pattern — first datapoint; per §15.D fold into §4 on a repeat. Verified by rendering both device profiles before and after (`bot-tele` commit for the dashboard login page, 2026-09-25).

### 2026-09-24 — CongCuDoiTen / WinForms results table with a new image column — a resize is a round trip: sizes the toolkit measured while narrow stay cached when the table widens → folded into §8.I

- Space Read: offline WinForms tool, results table (checkbox · corner-number picture · catalog no. · name · status · file · score) beside a preview and a catalog pane · balanced · rows 54 px (48 px picture + 6) · DENSITY 6 · RIGOR 8 · every row the same height unless its text truly needs more; the three text columns keep their ratio 46 : 30 : 18 at every window size from 1000×600 to 1680×940.
- Did: added a 120×48 picture column that shows at full size when the table has room, draws zoomed with a short header when it is tight, and hides below 72 px; the thresholds use the table's client width minus the vertical scrollbar, so the column does not flip when the scrollbar appears. Then drove a narrow → wide → narrow round trip at five window sizes and measured every row, including rows scrolled out of view. Two cached sizes survived: (1) rows that grew to 78 px at 1000 px kept 78 px at 1680 px where they needed the 54 px floor — `AutoResizeRows(DisplayedCellsExceptHeaders)` changed nothing, because while an autosize mode is active WinForms only caches heights set through the public API; (2) the fill columns came back as 216 · 151 · 112 px instead of 226 · 157 · 96 px at the same 1366 px, because the File column hit its minimum at 1000 px and the grid kept the adjusted working ratio. Fix: one pass 150 ms after a text column stops changing width — nudge one FillWeight up and back (the grid redistributes from the weights; now 235 · 153 · 91 → 234 · 153 · 92, ≤ 2 px of rounding), then autosize mode to None, `AutoResizeRows(AllCellsExceptHeaders)`, mode back (39 ms at 50 rows, 131 ms at 300; a drag step stays ~15 ms). Two follow-ups from an adversarial review: resetting the ratio on every resize step made window drags ~58% slower at 300 rows, so it moved into the settle pass; and the first version of that pass re-armed itself through its own width-changed events, firing every 150 ms forever (the harness waiting for an idle table timed out at 240 s) — the pass now ignores the events it raises and re-measures only when widths really moved. Hiding the picture column while it held the current cell also cleared the grid's current row (F8 and arrow keys restarted from the ends), so the current cell moves to the name cell first, keeping selection and scroll.
- Taught: a layout checked once at each size can still be wrong after the user resizes, because toolkits keep what they measured while narrow: row heights of rows that were visible, auto-sized controls that only grow, fill ratios adjusted at a minimum width. Virtualized lists on the web cache measured heights the same way. Re-measure every item, off-screen ones included, once the width settles; test the round trip, not each size; and make sure the settle pass cannot trigger itself.
- Verdict: gap(§8) — second CongCuDoiTen datapoint for "sizes stay cached across a resize" (the first was the `GrowOnly` toolbar in the entry below).
- Action: folded into §8.I (new), the §13.C Responsive checklist and anti-pattern #25 @ v2.13.0. Verified by the tool's harness, 58/58 at 1000×600, 1200×700, 1280×720, 1366×768 and 1680×940.
### 2026-09-24 — CongCuDoiTen / WinForms three-pane window (table · preview · catalog) — a label that grows with data needs its widest text reserved, and "fits?" must be measured against the slot, not the auto-sized control

- Space Read: offline WinForms tool, three panes side by side under one toolbar band · balanced · STEP 3 px control margins, 12 px outer gutter · DENSITY 6 · RIGOR 8 · pane headings and second rows must share one line across all three panes; nothing may clip or wrap at 1000×600 (minimum) … 1680×940.
- Did: measured control bounds in the running form at 1000/1366/1680/maximized instead of eyeballing. At 1680×940 every outer edge sits at x=12 / x=1652, the toolbar and both pane titles share centre y=134, second rows start at y=157, picture and catalog box end at y=790. Three dynamic-text fixes: (1) the table toolbar wrapped (42 → 80 px, table header dropped 38 px below the other panes) as soon as 2 rows were selected, because `Chọn loại tài liệu…` became `…cho 2 dòng…` (127 → 193 px) and New-Nut buttons use AutoSizeMode `GrowOnly`, so the bar stayed wrapped after the selection went back to one row; kept the label constant (count moved to the tooltip) and pinned the other counter button to the width of its widest caption (`▶ Cần xem: 999 dòng (F8)`). (2) The step strip, the name-column header and the footer count line got short variants chosen by measuring the long text against the width the parent cell allots (`TableLayoutPanel.GetColumnWidths`), not against the control's own auto-sized width. (3) A rules line measured 255 px by `TextRenderer.MeasureText` still wrapped under `MaximumSize.Width = 258`, because an AutoSize `Label` adds ~7 px around its text; the fit test now adds 8 px.
- Taught: (a) text that changes with data (counts, selection size) inside a no-wrap row must either stay constant or reserve its widest value, and `GrowOnly` autosize never gives the space back, so one transient long label breaks alignment for the rest of the session. (b) Choosing a short text variant by comparing with the control's own auto-sized width is self-referential: once short, the control shrinks and the long text never fits again; compare with the slot the container gives. (c) A text-fits check must include the host control's own padding, not just the renderer's glyph width.
- Verdict: covered(§4.C — one shared band across panes, measured) · refinement(§9.D/§14 — verify dynamic text at its widest value, and measure fit against the allotted slot including control padding).
- Action: pending pattern — first datapoint for the autosize-`GrowOnly` and self-referential-fit traps; per §15.D fold into §9.D on a repeat. Verified by the tool's harness (43/43 at 1366×768 and 1680×940) plus probes at 1000–1680 px wide. → the `GrowOnly` half repeated the same day (grid rows and fill ratios kept across a resize) and was folded into §8.I @ v2.13.0. → the widest-dynamic-text half repeated on 2026-09-27 (Quota Control free-reset caption) and was folded into §9.D @ v2.15.0.
### 2026-09-22 — PCC4SH / kho-vat-tu.xlsm bảng lịch sử hiện tại chỗ dưới bảng tồn kho và dưới tờ phiếu — "below the last filled cell" is not "below the layout"

- Space Read: Excel workbook; a button pastes a hidden history table underneath whatever the reader is looking at (stock list or a 02-VT invoice form) and pastes it away again on the next press · balanced · STEP 1 row.
- Did: placed the pasted table `last used row + 2 blank rows + 1`, where "last used" came from `Cells.Find("*")`. On the invoice sheet that landed the table on row 36 — the signer-name row, which is *inside the print area* but empty on the blank template — and collapsing the table deleted that row. Fixed by taking `max(last filled row, bottom of PageSetup.PrintArea)` as the anchor (invoice: 37 → table starts at 39). Second bug: the italic hint under the title inherited a right-aligned column A on the stock sheet, so the overflow ran left off the sheet and read as "bấm để thu gọn bảng này." (front half missing); forced `xlLeft`.
- Taught: the bottom of a form is defined by its **print/layout box**, not by its last non-empty cell — a template's reserved rows are blank by design. And overflow direction follows text alignment: a long label in a narrow left column must be left-aligned or it spills into nothing.
- Verdict: refinement(§4 — a reserved-but-empty slot still occupies space; anchor "after" on the declared box) · covered(§9/§14 — render with real data; the blank template hid both bugs, the COM run with three filled rows exposed them).
- Action: `ModKho.HienBangTaiCho` anchors on `max(Find, PrintArea)`, hint cell `HorizontalAlignment = xlLeft`; verified by running the macros through Excel COM and `CopyPicture` (PR #425). Not bumping the skill version — folding into §4 wording later if it recurs.

### 2026-09-22 — PCC4SH / kho-vat-tu.xlsm trang Tồn kho + nút quay về — a width table keyed by column letter drifts from a header list keyed by name

- Space Read: Excel workbook the warehouse staff download from the web (Rules §0.49: must mirror the web table) · balanced · STEP 1 char (Excel column units) · DENSITY 5 · RIGOR 7 · column widths by content, buttons 150×22pt in a 26pt row
- Did: the owner reported "vẫn còn mấy chỗ bị mất chữ". Measured every button caption against its box (TextRenderer vs `btn.Width`) and every cell in the first 12 rows on all 22 sheets: no caption was cut, no title clipped. Then screenshotted each sheet through Excel COM (`Range.CopyPicture`, which includes form buttons the PDF export drops) and the defect was on **Tồn kho**: the name column ("Tên nhãn hiệu và quy cách") was 14 chars wide and "ĐVT" was 50 — the `Set-Widths @{A=6;B=18;C=14;D=50;…}` table had been written for an older header order and never re-read when a column was removed, so it was off by one. Set `C=50, D=8, E=14, F=12, G=18, H=16` and re-aimed the alignment ranges the same way (names left, numbers right, ĐVT centre). Also the "◀ VỀ TỒN KHO" button on the ledger sheets was 20pt tall around 11pt bold text (26px box, 20px glyphs): raised to 22pt, still inside the 26pt row.
- Taught: a width table addressed **positionally** (column letters) next to a header list addressed **by name** is two sources of truth, and removing one header silently shifts every width after it by one column. The template looked fine empty — headers wrap, so the narrow name column still read "Tên nhãn hiệu và quy cách" on two lines — and only the *filled* download showed names truncated. The same file already had a by-name `Get-KhoColSpec` table for the other sheets; Tồn kho bypassed it. Second: measuring text-vs-box catches clipped captions but not *wrong* boxes; a screenshot of the rendered artifact with real content is the only check that sees a column that is merely too narrow for what will go in it.
- Verdict: covered(§1 — widths by content, not one number) · refinement(§14 — verify on the rendered artifact with real content; an empty template hides a narrow column)
- Action: pinned in `_kho-xlsm.test.ts` (name column ≥40, ĐVT ≤10, name widest). Switching the sheet to by-name specs is the follow-up, not done yet. No SKILL bump — §14 already says render-and-measure; the new wrinkle is only that an empty template is not the artifact.

### 2026-09-20 — spacing-skill / video giới thiệu repo (một template, hai khung 1920×1080 + 1080×1920) — an auto-margin with no slack is `0`, and a burnt-in caption is a safe area

- Space Read: title-and-panel slide deck for a 2-minute repo video, one HTML template rendered at both aspect ratios · balanced · STEP 8 · DENSITY 3 · RIGOR 7 · 64px background grid; ladder 8 → 24 (inside panels) → 64 (column gap)
- Did: three spacing bugs, each caught only by looking at the rendered artifact. (1) Titles were set `line-height:1.08`; on Vietnamese all-caps two-liners the `Ề` of "ĐỀU NHAU" collided with "PADDING" above it — the skill's own anti-pattern #15, committed while building a video that *teaches* anti-pattern #15. Raised to `1.15`. (2) The copy column's footer used `margin-top:auto`; it rendered 44px clear in the landscape build and **0px** in the portrait build, footer jammed against the subtitle — portrait made that column `flex:none`, so there was no free space for `auto` to eat. Replaced with a literal `44px`. (3) Burnt-in ASS captions (46px, `MarginV 56`) landed on top of the panels: the page reserved only 72px of block-end padding, so the caption box covered the last two lines of the SLOP panel's note and, in portrait, the `line-height 1.15` badge — the exact evidence the slide existed to show. Reserved a real band: block-end padding 72 → **184px** (landscape) and 88 → **208px** (portrait), caption `MarginV` 56/64.
- Taught: two failure modes that share one shape — *a spacing value that is computed from leftover space, or from an assumption about empty space, is not a spacing value.* `margin-top:auto` is the first: it is a claim on free space, so the identical declaration yields 44px or 0px depending on whether an ancestor happened to stretch the box, and it fails silently in the variant you did not look at. A composited overlay is the second: `env(safe-area-inset-*)` covers the notch but knows nothing about a caption, HUD, or control bar the renderer paints later, so the layout verifies clean in the browser and ships broken in the frame. Both are invisible to every check performed on the page rather than on the finished output. Third, smaller, lesson: shipping a skill's own anti-pattern inside that skill's marketing is the cheapest possible proof the rule is worth having — and it took a rendered screenshot, not a code review, to catch.
- Verdict: gap(§4.C, §8.E) · covered(§5.A — #15 fired exactly as written)
- Action: folded into §4.C (auto-margin needs slack, with the 44/0 measurement) and §8.E (composited overlays are safe areas, with the 72 → 184px measurement) @ v2.12.2, plus anti-patterns #23 and #24. Both are failure-mode warnings from real defects, hardened on first occurrence per the §15.D carve-out.

### 2026-09-09 — PCC4SH / màn Cài đặt + menu tài khoản — `w-auto` loses to the Stack, and a leading icon moves the spine

- Space Read: settings screen (PWA mobile-first, also used on desktop) · balanced · STEP 4 (inherited Tailwind v4 + PCC4SH tokens) · DENSITY 5 · RIGOR 8 · ladder 8 → 16 → 24; every tap target ≥48px and ≥12px apart (the brief's a11y floor outranks every dial)
- Did: the screen was four white cards stacked, each holding exactly one full-bleed navy 64px button, so nothing read as more or less important than anything else — textbook anti-pattern #7 (a card per group) plus #1 (uniform weight). Collapsed them into three labelled cards ("Tài khoản" / "Trên máy này" / "Thoát tài khoản") whose members are rows: 44px icon tile, title + description, then the action. Secondary actions moved to a new 48px `inline` size (`w-full sm:w-auto`) instead of the 64px full-bleed primary. Two alignment bugs surfaced only after rendering: (1) at 1280px the `inline` buttons were still 640px wide — `sm:w-auto` was set but the row is a `flex-col`, so `align-items:stretch` overrode it; `sm:self-start` fixed it to 184px. (2) the action sat at the card inset while its own description started 56px in, behind the icon tile — added `sm:pl-14` (44 + 12) so title, copy and control share one left edge (measured descLeft 554 = btnLeft 554).
- Taught: `width` is a main-axis word. In a vertical Stack the cross axis belongs to `align-items`, so every "hug your content" utility is a no-op until an `align-self` backs it — and the failure is invisible on mobile, where full-bleed happened to be the intent, then appears at the first wide breakpoint. Second: a leading icon silently defines a text column, and any control that is a sibling of the icon block re-aligns to the container inset instead. The two edges are 56px apart, which reads as sloppy rather than as a deliberate outdent.
- Verdict: gap(§4.C)
- Action: folded into §4.C @ v2.11.0 — both bullets. Visible-misalignment failure modes caught on first render, so hardened on first occurrence per the §15.D carve-out.
- Follow-up (same day, after the owner asked for a different look): the row/button split was dropped entirely for the **whole row as the tap target** — 64px rows carrying icon tile, one-line label and a chevron, with the long explanation moved to a note at the foot of the group. Measured 341×65px per target versus 279×48px before, ~1.7× the area, and the §4.C indent problem stopped existing because there is no separate control to align. Kept both §4.C bullets: the `align-self` trap is general, and the measurement stands. Added the row-as-target rule to §10.B @ v2.12.0.


### 2026-09-05 — PCC4SH / Mẫu 02-VT print margins — the page margin box is also the browser's header/footer canvas

- Space Read: printed A4 accounting form · balanced · STEP 4 · RIGOR 8 · paper margin must stay ~10mm, but nothing may print inside it
- Did: the user saw `11:52 5/9/26 · Hệ thống quản lý công trình` across the top of every printed slip and the page URL across the bottom. Those are Chrome's own header/footer, drawn **inside the `@page` margin box** — not content, so no selector reaches them. Moved the slip to a named page `@page phieu-mot-trang { margin: 0 }` and put the 10mm back as `padding` on the print root (`main[data-print-page='phieu-kho']`). Kept the default `@page { margin: 10mm }` for the multi-page reports.
- Taught: `@page` margin is doing **two** jobs — paper whitespace *and* the browser chrome's canvas. Zeroing it is the only CSS lever that removes the chrome, and the whitespace then has to be re-created as padding on the content. The catch that decides where you can apply it: **body/root padding is not per-page.** Left/right padding repeats on every sheet, but top/bottom lands only on the first and last page — so a multi-page document with `margin: 0` prints its middle pages edge-to-edge and the printer's hardware margin clips the top and bottom rows. Safe for a one-page form, a defect for a long report. Scope the named page accordingly, and prefer the failure that adds whitespace (named page ignored ⇒ 10mm margin + 10mm padding) over the one that removes it.
- Verdict: gap(§12)
- Action: folded into §12 @ v2.10.0 — added the print-margin dual-role rule and anti-pattern #22. A user-visible defect with no selector-based fix, so hardened on first occurrence per §15.D's failure-mode carve-out.

### 2026-09-05 — PCC4SH / Mẫu 02-VT slip signature row — bottom-aligned boxes ≠ bottom-aligned text → folded into §4.C

- Space Read: printed accounting form, 4-column signature block · balanced · STEP 4 · DENSITY 4 · RIGOR 8 · four signer names must land on one baseline; the gap above them is hand-signing space
- Did: signature row was a 4-track grid, each column `flex-col` with `margin-top:auto` on the name. Two columns held `<input class="mau02vt-input">` (`min-height:44px`, `padding:.3rem .2rem`), two held a bare `<span>` (~22px, line-height 1.3 × 1.05rem). Both flush at the bottom, yet the input text sat ~11px higher — the user rejected it on sight. Fix: `.mau02vt-signature-name { min-height:44px; padding:.3rem .2rem; text-align:center }` on **all four**, plus `span.mau02vt-signature-name { display:flex; align-items:center; justify-content:center }`. Print keeps only the spans, so `@media print` resets `min-height:0; padding:0`.
- Taught: `margin-top:auto` bottom-aligns the **box**; the reader sees the **text**. Any row mixing an editable control with static text inherits the control's touch-target `min-height` (44/48px) as an alignment constraint — the control centers its text inside that tall box, the span fills its short one. Invisible until the two sit side by side. The a11y floor (§9) silently authored a layout rule.
- Verdict: gap(§4.C)
- Action: folded into §4.C @ v2.9.1 — added the mixed-control/text bullet and anti-pattern #21. A visible misalignment the user caught on first render → hardened on first occurrence, per the §15.D carve-out for failure-mode warnings.

### 2026-09-01 — PCC4SH / shell taskbar — a centered clock needs balanced grid tracks and a compact mobile face

- Space Read: authenticated app shell header · balanced · STEP 8 (Tailwind 4px utilities, 8px layout rhythm) · DENSITY 4 · RIGOR 8 · title/control groups stay at the edges while the clock owns the center track
- Did: changed the header row from one flex line to `grid-template-columns: minmax(0,1fr) auto minmax(0,1fr)` with `gap-2` (8px) below `sm` and `gap-3` (12px) from `sm` upward. Measured the built CSS at 320px: header inner row 288px after 16px side padding, clock 65.86px, clock center delta **−0.0078px**, edge overlap **0px**; the clock keeps only `HH:mm` visually while its DOM/accessible label retains seconds. Measured the desktop shell at 1440px with the 368px navigation rail: taskbar content center x=904, clock center x=904, delta **0px**, overlap **0px**, inner row 1040px.
- Taught: the first symmetric grid was mathematically centered but left only 92px per side at 320px while the sync icon + avatar cluster needed 104px, creating a 4px collision. A responsive clock face is the smallest change that preserves the center track, the existing controls, and the 48px touch floor; keep the full seconds display where the side groups have room.
- Verdict: covered
- Action: none

### 2026-08-30 — PCC4SH / login screen — unlayered critical CSS beats `@layer utilities` → folded into §12

- Space Read: `auth form · balanced · STEP 4 (Tailwind inherited) · DENSITY 4 · RIGOR 8 · label↔input 8 < field↔field 20 < group↔group 32`
- Did: user reported the login field's text "starts small, then grows a moment later". Measured by disabling the built stylesheet in the live page: field `13.33px` (UA default for `<input>`; box 22px tall) vs `22px` with CSS (box 60px) — the only element on the screen whose size visibly changes, because the UA sheet renders body text at 16px but form controls at ~13.3px. Fixed delivery two ways: `experimental.inlineCss` (production; CSS ships inside the HTML, no render-blocking round trip) plus a two-line critical `<style>` in the root layout for dev/stale-cache/404-chunk paths. Then rebuilt the screen's ladder: dropped a stray `my-auto` on the `<h1>` that fought the action block's `mt-auto` for the leftover height, so two sibling gaps had been landing at a *random* 46px/47px; now a fixed 32px each. Field internals `gap-1.5` (6px, off a 4-grid) → `gap-2` (8px). Repo-wide: 84 half-step spacing utilities snapped onto the grid, and 153 ad-hoc `text-[…rem]` magic sizes folded into named tokens so one type scale remains.
- Taught: **the critical block itself was the regression.** Written unlayered, `input,button,select,textarea{font:inherit}` outranked `.text-input{font-size:1.375rem}` — Tailwind v4 puts utilities in `@layer utilities`, and layer order is resolved *before* specificity, so a bare element selector wins over a class. Field silently rendered 18px instead of 22px with the class still on the element, the rule still in the stylesheet, and all 901 tests green. Wrapping it in `@layer base { … }` restored 22px while keeping the 18px floor when the stylesheet is missing. Second, smaller lesson: because only `<input>` moves visibly, users describe late-CSS as a *field* bug, so the hunt starts in the wrong component.
- Verdict: gap(§12)
- Action: folded into §12 @ v2.9.0 — added the unlayered-CSS rule + the "only inputs visibly resize" note, and anti-pattern #20. A visible, silent, green-tests failure mode → hardened on first occurrence (§15.D's wait-for-a-repeat gates default changes, not failure-mode warnings).

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

### 2026-11-02 — Embedded operations dashboard — reserve space for related work without compressing the primary pane
- Space Read: operations dashboard with agent review and communication · packed · STEP 4 · DENSITY 8 · RIGOR 8 · 8px inside groups, 16px between panels.
- Did: at 1440×1000, replaced a 1132px-wide, 705px-high agent-only split with 744px and 372px columns separated by 16px; the agent split is 550px high and the three-machine strip 63px high. Folded secondary replay controls and the composer behind explicit actions, and limited the initial communication history to four expandable records. Kept numeric cards two-up on mobile. At 320px the nested workspace's implicit auto grid produced 360px content width; an explicit minmax(0, 1fr) track removed the overflow. Verified no horizontal overflow at 320, 390, 760, 1024, 1350 and 1440px, including the expanded composer, mobile detail and text-spacing overrides.
- Taught: when embedding a second task surface, give the parent a deliberate flow/grid instead of appending to a flex-filling split. Apply shrinking tracks at each nested grid boundary; a zero-minimum outer column cannot constrain an inner implicit auto track. Keep collapsible control state in application state so live updates preserve edits and disclosure state.
- Verdict: covered (§3.A, §4.A, §8.B, §9.C–D).
- Action: recorded verified measurements; existing guidance covers the method, no new spacing rule or version change.

### 2026-09-27 — Quota Control / plan expiry corner in the card header — a second column can share the title's baseline only through the title's line box
- Space Read: desktop tray popup, 320px, account card header: brand mark, name (14px semibold) and plan badge (11px) on row 1, email (11px) on row 2 on the name's text spine; the owner asked for the plan's paid period in the empty right corner beside them · packed · STEP 4 · DENSITY 7 · RIGOR 8 · the corner's two lines must sit on the title row's and the email row's baselines, and the owner's 23-character email must stay whole.
- Did: made the header a two-column grid (`minmax(0, 1fr) auto`) and gave the corner `grid-row: 1 / span 2` with `grid-template-rows: subgrid`, so its lines take exactly the heights of the title row and the email row. Line 2 met the email at once (both text tops at 227.39px). Line 1, `align-self: center` at the plan size, sat 2.00px above the plan badge (box tops 210.5px vs 212.5px at the same font size), because the badge rides the 14px name's baseline while the corner was a centered 11px box. `align-self: baseline` could not help: the title row is a flex container whose first item is the icon, so its baseline is not the text's. Fix: the corner's first line gets `font-size` of the name (the line box's strut) and the words sit inside it as an inline span at the plan size, the same structure as name + badge, so both line boxes are centered in the same row: text tops then matched to 0.00px (211.52 = 211.52, and 194.72 = 194.72 in English, light theme). A first attempt with a zero-width `::before` character failed for an unrelated reason (the escape was mangled into U+0080 on the way to the file and drew a tofu box); the line-box strut needs no generated content. Width: measured every wording at its widest combination before choosing (§9.D): `Hết kỳ T7 17/10` / `Khoảng T4 30/09` made the column 98–105px and cut `buidangminh23@gmail.com` by 2–9px; `tới T7 17/10` / `tới ~T4 30/09` (worst `tới ~CN 31/12`, 74.7px; English drops the verb, worst `~23 hours left`, 74.1px) keeps the column at 77.6–95.5px and the email whole with ≥9px to spare.
- Taught: baseline alignment does not cross container boundaries. Text placed in another grid column than the text it must line up with (a meta corner beside a heading, a price beside a product name) gets the other column's baseline only if its line box is built the same way: give its container the reference text's font size as the strut and nest the smaller text inline, then center both line boxes in the same row. Use `subgrid` so a multi-line side block shares the sibling column's row heights instead of guessing them. Prefer the structural strut over an invisible generated character: it survives escaping, copy-paste and fonts without that glyph.
- Verdict: refinement(§4.C — cross-column baseline via a line-box strut and subgrid rows) · covered(§9.D — the widest-value rule from v2.15.0 picked the wording before it shipped).
- Action: pending pattern — first datapoint; per §15.D fold into §4.C on a repeat. quota-control branch `claude/plan-term` (commit follows); verified in Chromium at 320px, Vietnamese and English 12-hour, dark and light.

### 2026-09-27 — Quota Control / free-reset countdown row — a caption that fits in one locale overflows in another, and the ellipsis cuts the part that names the clock → folded into §9.D @ v2.15.0
- Space Read: desktop tray popup, fixed 320px wide, a Codex account card gaining a "next free reset" row · packed · STEP 4 · DENSITY 7 · RIGOR 8 · metric captions are 10px, one line, `white-space:nowrap` + ellipsis, right-aligned in a 256px slot (card and row insets taken off the 320); the time must never lose its zone.
- Did: the caption carried an estimated time, the day, a GMT offset and the announcement's own day word. Language, 12/24-hour clock and time zone all come from the viewer's machine, so I measured every combination the data can produce instead of the one on my screen: Vietnamese 24-hour fitted at 244px, but Vietnamese 12-hour (260px), a half-hour zone `GMT+5:30` (258px) and English (296–298px) overflowed the 256px slot. Three shorter wordings still reached 257–271px at their worst combination. The ellipsis would have cut the tail, which is the offset: the one piece that says which clock the time is in. Split the caption into two lines by meaning, time and zone (`Khoảng 9:06 · T2 28/09 · GMT+7`) and the announcer's day word (`“Ngày mai” theo giờ Mỹ`). Re-measured with clones of the live caption at the worst combination: time line 197.5px (VI) and 210.5px (EN, `Around 12:48 PM · Wed, Sep 30 · GMT+5:30`), day line 149.5px (EN), and the longest caption in the same row family (the "possible reset" line) 237.9px, all inside 256. The row went from one caption line to two (57px row), and no spacing value changed.
- Taught: a no-wrap caption assembled from parts the viewer's settings choose (language, 12/24-hour clock, time zone, date order, currency) has no single width. Its width is the sum of each part's widest form, and the developer's own combination is rarely the widest. Enumerate the widest form of every part and measure that string at the narrowest slot. When it does not fit and the tail carries meaning (an offset, a unit, a status), splitting the text into lines by meaning beats shortening words until one combination happens to fit, and beats an ellipsis that removes the meaning.
- Verdict: refinement(§9.D — verify no-wrap text at its widest dynamic value) — second datapoint after the 2026-09-24 CongCuDoiTen toolbar label (`…cho 2 dòng…`, 127 → 193px).
- Action: folded into §9.D, anti-pattern #27 and a §13.C Responsive item @ v2.15.0. Verified by vitest (25 files, 275 tests), by measuring in Chromium at 320px in Vietnamese and English 12-hour, light and dark, and live in an isolated Tauri debug build on Windows.

### 2026-09-26 — Quota Control / Benchmark scan status beside its button — renaming a `flex:none` button moves its neighbour's wrap point; put the break at the seam between the two facts
- Space Read: desktop tray popup (320px), a status row: two facts ("1.284 tệp nhật ký" scanned · "7 phút trước") in a `flex: 1 1 auto; min-width: 0` text column beside a `flex:none` small button, 10px gap, row 284px between 8px paddings · packed · STEP 4 · DENSITY 8 · RIGOR 8 · the wrap must never split a number from its unit
- Did: the owner asked to rename the button "Đọc lại" to "Quét lại nhật ký". Measured with clones of the live row: the button grew 58 → 105px, so the text column shrank 200 → 153px. As one string the status wrapped "Đã quét 1.284 tệp nhật ký · 7 " / "phút trước", splitting "7" from "phút"; the old label had already stranded "trước" ("… · 7 phút " / "trước"). Split the catalog entry into two (files, age) and joined them with a `<br>`: "Đã quét 1.284 tệp nhật ký" / "7 phút trước". The row stays 30px (2 × 14.85px lines, the 22px button centred) and no spacing value changed. The same pass added a fetch-time + "Làm mới" row to four public boards on the unchanged `.uc-insight-status` class; "Tải 2 giờ 3 phút trước" fits one line beside the 66px button.
- Taught: a label change on a `flex:none` control is a spacing change for the flexible item next to it, because every pixel the label gains comes out of the neighbour's measure and moves its wrap point. When a two-fact sentence wraps anyway at the narrowest width, choose the break in the markup at the seam between the facts instead of leaving it wherever the column ends; the number↔unit atom stays whole at every width and the "·" separator disappears instead of dangling at a line end.
- Verdict: covered(§6 intra-item atoms — number↔unit is one unit; §4.E — make the wrap deterministic by forcing the break)
- Action: none. quota-control 8a8cfc4.

### 2026-09-26 — Quota Control / Codex "Lượt đặt lại hạn mức" row — an action for one row hangs under its value and reuses the row's inset as the tie
- Space Read: desktop tray popup (320px), a text row ("Lượt đặt lại hạn mức · ● 2 khả dụng") that gains a "Dùng 1 lượt" button acting on that row alone · packed · STEP 4 · DENSITY 7 · RIGOR 7 · the button must read as belonging to that value, not as a new row or a card footer
- Did: put the button on its own right-aligned line (`.uc-row-action { display:flex; justify-content:flex-end; padding: 0 var(--uc-pad-x) var(--uc-text-row-pad) }`) inside the same row host, with no top padding. The row's existing 6px bottom inset is therefore the only value→button gap. Measured in the preview: value bottom to button top 6.00px; right edges 308 = 308; button 22px tall; 6px under the button before the card's caret.
- Taught: an action scoped to one row reads as that row's when it sits in the row's own box and its gap is the row inset (intra-item), not a new stack item with its own margin. Right-aligning it to the value's edge ties it to the number it changes.
- Verdict: covered(§6.B proximity ladder; §3.A single owner — the row inset is the only owner of the value→button gap)
- Action: none. quota-control 11f006f.

### 2026-09-26 — Quota Control / Windows taskbar strip beside a Windhawk tray island — docking into OS chrome: the host's measured geometry is the scale
- Space Read: OS chrome (Windows 11 taskbar restyled by Windhawk into centered islands) · packed · STEP 4 (the host's) · DENSITY 8 · RIGOR 9 · the strip must read as a sibling island of the tray: same inter-island gap, top, height, radius and fill
- Did: measured the host through UI Automation and pixel scans:
  - islands 48px tall at y 4–52 in a 56px bar;
  - 4px between the apps island and the tray island;
  - a ≈4px corner radius, antialiased over 4 rows;
  - a fill of ≈#23293D with a 2-level vertical gradient.
  Then drew the strip as its own island 4pt after the tray:
  - height taken from the TaskbarFrame element;
  - 6pt inner padding (the content keeps its own 6pt, so 12px from edge to glyph, beside the tray's ≈16px);
  - antialiased 4pt corners;
  - a flat fill sampled with GetPixel in the island's top padding, above the buttons.
  Verified live: the tray ends at 1284 and the strip starts at 1288 (a 4px gap); both span rows 1028–1075; the fill is within 2 levels; the corner antialiasing rows match.
- Taught:
  (a) when docking into a layout system that exposes no tokens (OS chrome, a third-party skin), §0.A's detect-and-conform means *measure*: take gap, height, radius and fill from the host's pixels and reuse them exactly instead of applying our own STEP;
  (b) sample a host's fill where no interactive state can tint it (padding outside any button), never on a hoverable sliver;
  (c) read gaps on straight-edge rows, because corner rows read 1–3px wider through the radius.
- Verdict: refinement(§0.A — "existing scale / tokens" assumes tokens you can read; a host you can only measure has none)
- Action: pending pattern — single datapoint; per §15.D fold into §0.A on a repeat. quota-control 93decc6.

### 2026-09-26 — Quota Control / bounded metric row — a caption tied to one line gets its own 2px stack; pulling the row gap back with a negative margin is two owners
- Space Read: desktop tray popup (320px), a bounded metric row (label · meter · headline and countdown) gaining an exact restore-time caption under the countdown · packed · STEP 4 · DENSITY 7 · RIGOR 7 · the caption is intra-item (it belongs to the countdown) inside a 4px inter-item row stack, and it shares the countdown's right edge
- Did:
  - 14f5600 first shipped `margin-top: calc(2px - var(--uc-row-gap))` on the caption. That gives exactly 2px in both densities, but with two owners (the row gap of 4 plus a margin of −2).
  - f6e5706 wraps the countdown and the caption in `.uc-row-readout { display:flex; flex-direction:column; gap:2px }`. The caption is 10px, right-aligned, `--uc-tertiary`.
  - Measured in the preview: meter to readout 4px, countdown to caption 2.00px, right edges 308 = 308; contrast ≈4.8:1 light and ≈4.75:1 dark.
  - In compact density the row gap is 3px against the caption's 2px: 1.5×, the ladder's floor.
- Taught: a sub-caption attached to one line is intra-item space inside an inter-item stack. The tempting fix is to pull the parent gap back with a negative margin written against the gap token. It measures right, but it is a sum of two owners and drifts as soon as the gap token changes shape (a clamp, a density rung). Group the pair in its own stack instead.
- Verdict: covered(§3.A single-owner law; §6.B proximity ladder)
- Action: none — §3.A already forbids the sum ("8 here plus 8 there"); the self-correction is the datapoint. quota-control 14f5600 → f6e5706.

### 2026-09-26 — Quota Control / dashboard tab bar — a switch added to an existing bar takes the bar's metrics; nested padded shapes keep concentric radii; fixed chrome outside a scroller loses the scrollbar's width on its right edge
- Space Read: desktop tray popup (320px), a new two-tab switch ("Hạn mức" | "Token") above a stack of cards, where the Token tab holds a card with its own capsule period picker · balanced · STEP 4 (inherited popup tokens: 14px inline inset, 44px top bar, 28px bar controls) · DENSITY 6 · RIGOR 8 · the switch must read as navigation rather than a second filter, and its left edge must sit on the cards' 14px spine.
- Did: put the tab bar in the top-bar slot the other screens already use, with the same class (`.uc-topbar`: 44px, 14px inline inset, translucent bar, 0.5px bottom rule) instead of new bar CSS, and sized the switch to the bars' 28px control height (the top bar's circle buttons, the footer's Options pill): 2px track padding + 24px segments, 2px between segments, 12px labels. Measured in the preview: bar 44px, switch 28px at y=7.5 (centred in the 43px above the rule), segments 143×24 at x=16 and x=161, switch x=14 → 306, first card x=14. Radii: segment 6px (`--uc-control-radius`), track 8px = 6 + 2 padding, so the 2px band between the curves stays even round the corners. To keep it from reading as the in-card period picker (capsule, 11px), the tab switch is a rounded rectangle in the bar and the picker stays a capsule in the card. The first render left-aligned both labels, because the reset's `button { text-align: inherit }` reached them; segments are now `inline-flex` with `justify-content: center`. The right edge does not share the spine while the list scrolls: the switch ends at 306px and the cards at 298px, because the scroller's classic 8px scrollbar takes layout width and the bar sits outside the scroller. The footer's Options pill already had the same offset, so the bar stays consistent with it rather than changing every screen's inset.
- Taught: (a) a control added to an existing bar should take that bar's control metrics (height and inset), which keeps the new bar in the same rhythm as the old ones; (b) nested rounded shapes separated by padding need `outer radius = inner radius + padding`, or the band between them thickens or thins at the corners; (c) fixed chrome outside a scroll container shares the content's left edge but not its right edge whenever a classic (non-overlay) scrollbar appears, so decide it deliberately: `scrollbar-gutter: stable` plus an inline-end inset reduced by the scrollbar's width keeps both edges where the engine supports it.
- Verdict: covered(§0.A detect-and-conform; §4.E centring text in its box) · gap(§4 — concentric radii for nested padded shapes; right-edge divergence between fixed chrome and a scrolling region)
- Action: pending pattern — first datapoint for both gaps; per §15.D fold on a repeat. quota-control commit 686cb6a.

### 2026-09-26 — Quota Control / card header — the account's email moves to a line of its own on the title's text spine (covered)
- Space Read: desktop tray popup, provider card header (mark · title · plan · controls) · packed · STEP 4 · DENSITY 7 · RIGOR 8 · the first line must keep its 26px row (22px controls + 2/2 padding) so cards with and without an email still line up.
- Did: the owner wanted the email out of "Claude · nhhai1234@gma…" (cut at 20 characters beside "Pro"), placed "under the plan". The header became a column: the unchanged row (mark · "Claude" · plan · share button) plus an email line (plan-size 11px, secondary color, `padding-inline-start: calc(10px + var(--uc-header-icon) + 5px)`, i.e. the row's inset + the mark + the row gap). Measured at 320px: the row stays 26px (same as a card with no email), the email's ink starts at 59px, exactly the name's left edge, 3.9px below the name's ink; the email line to the card is about 8px (2px bottom padding + half-leading + the 4px header-card gap), so the email reads as part of the title. A long email truncates with an ellipsis, with a hover tooltip. Rejected `flex-wrap: wrap` on the row itself: lines are broken before shrinking, so a long title would jump to a new line instead of truncating.
- Taught: nothing new. §4.C already says a leading icon opens a text column that the row's secondary content should share, and §6.B's proximity ladder decides the gaps (tight inside the title unit, wider to the card).
- Verdict: covered(§4.C, §6.B)
- Action: none. quota-control commit 6e00280.

### 2026-09-26 — Quota Control / dashboard card header — a `flex:none` title starves the plan badge beside it → folded into §4.C @ v2.14.0
- Space Read: desktop tray popup, provider card header (mark · title · plan badge · controls) · packed · STEP 4 · DENSITY 7 · RIGOR 8 · the title slot is 209px of a 284px header at the popup's 320px width
- Did: account cards will be named by email, so measured a title "Claude · minh.spark.personal@gmail.com": `.uc-section-name` was `flex:none; white-space:nowrap` inside `.uc-section-titles { overflow:hidden }`, so the 283px title was cut at the slot edge with no ellipsis, and the plan badge ("Max 5x", 38px) was squeezed to 0px, hiding the one thing that told two accounts apart. Fix: the name is `flex:0 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis`, and the plan is `flex:none; max-width:9em`. Measured after: the title truncates at 166.3px, the plan keeps 37.8px, the slot no longer overflows, and short titles are unchanged ("Claude · Công ty" 112.3px + "Max 5x"). A hover tooltip shows the full title only while it is truncated (`scrollWidth > clientWidth`). quota-control commit 8f90cc3.
- Taught: the same lesson as the add-account row earlier today, from the other side. There the shrinkable button clipped; here the unshrinkable title starved its badge. In both cases nobody had decided which item yields. Decide it explicitly: long tail-tolerant text truncates, short fixed-meaning items keep their size.
- Verdict: refinement(§4.C) — second datapoint of the same pattern within a day, on a different surface
- Action: folded into §4.C @ v2.14.0 with anti-pattern #26 and a §13.C checklist item.

### 2026-09-26 — Quota Control / dashboard add-account row — a button that allows `min-width: 0` beside a flexible label is the item that gets squeezed and clipped → folded into §4.C @ v2.14.0
- Space Read: desktop tray popup, a one-line prompt row on the dashboard · packed · STEP 4 · DENSITY 7 · RIGOR 8 · label plus a prominent 22px button in the popup's list row (padding 9/12, gap 10) inside a 284px card; mouse-driven, so the AA 24px floor applies through its spacing exception
- Did: reused `.uc-list-row` for a new "no accounts" row: `.uc-list-text` (`flex: 1 1 auto; min-width: 0`) holding a 14px/600 title, then an `is-small` prominent button. Measured at the popup's 320px width: with "Chưa có tài khoản để xem hạn mức" the title took 170.8px on two lines (row 53px) and the button was squeezed to 79.2px, below its roughly 102px label, because `.uc-button` sets `min-width: 0` so full-width buttons can truncate. Fix: `.uc-list-row > .uc-button { flex: none; }` plus a shorter label ("Chưa có tài khoản"): title 147.3px on one 17.5px line, button 102.7px with `scrollWidth ≤ clientWidth`, row 40px = 9 + 22 + 9, title and button centres 0px apart. Same pass, no change needed: the sign-in waiting card's two split buttons measured 130px each with an 8px gap, and the longer label "Mở lại trang đăng nhập" fits its 128px content box exactly.
- Taught: flex shrink is shared by every item whose minimum can shrink. A component that opts into `min-width: 0` everywhere (to truncate inside full-width stacks) becomes shrinkable in every row it is dropped into, and it is the one that fails: the label wraps gracefully, the button clips its own text. In a label + action row, the content-sized action must be `flex: none` and only the label column (`min-width: 0`, wrapping) yields. This is the dual of anti-pattern #18: there a `shrink-0` child overflows a slot that is too narrow; here a shrinkable child is cut inside a slot that is wide enough.
- Verdict: refinement(§5.E — the inline floor also needs a "does not shrink" guarantee for content-sized actions) · covered(§9 — the 22px-tall target passes through the 24px spacing exception, 10px from the nearest target)
- Action: folded into §4.C @ v2.14.0 on its repeat the same day (the card-header entry above), with anti-pattern #26. Measured in the 320px dev popup (Vite + fixtures); the other new cards were checked in the live Windows popup. quota-control commit 20d9f62.

### 2026-08-17 — PCC4SH / login screen — a lockup is centred by its box, not by its ink → folded into §4.E
- Space Read: login-form · balanced · STEP 4 (Tailwind inherited) · DENSITY 4 · RIGOR 6 · one 400px measure for fields and buttons alike; the logo group must shrink to its rendered text before centring means anything
- Did: two edits on `apps/web`. (1) `Logo.tsx` — the company name's two parts became `block` spans for the `surface` tone, so the span's `max-content` equals its longer line (205.6px) instead of the whole name on one line. The lockup went from filling the column to shrink-wrapping at 321.6px. Measured left/right gaps before → after: 375px wide `0/21.4` → `10.7/10.7`; 674px wide `0/126.4` → `63.2/63.2`; 360px `3.2/3.2`; 320px still wraps (the existing `min-[360px]` breakpoint already concedes that) with no h-scroll. (2) `dang-nhap/page.tsx` — the button column was `w-full` (448px) against a `max-w-[400px]` field column, **24px proud each side** at 674px and matching only by accident on phones where both hit the viewport cap; both now read one `FORM_COLUMN` constant, re-measured identical at `137 → 537`.
- Taught: §4.E lists four centring strategies but assumes the item's box *is* its content. When `max-content` exceeds the container the item is clamped to the container, the text wraps inside it, and the trailing dead space becomes pure offset — `align-items:center` then centres a box wider than anything it paints. The failure is invisible on a phone (leftover ≈ 10px reads as a rendering quirk) and screams on a laptop (63px), so the usual mobile-first check certifies it as fine. It is a *sizing* bug wearing an alignment costume: no nudge, `justify-*` or `text-align` fixes it, because every one of them still operates on the oversized box. Sibling columns that must share a measure have the same shape — two literals of the same width match by luck until one viewport separates them.
- Verdict: gap(§4.E)
- Action: folded into §4.E @ v2.8.0 — also added anti-pattern #19. Hardened on first occurrence: a visible, measurable rendering bug rather than a baseline-default change, same precedent as §9.D @ v2.2.1 and §5.E @ v2.7.0.

### 2026-08-13 — Personal-Web / checkout method list — a fixed-width icon rail overflows onto its own label → folded into §5.E
- Space Read: payment-method-list (modal) · balanced · STEP 8 (Tailwind inherited) · DENSITY 5 · RIGOR 8 · the logo rail must be a floor, not a clamp
- Did: logo rail `w-16` → `min-w-16` on both method rows in `src/PaymentModal.tsx`. The rail held one VietQR badge (58px) and fit 64px; a second row added Visa (52px) + `gap-1` (4) + Mastercard (40) = 96px into the same 64px. Measured in the browser: box 64 / content 96 → **32px overflow**, logo content edge at x=127 against a text edge at x=107 = **20px of glyph-on-glyph overlap**. After: box 96 = content 96, overflow 0, logo↔text gap back to the row's own `gap-3` (12). Re-measured at button widths 268/300/340px (320px viewport upward): overflow 0, gap 12, no in-button h-scroll.
- Taught: §5.E already says *use a floor (`min-height`), never a clamp (`height`)* — but states it only for the **block** axis on controls, so it does not fire when the fixed dimension is an inline-axis **slot** (icon rail, logo strip, avatar column, badge tray). The inline case is worse than the block case: a too-short box clips or scrolls, whereas a too-narrow slot whose children are `shrink-0` with `max-w-none` **paints over the next flex sibling** — no clip, no scrollbar, no console warning. It also stays invisible until someone adds item N+1 to *one* row, so it reads as "that one row is broken" rather than a systemic sizing error, and the row that still has N items keeps looking correct.
- Verdict: refinement(§5.E)
- Action: folded into §5.E @ v2.7.0 — also added anti-pattern #18. Hardened on first occurrence (visible rendering bug / failure-mode warning, not a baseline-default change), same precedent as §9.D @ v2.2.1.

### 2026-08-06 — EduPortal / sweeping 90 inline grids — the conversion is a judgement per site (covered; §12 clarified)
- Space Read: `whole app, mobile · balanced · STEP 8 · DENSITY 6 · RIGOR 7 · each two-column grid stacks or stays two-up by what its narrower cell holds`
- Did: converted every inline two-column grid in the app after v2.6.0 named the defect — **82 sites in 29 files**, plus **8 fixed rails** (`1fr 340px`, `1fr 300px`) found on the way. 59 took a collapsing class, 23 a stay-two-up class, 33 more were correctly left alone (`auto-fit` already reflows, three-plus columns are not splits, one column count is driven by state). 14 sites had the wide cell second and kept their proportions via `--split-main: 0.667fr` rather than being flipped.
- Taught: two things, neither a new rule. First, the fixed rails are **already forbidden** — §4.A says column widths are fluid and §9.D says no fixed-px widths on layout containers — and they were still there on eight screens, leaving the main column **7px** on a 375px phone after the pane padding. A rule that exists and is violated eight times is evidence about how the value spreads: one inline layout property gets copy-pasted, and neither the author nor a reviewer sees a breakpoint failing because nothing fails loudly. Second, and worth adding to §12: the conversion cannot be mechanical. Sending all 82 to the collapsing class would reproduce anti-pattern #16, so the class you convert to has to carry §8.B's judgement, which means you need at least two classes before you start.
- Verdict: covered
- Action: one clarifying sentence into §12 @ v2.6.1 tying the mechanism to §8.B's judgement, with the 59/23 split as the evidence. No new rule — §4.A, §9.D, §12 and §8.B each already say their half.

### 2026-08-06 — EduPortal / admin + teacher dashboards on a phone — an inline style outranks every media query → folded into §12
- Space Read: `dashboard mobile · balanced · STEP 8 · DENSITY 6 · RIGOR 7 · content column and side column must stack; every control clears 44px`
- Did: the main split of four dashboards was `style={{ gridTemplateColumns: '1.5fr 1fr' }}` inline, so `@media (max-width: 760px)` never reached it — admin, teacher, parent and pupil all stayed two-column on a phone, the narrow side measuring **107px** on the teacher screen. Nine call sites in all. Replaced with a `.ds-split` class whose ratio comes from `var(--split-main, 1.5fr)`, so a screen sets a **variable** and CSS keeps the **property**. Measured the targets at the same time: **eleven** controls at 33px tall on the admin screen (the tab row), 42px buttons and fixed 40×40 icon buttons on the teacher screen. `.btn`, `.icon-btn`, `.tab-btn` floored at 44 on the phone breakpoint. After: admin 0 controls under 44, no grid still split.
- Taught: the responsive section of this skill assumes the breakpoint can reach the value. In a JSX codebase it frequently cannot, and the failure is **silent in both directions** — the rule is written and correct, the breakpoint fires, the layout does not move, and nothing in devtools flags it as a conflict because there is no conflict: inline simply wins. `!important` "fixes" it and is the wrong tool, since it then wins at every width rather than the one you meant. The custom-property indirection is the fix that keeps both: inline expresses intent, CSS keeps authority.
- Verdict: gap(§12)
- Action: folded into §12 @ v2.6.0 — also added anti-pattern #17. Per §15.D this is a failure-mode warning with a measured before and after, not a baseline-dial change, so the wait-for-a-repeat guardrail does not gate it.

### 2026-08-06 — EduPortal / mobile command dock — size the children, don't pick a `justify-content` (covered; §4.C refinement pending)
- Space Read: `command-dock mobile · balanced · STEP 8 · DENSITY 6 · RIGOR 7 · six icon targets share the bar width, 44px touch floor does not yield`
- Did: a full-width bar of six icon buttons sat `justify-content: flex-start` with fixed-width children — ink ended at 315px of a 512px bar, **187px empty**. Measured the buttons at the same time: **44×38**, so width cleared the touch floor and height did not. Put `flex: 1 1 0; min-width: 44px; min-height: 44px` on the actions: 75×44 each, gap 8, dead space 187 → **1px**, floor met on all six.
- Taught: nothing the skill lacks — §9.A and §10.A both put the mobile tap target at 44 hard, and §4.C already says `space-evenly` for a segmented control, which is what a six-action dock is. Logged because the *reason* the wrong value was there is worth naming: `flex-start` is correct for the **overflow** case this bar also has (`overflow-x: auto`), and it had been chosen for that case and left to govern the case where everything fits. One alignment cannot answer both.
- Refinement worth watching: for a row that is scrollable *and* usually fits, put the sizing on the **children** (`flex: 1 1 0` + `min-width:` the a11y floor) rather than choosing a `justify-content` on the parent. Children fill the space when there is room, hold their floor when there is not, and the overflow scrolls — one declaration covers both states, where §4.C's `justify-content` table only answers the fits-case. Minimum width is then arithmetic and checkable: `n × floor + (n−1) × gap + padding` (here 6×44 + 5×8 + 20 = 324px).
- Verdict: covered
- Action: none for §9/§10 — the floor was already written and was simply violated. The §4.C sizing-vs-alignment point is a single datapoint; per §15.D, harden into §4.C only on a repeat.

### 2026-08-06 — EduPortal / student + admin dashboards on a phone — a blanket one-column collapse spends the screen → folded into §8.B
- Space Read: `dashboard mobile · balanced · STEP 8 · DENSITY 6 · RIGOR 7 · four one-number stat cards must not each take a phone's width; ladder 8→16→24`
- Did: the only phone breakpoint was `@media (max-width:760px) { .cols-2,.cols-3,.cols-4 { 1fr } }`, so a four-up stat row became four full-width blocks — measured **822px** of stat cards (4 × 189 + gaps) before the first real content on a 375px screen. Added `.ds-grid:has(> .card.stat) { repeat(2,1fr) }` in its own rule so a browser without `:has()` falls back to the old one-column behaviour rather than a broken one: **371px** after. Also `.card` 22→16 padding, `.stat .stat-val` 2.1rem→1.55rem, `.page-title` 2rem→1.5rem (32px of Fredoka took two lines for a greeting and pushed the page's own action below the fold), `.page-head` wrap→`flex-direction:column` (`align-items:flex-end` only reads as alignment while the row fits), and `.sidebar` `100vh`→`100dvh`.
- Taught: **reflow is "no horizontal scroll", not "one column"** — §9.D's collapse language invites a blanket single-column mobile rule, and §8.B's compressible-vs-not test was written only about *gaps*. The same test governs column count, and the deciding fact is what the narrowest **cell** holds, not what the grid is: one number + label wants half a phone's width, a table or prose wants all of it. There is no repo-wide scale here (values ran 7/12/13/14/16/20/22/52), so §0.A signal 1 gave nothing to conform to — which is exactly when the magic numbers creep in.
- Verdict: gap(§8.B)
- Action: folded into §8.B @ v2.5.0 — also added anti-pattern #16. Per §15.D this is a failure-mode warning with a measured before/after, not a baseline-dial change, so the wait-for-a-repeat guardrail does not gate it.

### 2026-08-06 — EduPortal / same edit, self-audit — I shipped three magic numbers into the fix (covered, no skill gap)
- Space Read: as above
- Did: the first pass of that same breakpoint wrote `.ds-grid{gap:14px}`, `.stat{gap:10px}`, `.page-head{margin-bottom:18px}`. All three are off-scale. Snapped per §11 triage (`10–15→8/12/16`, `17–22→16`) to `16 / 8 / 24`, which also restores a clean ladder: intra-card **8** → grid gutter **16** → head↔content **24** (2×, then 1.5× — §6.B's floor, not its target).
- Taught: nothing the skill does not already say — §2 and §11 cover this exactly. Worth logging as evidence rather than as a lesson: the numbers appeared because I set them to "feel tighter on a phone" *before* deriving the ramp, i.e. I skipped §13.A step 3. The failure mode is reaching for a value while thinking about the viewport instead of about the tier.
- Verdict: covered
- Action: none. Logged because §15 asks for evidence, and a violation of a rule that exists is evidence about the operator, not about the skill.

### 2026-07-04 — Personal-Web / policy hub — mobile pill-nav blew out the whole page → folded into §9.D
- Space Read: docs/policy hub · balanced · STEP 8 · DENSITY 4 · RIGOR 7 · aside pill-nav must scroll-x inside its box, page contained at 320
- Did: policy grid `grid gap-8 lg:grid-cols-[240px_1fr_280px]` → added base `grid-cols-1` + `min-w-0` on the nav `<aside>`. The mobile pill-nav (10 `shrink-0` items in an `overflow-x-auto` row) had inflated the implicit `auto` grid column to ~2390px → page h-scroll at EVERY width <1024px (both VI & EN). After: 0 overflow at 320–1280 both langs; the nav scrolls internally.
- Taught: an `overflow-x-auto` scroller does NOT contain itself when its wrapper sits in an `auto`-sized grid/flex track — the track grows to the scroller's max-content and the page overflows. A grid defined with only `lg:grid-cols-[…]` falls back to an implicit `auto` column on mobile. Cap the track (`grid-cols-1` = `minmax(0,1fr)`) + `min-w-0` on the item so the scroll engages. Extends §9.D from nowrap-text to scroll-regions.
- Verdict: gap(§9.D)
- Action: folded into §9.D @ v2.4.1

### 2026-07-04 — Personal-Web / mobile header — enlarge tap targets without moving the row → folded into §9.A
- Space Read: mobile app-bar (nav utility) · balanced · STEP 8 · DENSITY 4 · RIGOR 7 · header controls on a fixed `gap-4`; targets must reach 44 without shifting the row
- Did: cart icon-button 20×20 → 40×40, hamburger 24×18 → 44×38, VN/EN toggle 16 → 36, close-× 28 → 48 — all via net-zero `-m-2.5 p-2.5` (`-my-2.5 py-2.5` on the inline VN/EN); wrapped the cart icon+badge in an inner `relative` span so the count badge stayed on the glyph, not the padded corner. Verified 0 layout shift (before/after screenshots identical) and no 320–390px overflow.
- Taught: §9.A said "pad the hit area" but was silent on the tight-cluster case where padding visibly spreads a fixed-`gap` row. An equal negative margin cancels the padding's margin-box, so the target grows at zero layout cost; and an `absolute` overlay must be re-anchored to an inner icon wrapper or it drifts to the enlarged box's corner.
- Verdict: refinement(§9.A)
- Action: folded into §9.A @ v2.4.0

### 2026-06-30 — Personal-Web / policy hub → scroll-spy (all sections, one scroll) — §8 scroll-margin under sticky aside (covered)
- Space Read: docs/policy hub · balanced · STEP 8 · DENSITY 4 · RIGOR 7 · sticky aside + sections stacked `gap-8`, active follows scroll
- Did: switched from tab (1 section) to all sections stacked; IntersectionObserver `rootMargin: "-25% 0px -60% 0px"` picks the topmost in-view section to highlight the sticky menu; nav anchors smooth-scroll with `scroll-mt-24` so the target clears the top edge; footer `#hash` still lands correctly.
- Taught: nothing new — §8 scroll-margin/scroll-padding under a sticky element + §4 sticky-aside. The rootMargin band (top ~25–40%) is the standard scroll-spy trigger zone; keep `scroll-mt` ≥ the visual top offset so anchored sections aren't clipped.
- Verdict: covered
- Action: none

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

### 2026-09-05 — PCC4SH / Mẫu 02-VT slip grid — read-only cells were the ones breaking the row's shared box
- Space Read: data-entry grid row · packed · STEP 3 · DENSITY 7 · RIGOR 9 · every cell in a row must sit on one baseline; gloved outdoor use sets a 44px floor
- Did: converted the 3 computed cells (ĐVT, Thực xuất, Thành tiền) from bare `<td>{text}` to `<input class="mau02vt-input">`, the same class the row's other 4 cells already used (`min-height: 44px`). Changed **no** spacing value — the 44px floor and cell padding were already there.
- Taught: in a grid that mixes input cells and read-only cells, the **read-only cells are the defect**, not the inputs. Each input carries its own 44px min-height box; a text-only `<td>` is one line tall and rides on the cell's vertical centring instead, so its content sits on a different optical line from its neighbours — visible as a wobble that reads like a random rendering bug rather than a spacing decision. Making the row homogeneous (every cell the same box) fixes alignment as a side effect of fixing the affordance. Second datapoint for the same rule as the 2026-09-05 signature-row case: **the touch-target floor only aligns a row if every cell in that row is subject to it.**
- Verdict: covered(§4.C + §9)
- Action: no skill change — §4.C already says the shared box governs the row, and §9's 44px floor already applies per control. Logged as the second occurrence in a different surface (grid row, not signature row); if a third appears, promote to an explicit anti-pattern "read-only cell inside an input row".
- CORRECTION, same day: the inputs were reverted — the warehouse model forbids editing those three cells (a DB `CHECK (issued_quantity = 1)`, and the issue/cancel flow moves exactly one slot). Final fix is the *general* form of the lesson, and it is the better one: the cells stay read-only but get a `min-height:44px` flex box of their own (`.mau02vt-computed`), so the row is homogeneous **without** making anything editable. Turning them into inputs was never the point — **matching the box was**. Second-order win: with the input fill colour now removed from exactly the non-editable cells, the on-screen instruction "type into the coloured cells" became literally true again, so the affordance and the alignment were one fix, not two.

### 2026-09-17 — PCC4SH / app shell chrome — a rule drawn by two sibling elements only reads as one line when both weight AND colour match
- Space Read: app shell chrome (fixed sidebar + sticky header) · balanced · STEP 8 · DENSITY 6 · RIGOR 9 · the vertical rule beside the logo and the horizontal rule under the title are drawn by two different components and must meet flush at the corner
- Did: three borders went from `border-b border-line` (1px `#c6ccd9`) to `border-b-[3px] border-accent` (`#303070`, the token the sidebar already fills with) — logo strip bottom, sticky header bottom, mobile drawer header bottom — plus a new `border-r-[3px]` on the logo strip. Changed **no** padding, gap or height: the strip stays `h-[76px]`, the header `min-h-[76px]`, and with border-box the touch targets are untouched (e2e `vung-cham` 130/130 across 11 screens confirms).
- Taught: two things, both latent until the corner is inspected. (1) Rules drawn by *separate* elements read as one continuous frame only when weight and colour both match; the original had matching geometry but a pale border meeting a navy one, and the eye reads that as a broken seam, not as two deliberate lines. The fix is not "add a divider" but "make every element contributing to the frame use the same pen". (2) When one element needs two edges in the same colour, spend **one** colour class (`border-accent`) rather than per-edge colours (`border-b-line` + `border-r-accent`): both are single-class specificity, so which edge wins is decided by the framework's CSS emit order — a coin-flip that can silently change on a Tailwind upgrade. Per-edge colour is only justified when the edges genuinely differ.
- Verdict: refinement(§4.C) — pending pattern, single datapoint
- Action: not folded into SKILL.md. §15.D gates hardening on a repeat, and this is one occurrence; it is also not a visible bug in production (the pale seam was merely ugly, not broken), so the first-occurrence exception used for the 2026-06-29 overflow case does not apply. If a second surface shows the same broken-seam signature, promote to §4.C as "a frame is one pen" plus an anti-pattern for per-edge colour classes.

### 2026-09-26 — Quota Control / Settings global-shortcut row — an undersized icon beside a full-size target needs `12 − size/2`, not `24 − size`
- Space Read: desktop tray popup, settings row · packed · STEP 4 · DENSITY 7 · RIGOR 8 · the recorder field and its clear (✕) must end on the same right edge as the row's pickers and toggles; mouse-driven, so the AA 24px floor applies, not 44
- Did: `.uc-shortcut` inline-flex, `gap: 4px`. The field reuses the popup's 22px-tall picker plus `min-width: 92px; padding: 0 9px`, so the widest combination (`Ctrl+Alt+Shift+U`) fits without resizing the row. The clear button is a 16×16 circle. Added `.uc-settings-api { margin-top: 0 }` so the API note sits under the command-line notes with no extra gap. Checked in the live 320px Windows popup: the ✕ closes the row flush with the toggles above.
- Taught: §9.B states the exception as `min edge-gap = 24 − targetSize`, which is only right when **both** neighbours are undersized. WCAG 2.5.8 requires the 24px circle around an undersized target to stay clear of another *target*, and clear of another undersized target's *circle*. Beside a target that is wide enough that its own circle stays inside its box (here the ✕'s neighbour is ≥92px wide), only the icon's circle counts: `gap ≥ 12 − size/2`. For a 16px icon that is 4px (tangent at exactly 4), where the skill's formula demands 8px. Applying the skill literally would widen every clear/stepper/chevron icon that sits against a field by 4px for no compliance gain.
- Verdict: refinement(§9.B) — pending pattern, single datapoint
- Action: not folded. Not a visible bug, and §15.D gates hardening on a repeat. If another surface pairs an undersized icon with a full-size control, split §9.B into two cases: `24 − (a + b)/2` between two undersized targets, and `12 − size/2` against a target whose own circle stays inside it.

### 2026-09-26 — Quota Control / five-tab dashboard bar — `min-width: 0` on the tabs does not let the bar shrink; the bar itself needs it
- Space Read: desktop tray popup top bar · packed · STEP 2 · DENSITY 8 · RIGOR 8 · five nowrap tab labels (Hạn mức, Token, Bảng giá, Benchmark, Reset) must fit the 292px slot between the 14px insets of a 320px window
- Did: adding Benchmark and Reset made the segmented `.uc-tabs` (a `flex: 1 1 auto` item of the top bar) 306px wide in a 292px slot, 14px past the right inset, although every `.uc-tab` already had `min-width: 0`. With more than three tabs the bar now gets `min-width: 0`, each tab `flex: 1 1 auto` (label width plus an even share of the rest) with `padding: 0 4px` and 11.5px labels. Measured in the 320px preview: bar exactly 14→306px; tabs 60.7 / 44.6 / 58.9 / 73.8 / 42.1px; no label clipped (`scrollWidth == clientWidth`) with any tab selected; the bold selected label moves its neighbours by at most 0.7px.
- Taught: a flex container's automatic minimum is its min-content size, which sums its children's min-content sizes; a child's own `min-width: 0` lowers the child's minimum, not what it contributes to the parent's. So a row of `nowrap` items inside a flex item keeps the parent at the labels' full width until the parent (the item of the outer row) gets `min-width: 0`, and even then the labels only fit if the paddings leave room, because nothing else can shrink.
- Verdict: covered(§9.D)
- Action: no skill change. §9.D's scroll-region note already prescribes `min-w-0` on the flex/grid item holding the row and verifying at the narrowest width; this is the same failure without a scroller.

### 2026-09-27 — Quota Control / Windows taskbar strip — a per-row label column costs (widest label + gap) × groups; on a fixed slot the lever is the slot, not the type
- Space Read: Windows taskbar strip inside a fixed 212×42 tray slot · packed · STEP 1 · DENSITY 9 · RIGOR 8 · each account's two stacked readings get their limit window's name ("5h", "week") and must stay legible; the native side shrinks anything wider to fit, never below 0.75
- Did: a label column after each account's mark, as wide as its widest label plus 3px, labels left-aligned and values still right-aligned; labels 10px/500 at 80% alpha. Kept the group gap (14), mark gap (5) and side padding (6). Measured in the popup's WebView with Segoe UI Variable Text: a three-account strip went from 190 to 260px natural width ("week 24%" = 23.4 + 3 + 23.7). In the slot that is 248px of ink for 204px of room (212 minus a 4px margin each end), so the native side shrinks it to 0.829 and the 12px readings render near 10px. A 262px slot keeps full size.
- Taught: (1) a label column is paid once per group, so its cost is (widest label + gap) × groups, 26px × 3 here. Fitting it by shaving type and gaps moves little: 9px labels plus 10px group gaps only brought the scale from 0.83 to 0.88, with 8px labels. On a fixed-width slot, measure the natural width against the slot first; if the gap is a whole label column, the lever is the slot's width, not the type sizes. (2) Mixing sizes on one canvas row under `textBaseline = "middle"` centres each em box, so the smaller label floats above the value's baseline. Read the value font's `TextMetrics.alphabeticBaseline` under `middle` (−3.31px for 600 12px here) and draw the label with `textBaseline = "alphabetic"` at that line. This is the canvas counterpart of the line-box rule for a second column sharing a title's baseline.
- Verdict: covered(§9.D + §4.C)
- Action: no skill change. §9.D already says to measure at the widest value against the real container, and §4.C covers shared baselines. The owner decides whether to widen the Windhawk slot rule from 212 to 262.

### 2026-09-29 — icons-pro-max / brand-mark tiles — pad a mark from its path bbox, not from the source viewBox
- Space Read: icon catalog, standalone SVG assets shown in a README grid on light and dark backdrops · balanced · STEP 4 · DENSITY 5 · RIGOR 9 · every mark sits on a white rounded tile so dark marks survive a dark page; square app marks and wide payment wordmarks share one grid
- Did: generated the tile from the path's own bounding box (svgelements `Path.bbox()`), never from the source `0 0 24 24` viewBox. Square marks: side = 1.25 × max(bbox w, h), centred, tile `rx` = 16% of the side. Wide wordmarks (payment chips): bbox plus 0.3 × bbox height on every edge. LinkedIn, which had no current source, got the same 1.25 square by widening its viewBox to `-3 -3 30 30`. Checked by rendering all 44 social and payment files at 40px on `#0d1117` in headless Chrome: no mark touches its tile edge, and Google Pay, JCB and Grab now read at the same optical size as the square marks instead of as thin strips.
- Taught: an icon set's viewBox is a design grid, not the mark's extent. Simple Icons draws every brand to touch the 24-unit box on its long axis, so a tile that equals the viewBox gives square marks zero margin and turns wordmarks into slivers inside a square. Two ratios cover both shapes: a 12.5% margin per side (1.25×) for square marks, and a margin that scales with the wordmark's height (0.3 h) for wide ones, since cap height is what the eye reads.
- Verdict: gap(§10) — pending pattern, single datapoint
- Action: not folded. §15.D gates hardening on a repeat. If a second surface builds brand tiles or chips, add a §10 recipe "brand mark on a tile": margin from the path bbox, 1.25× for square marks, 0.3 × cap height for wordmarks.

### 2026-09-29 — Quota Control / Claude vs Codex comparison table — percentage widths on value columns starve the label column; let the values shrink-wrap
- Space Read: desktop tray popup card · packed · STEP 4 · DENSITY 8 · RIGOR 8 · a three-column table (row label, Claude value, Codex value) inside a card with 12px padding at the 320px popup; six rows that must each stay on one line
- Did: the two header cells had `width: 27%`, which left the label column too narrow: in the 320px preview "Trung bình giữa hai lần" wrapped to two lines while both value columns had spare room around values such as `22,8 ngày`. Removed the fixed width; value cells got `white-space: nowrap` and `padding-left: 10px`, the row label `width: 100%` with wrapping still allowed. Measured after in the same preview: columns 133 / 63 / 63px, every row 22 to 23px tall, no cell with `scrollWidth > clientWidth`, page `scrollWidth` 320 = viewport.
- Taught: a percentage width on a value column reserves room for a value that never comes and takes it from the one column whose text is long. In a label-plus-values table on a narrow card the values are short and known (a number and a unit), so they should size to their content with `nowrap`, and the label takes the remainder. The label is the only cell allowed to wrap, as the fallback for a longer language.
- Verdict: covered(§9.D)
- Action: no skill change. §9.D already says to measure at the narrowest width with the widest real value; this is that rule applied to table columns.

### 2026-09-29 — Quota Control / paired monthly bars and history row heads — cap the column count from the widest real value, and let a row head wrap once it gains an optional item
- Space Read: desktop tray popup card · packed · STEP 4 · DENSITY 8 · RIGOR 8 · a bar chart of month columns, each holding two counts side by side over two bars, inside a card 260px wide at the 320px popup; and a history row head (avatar, badge, time, link) that gains an author handle on some rows
- Did: a review found the chart had no month cap. Twelve columns were tried first because twelve month names never repeat. Measured in the 320px preview with the widest real pair (`12` and `14`): each column was 18px while the pair of counts needs 11 + 2 + 11 = 24px, and the chart's `scrollWidth` was 266 against a `clientWidth` of 260. With eight columns each is 29px and `scrollWidth` equals `clientWidth` (260). The cap is eight. The row head got `flex-wrap: wrap` with `row-gap: 2px`, since a row by another account now prints its handle; measured on the real row (`@lydiahallie`): head 260px wide, `scrollWidth` 260, 18px tall, no child past the right edge.
- Taught: the number of columns in a fixed-width chart is a spacing decision. It follows from the narrowest container and the widest value a column can hold, not from what the data offers or from a round number such as twelve. When a row gains an optional item, measure the row with that item present and give it a wrap path before the item appears in real data.
- Verdict: covered(§9.D)
- Action: no skill change. §9.D (measure at the narrowest width with the widest real value) decided both the cap and the wrap.

### 2026-09-30 — Quota Control / latest-reset card — group a quoted post inside a card with a tint, and measure which of two cuts binds first
- Space Read: desktop tray popup card · packed · STEP 2 · DENSITY 8 · RIGOR 8 · the Reset tab's latest-reset card gains the announcement (author, up to 280 characters, an observed-by-the-site note, a link) under its time line, while a watch or scheduled card may follow below it
- Did: the announcement sits in `.uc-reset-message`, a tint box inside the card (`background: var(--uc-quinary)`, `border-radius: 8px`, `padding: 8px 10px`, column `gap: 6px`, `align-self: stretch`), not a border or a nested card; its link uses the status cards' 12px/500. Measured in the 320px preview: box 256px, text 236px at 11px/15.95px, a 280-character post ran to 7 lines at 40 characters per line and all 7 show; page `scrollWidth` 320; contrast 13.92:1 text and 5.79:1 meta in light, 9.71:1 and 5.56:1 in dark.
- Taught: (1) Inside a card, a tint is the lightest step of the separation ladder that still reads as one group; a border would repeat the card's own edge. (2) A text cut twice, by a character limit and by a line clamp, is cut by whichever binds first at the narrowest width. In the 256px status cards a 215-character excerpt needed 5 lines at 43 characters per line, and the 4-line clamp showed 4, so the clamp, not the 280-character limit, decided what the reader saw. The quoted message therefore drops the clamp and keeps the character cut plus "Đọc tiếp".
- Verdict: covered(§6.F + §9.D)
- Action: no skill change. §6.F already orders tint before hairline and border, and §9.D already asks for the widest real value at the narrowest width; this entry records that the rule applies to stacked truncation too.

### 2026-10-02 — Quota Control / limit row with countdown and exact reset moment — on a line too narrow for a phrase, drop its lead-in before cutting its payload; give a per-second text its own fixed slot
- Space Read: desktop tray popup card · packed · STEP 2 · DENSITY 8 · RIGOR 8 · each limit row went from three text lines (title + pace note, reading + countdown, restore time) to two around the meter: title left and countdown right above it, reading left and exact moment right below it, at the 320px popup with a 256px row
- Did: title line `gap: 6px`, the countdown `flex: none; margin-left: auto; white-space: nowrap` at the support size; the reading line keeps headline left and the moment right. Measured in the 320px preview: row 64.3px tall, 4px title line to meter and 4px meter to reading line, countdown and moment both end at x = 284; the countdown is 96.2px wide for every value from `05:00` to `00:01` with tabular digits. A sweep of 16 settings (vi/en × 12h/24h × regular/compact × Left/Used) found one overflow: `Đã dùng 100%` beside `Đặt lại lúc 10:59 CH · hôm nay` cut the day with an ellipsis. The moment is now two flex items (lead-in `Đặt lại lúc ` and `10:59 CH · hôm nay`) in a `flex-wrap: wrap; justify-content: flex-end; align-content: flex-end` box one line tall (`height: 1.25em; line-height: 1.25`), so the lead-in wraps out of view first. After: no ellipsis and no overflow in all 16; the lead-in is dropped only in that one setting, and the gap between reading and moment stays 56 to 66px. The full phrase is the tooltip while any part is hidden.
- Taught: (1) A right-aligned phrase is a lead-in plus a payload, and they are not worth the same. An ellipsis always cuts the end, which here is the payload (the day). Splitting the phrase and letting the lead-in leave first keeps the reader's answer whole at the narrowest width; cut the payload only when it alone does not fit. (2) A wrapped flex line moves the box's baseline, so a box that hides a wrapped line must be aligned by its edge (`align-self: flex-end`), not by baseline. (3) A text that changes every second needs its own slot: `flex: none` plus tabular digits, with the neighbour (the title) taking the truncation, or the row jitters once a second.
- Verdict: gap(§8) — pending pattern, single datapoint; (3) covered(§9.D)
- Action: not folded. §15.D gates hardening on a repeat. If a second surface needs a phrase to degrade at a narrow width, add a §8 recipe "priority drop": split lead-in and payload, wrap the lead-in out of a one-line box, align the box by its edge, keep the full phrase as the tooltip.

### 2026-10-06 — codex-mcp-bridge / GitHub README pet heading — center separate image and heading blocks in the actual Markdown renderer
- Space Read: repository README header · balanced · STEP 8 · DENSITY 3 · RIGOR 8 · two mascot images with opposing arrows above the repository name, both centered inside GitHub's article column
- Did: one 144×52px composite SVG sits in a centered paragraph, followed by a separate centered H1. Measured on the live GitHub branch page: article and heading width 838px at x=80; image x=427, width 144px, height 52px; image center error 0px; image bottom to heading top 30px. Both original mascot proportions are preserved, and the right arrow is above the left arrow. The SVG loaded successfully in GitHub's renderer.
- Taught: a README renderer supplies its own vertical rhythm. Use semantic blocks and supported alignment attributes, then measure the rendered article; a local mockup's gap does not establish the gap on GitHub. Independent centered blocks can share the same axis without a flex layout or custom CSS.
- Verdict: covered(§4.C + §14)
- Action: no skill or version change. Existing alignment and renderer rules cover this case; recorded the actual GitHub measurements.

### 2026-10-06 — codex-mcp-bridge / README views badge — keep a single metric at its intrinsic size
- Space Read: repository README header · balanced · STEP 8 · DENSITY 3 · RIGOR 8 · one GitHub views badge joins the existing package badges; the separate statistics panel is removed at the owner's request
- Did: added the badge as an ordinary linked Markdown image, with a 24px SVG height and width determined by its label and value. Measured on the actual GitHub branch page: badge 184×24px, loaded successfully, within the 838px article column. The label reads GitHub views / 14d and the source value is 207. The Project statistics heading is absent.
- Taught: the renderer already supplies the inline badge flow. Keep the metric at its intrinsic size and measure it in the real article; no custom grid or compressed type is needed for one additional value.
- Verdict: covered(§9.D + §14)
- Action: no skill or version change. Existing intrinsic sizing and renderer checks cover this edit.

### 2026-10-10 — Vue 3 equipment-booking prototype / requisition, equipment, admin and availability screens — conform to the app's off-grid control height, and measure computed styles because ancestor element selectors reach into a control row
- Space Read: form + data-table + dashboard app UI · balanced · STEP 4 (Tailwind 4) · DENSITY 6 · RIGOR 8 · label to control < field to field < panel to panel, and every control in one row the same height
- Did: an audit of the scoped styles of five Vue screens found 47 off-grid paddings, margins and gaps (0.35/0.45/0.65/0.85/1.1rem and similar). Snapped them to one ladder: label to control 8px, field to field and panel to panel 16px, helper text 4px, table cells 8×12px, button inset 16px with an 8px icon gap. First pass set controls to 40px; measuring the shared `main.css` showed every button and input in the app at 38px, so controls went back to 38px. Measured after at 1280px: admin role row six controls all 38px with equal bottoms, requisition row index text, inputs, select, subtotal text and remove button all centred at y=758, equipment item number, input and remove button all centred at y=848, availability selects, mode buttons and week arrows all 38px (were 41/38/36), both statistic grids 174×71px tiles on shared tracks (were 71 vs 86px tall). No page overflowed at 375px for four roles.
- Taught: (1) An existing control height wins over the grid even when it is off-grid; 40px on four screens beside 38px everywhere else is two scales in one app. (2) Element-type selectors in an ancestor's styles restyle what you put inside it: a Vue parent's scoped `label { font-size: 0.7rem }` reached a child component whose root is a `<label>` (an import button), so it rendered 11.2px beside a 13px button in the same row, and a page-wide `small { display: block; margin-top: 0.2rem }` pushed a note 3px below the button it sat beside. Neither shows in the component's own CSS; only computed styles of the whole row reveal it. (3) A hand-picked `margin-top: 1.5rem` meant to drop an item number and a button to their input's level missed by 4px and 12px once the label gap changed; deriving it as label line box + gap (`calc(0.8rem * 1.5 + 0.5rem)`) holds when either changes.
- Verdict: (1) covered(§0.A) · (2) gap(§12) — pending pattern, single datapoint · (3) covered(§4.C)
- Action: not folded. If a second case shows an ancestor's element selector changing a control's size inside a row, add a §12 note beside the unlayered-CSS trap: compare computed font-size and height of every control in a row, and give a reusable control component explicit typography instead of inheriting it.

### 2026-10-10 — Vue 3 equipment-booking prototype / login identity list and a lecturer card beside a select — an implicit auto grid track, a badge group that must keep shrinking, and a summary card that must match a field's shape
- Space Read: login card + form row · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · the panel must fit 375px, and a summary card sharing a row with a labelled select must share its label line and box edges
- Did: (1) the login page is `display:grid` with only `align-items` set, so its implicit `auto` column grew to the identity list's min-content and pushed the panel to 383px on a 375px viewport (8px overflow, equal to the scrollbar width, so it looked like a scrollbar artefact); `grid-template-columns: minmax(0, 1fr)` brought it to 24–351px. (2) One row then overflowed by 15px because a monospace email could not break; adding `shrink-0` to the badge group made it worse (5 of 9 rows overflowing by 27–226px) because the group's `flex-wrap` only works while the group can shrink; the fix was `min-width:0` + `break-all` on the email column and leaving the group shrinkable, 0 of 9 rows overflowing. (3) A three-line lecturer card (72px) beside a label + 38px select read as unbalanced although both columns spanned the same row; rebuilding it as a label line + a 38px box with the long ID truncated put both labels at y=351 and both boxes at 376–414.
- Taught: a wrapping flex group needs room to shrink — pinning it with `flex:none`/`shrink-0` turns `flex-wrap` off in practice and moves the overflow to its neighbours. And a card that sits in a form row should take the field's shape (label above, control-height box), not merely span the row height.
- Verdict: (1) covered(§9.D) · (2) refinement(§4.C) — pending, single datapoint · (3) covered(§4.C)
- Action: not folded. If it recurs, extend the §4.C "decide which item yields" bullet: a group that wraps its children must itself stay shrinkable; give `flex:none` only to atomic items.
### 2026-10-11 — spacing-skill / npm download badges — retain intrinsic segment widths
- Space Read: centered README badge row · balanced · STEP 8 · DENSITY 3 · RIGOR 8 · two related download metrics share one 24px height and 16px text baseline.
- Did: reused the reference badge's 12px monospace type, 4px corner radius and content-derived segment widths. Generated SVG dimensions with the real count 676 are 148×24px for the total and 191×24px for the 30-day count. Removed the six owner-selected metadata badges, retaining License. These are generated SVG measurements, not GitHub layout measurements.
- Taught: preserve intrinsic widths when labels differ; equal height and baseline group the metrics without stretching the shorter label.
- Verdict: covered(§9.D + §14)
- Action: no skill or version change; existing content sizing guidance covers this edit.

### 2026-10-15 — PCC4SH stock voucher sheet / per-line VAT select and a print-only footnote toggle inside a fixed eight-column paper form
- Space Read: paper-form replica (Mẫu 01-VT/02-VT) · dense · STEP 4 · DENSITY 7 · RIGOR 8 · the printed sheet keeps its eight fixed columns; screen-only controls must not change print geometry
- Did: put the per-line VAT select inside the existing Thành tiền cell below the computed amount (`min-width: 6.5rem`, hidden in print) instead of adding a ninth column, because every colSpan in the sheet and the A4 column widths were tuned to eight columns. The footnote toggle is a `label` with `inline-flex`, `gap: 0.5rem` and `min-height: 48px`, also hidden in print; the printed footnote is a separate print-only span in the same row. Values are from the CSS, not a browser measurement.
- Taught: when a screen form mirrors a fixed paper layout, nest screen-only controls inside an existing cell and hide them in print; adding a column re-flows every spanned row and the print widths.
- Verdict: covered(§9 a11y floor + §4.C)
- Action: no skill or version change.

### 2026-10-23 — Four member portraits in a coursework site

- Space Read: member portrait gallery · inherited STEP 16 px gap · DENSITY 4 · RIGOR 8 · preserve each photo and pair the four figures in two rows.
- Did: changed the desktop grid from three columns to two, retaining a 16 px gap and the existing one-column rule at 600 px. Connected Chrome checks at 320, 375, 600, 601, 768 and 1280 px found no horizontal page overflow; all four images loaded with object-fit contain. Desktop columns measured 382 px each at 1280 px; the single column measured 253.102 px at 320 px.
- Taught: reuse the existing gap and change the column count to fit the number of complete portrait-caption units; retain full images instead of cropping to equal aspect ratios.
- Verdict: covered (§0 detect-and-conform, §8.B content-led columns, §9.D reflow).

### 2026-10-23 — Center a bounded portrait gallery within its section

- Space Read: portrait gallery · inherited STEP 16 px · DENSITY 4 · RIGOR 8 · center the heading and bounded figure within the main content without changing other section headings.
- Did: scoped text-align center to the photo section and changed the bordered figure margin from 1em 0 to 1em auto. Retained its 820 px maximum width, 16 px grid gap, two desktop columns and one column at 600 px and below. Connected Chrome checks at 320, 375, 600, 601, 768 and 1280 px measured 0 px horizontal center difference between section and figure and no page overflow.
- Taught: center the bounded block with automatic inline margins and center its heading at the section scope; text alignment alone does not center a block.
- Verdict: covered (§4 layout alignment, §9.D reflow).

### 2026-10-23 — Keep a single original-photo collage responsive

- Space Read: member portrait collage · inherited STEP 16 px · DENSITY 4 · RIGOR 8 · retain the centered 820 px figure and preserve the supplied image aspect ratio.
- Did: replaced four nested portrait figures with one 1200 x 1320 image using width 100% and height auto; removed obsolete grid rules and retained a real-text caption with all four full names. Connected Chrome checks at 320, 375, 768 and 1280 px, then back to 320 px, measured 0 px horizontal center difference in all five cases and no horizontal page overflow. At 1280 px the image measured 786.40625 px wide inside the bounded figure.
- Taught: an intrinsically sized composite can reuse the existing container rhythm; keep names in real text because raster labels shrink with the image. Verify the narrow-wide-narrow transition after removing responsive grid rules.
- Verdict: covered (§0 detect-and-conform, §9.D reflow).

### 2026-10-31 — Office HUD panels over a full-viewport 3D map

- Space Read: HUD overlay on a map · packed · STEP 4 · DENSITY 7 · RIGOR 9 · one 12 px gutter between every floating panel, a 16 px screen edge, and the map framed only in the area the panels leave free.
- Did: measured at 1920 x 900 in the browser. Brand to rail was 17 px, brand to strip 12 px, card to card 9.6 px, and the collapse button hung 13 px over the last card. The orthographic map filled 0,0 to 1920,900 under the rail (right edge 232) and the strip (bottom 124). Put the edge, gutter, brand height and card height into tokens; derived the rail top from brand height plus gutter; moved the collapse button into its own grid column. Fitted the scene to the free rectangle and shifted it with `setViewOffset`; re-measured with a `ResizeObserver`. After: every gap 12 px, map at 244,136. At 1100 px the brand bar is wider than the narrow rail, so its bottom also counts as a top inset.
- Taught: a canvas behind floating panels needs its scene framed into the free area, with the offset in screen pixels so zoom stays centred there; padding the canvas would also shrink its background.
- Verdict: refinement(§8.E)
- Action: added the canvas framing method to §8.E in references/responsive-accessibility.md; version 2.18.0.

### 2026-10-31 — Keep a HUD rail and metric strip whole on medium screens

- Space Read: HUD overlay on a map · packed · STEP 4 · DENSITY 7 · RIGOR 9 · the owner asked that the rail and the cards never collapse, so the cards must reflow, not be hidden.
- Did: removed the 1180px breakpoint that shrank the rail to icons and hid the strip, and the 1280px rule that hid the fourth card. Below 1280px the four cards now form a 2 x 2 grid with the same 12px gutter. The selected-agent card is positioned using a --hud-strip-h token that grows with the second row. The map now spans the full width below the strip; the owner chose to let the rail float over its top-left corner. At 1100 x 800 the cards measured 414px wide with 0 clipped text nodes; the rail kept full labels at 216px.
- Taught: when a layout must not collapse, reflow the repeated units into more rows and derive dependent offsets from one token for the stack height.
- Verdict: covered (§8.B reflow, do not shrink; §3 single owner via tokens)
- Action: no skill or version change.

### 2026-10-31 — Fill the empty column with the rail, not the canvas

- Space Read: HUD overlay on a map · packed · STEP 4 · DENSITY 7 · RIGOR 9 · no floating panel may cover the map.
- Did: the previous entry let the map run under the rail to fill the empty L-shaped area, and the owner reported that the left rooms were hidden again. Anchoring the rail to both the top (below the brand) and the bottom edge (bottom: 16px) filled the column. The map went back to the area right of the rail. Measured at 1920 x 900: rail 16,80 to 232,884; strip bottom 124; nothing drawn under either.
- Taught: an empty strip beside a fixed-aspect canvas is filled by stretching the adjacent panel, not by sliding the canvas under it.
- Verdict: covered (§6.F whitespace before boxes; §8.E reserve the band)
- Action: no skill or version change.

## 2026-10-31 · Minh Spark Company · calendar sidebar and short events

- Space Read: Google Calendar style week grid · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · labels and chips must stay inside their column.
- Did: (1) the sidebar list item "Lịch chung 3/3" ran to x=508 inside a 460px aside, over the week grid starting at 476. The `ul` was a grid whose implicit track grew to the nowrap label. `grid-template-columns: minmax(0, 1fr)` plus `min-width: 0` on the aside brought the right edge back to 460. (2) 22px-tall events stacked title and "08:00 – 08:30" vertically, so the time (71px) overflowed a 56px chip. Short events now render one line: start time (`flex: none`) then title (`flex: 1 1 auto; min-width: 0`, ellipsis). Day columns are size containers, and below 6rem the time hides. Measured: 1024px viewport, column 61px, title width 9px → 44px, no horizontal overflow; 1600px, column 107px, time shown and inside the chip, title 55px.
- Taught: a nowrap label inside an auto grid track widens the track, not the label; cap the track with minmax(0, 1fr). When one-line chips get narrower than "time + a few letters", drop the secondary field with a container query on the column, not a viewport breakpoint, because column width depends on how many days are shown.
- Verdict: refinement (§4 grid/flex min-width; §8 long values)
- Action: no version change yet; candidate for §8 "secondary field yields by container width".

### 2026-10-31 — Minh Spark Company · mascot and quota cards in a fixed-height HUD strip

- Space Read: HUD summary cards · packed · STEP 4 · DENSITY 7 · RIGOR 8 · card height is fixed at 108px, so everything must fit the ~55px content band; intra 4px < inter 12px.
- Did: (1) the agent card shows three mascot cells. With the name beside the count, "Antigravity" clipped at 1600px (57px of text in a 38px slot). Moving the name to its own grid row (`grid-template-areas: "img count" "name name"`, image 36px) made each cell 61px wide at 1280px and 86px at 1600px with no clipped text. (2) The quota card shows six accounts as a 3 x 2 grid: 14px logo, then one line per window (label left, value right, 0.68rem at line-height 1.2), gaps 4px row / 12px column. Two rows plus the gap measured 56px in a 56px band at 1600px. The strip columns moved from 1 / 1.4 / 1 / 1.05 to 1.05 / 1.2 / 1.35 / 0.9 so the denser card gets the width. Checked 1000, 1280, 1600 and 1920px: no card content past its padding box, 0 clipped labels.
- Taught: in a fixed-height card, when a label clips beside a big number, give the label its own row under both instead of shrinking the number; the cell then needs only max(image + number, label) of width. When the band is fixed, rebalance the strip's fr weights toward the card with the most cells before shrinking type.
- Verdict: covered (§4.C who yields in a flex row; §8.B reflow by content demand)
- Action: no skill or version change.

### 2026-11-01 — Minh Spark Company · account names in the fixed-height quota card

- Space Read: HUD summary cards · packed · STEP 4 · DENSITY 7 · RIGOR 8 · the card height stays 108px, so adding the account name must not add a line per window.
- Did: each account cell became two lines: logo + name (local part of the email, ellipsis, full address in the tooltip), then all windows inline ("5h 100%  Tuần 50%", 4px label↔value, 8px window↔window). Measured needs: up to 120px per cell for the long labels. Cells measured 95px at 1440, 110px at 1600 and 141px at 1920, so a container query on the cell (`container-type: inline-size`, `@container (max-width: 7.5rem)`) swaps "Tuần/Fable" for "T/F". The four-card row went from 4 columns at ≥1280 to ≥1440 (below that, 2 x 2), and the fr weights became 1 / 1.3 / 1.3 / 0.9 because "Nghiệm thu" needed 56px per stage. Result at 1280, 1440, 1600, 1920: 0 window rows overflowing, 0 clipped stage/check labels; only the long account names truncate.
- Taught: when a fixed-height cell gains a line, put the variable-count items on one inline row and let a container query on the cell, not a viewport breakpoint, shorten their labels; measure the widest real combination before picking the threshold.
- Verdict: covered (§9.D worst combination; §8 container queries)
- Action: no skill or version change.

### 2026-11-01 — Minh Spark Company · side column left empty after hiding its only content per tab

- Space Read: dashboard shell · balanced · STEP 8 (inherited) · DENSITY 6 · RIGOR 8 · when a tab hides a region, the remaining regions keep their edges and no dead column stays behind.
- Did: the operations dashboard shows the machine/website status block only on the overview tab. In HUD mode the side column holds nothing else (brand and nav already live in the HUD rail), so on the other 8 tabs a 248px column stayed blank except a duplicate "live" status line at its foot (the HUD brand already shows live state). The layout now carries `data-side="system|none"` set together with the block's `hidden`, and a HUD rule at ≥761px drops the grid to `minmax(0, 1fr)` and hides the side. Measured at 1680×830: on all 8 tabs the main area went 1172 → 1420px wide and the title sits 24px from the shell edge, equal to the content inset; overview unchanged (side 248px). At 375px the bottom tab bar (side reused as nav) stays 359px wide, no horizontal scroll.
- Taught: hiding content per state is a layout change, not a visibility change. Check whether the container still has a job; if not, collapse its track from the same state flag instead of leaving an empty column. Scope the collapse to the layouts where the container held only that content, not to breakpoints where it doubles as navigation.
- Verdict: refinement (§6.F reach for whitespace before boxes; §8 reflow)
- Action: no version change; candidate for §8 "collapse a track whose only content is hidden".

### 2026-11-01 — Minh Spark Company · inline mail reader and calendar toolbar

- Space Read: Gmail/Calendar style panels inside a dashboard · balanced · STEP 4 (inherited 0.25/0.5/0.75/1rem) · DENSITY 6 · RIGOR 8 · one scroll owner per view; controls in a toolbar share one height; groups that belong together wrap together.
- Did: (1) the mail reader (header + sandboxed iframe) ran 63px past the viewport at 1680×830 (frame `min-height: 32rem`), giving an outer scroll plus the frame's own. The view root got `height: 100%` while reading, the frame `flex: 1; min-height: 16rem`; measured: outer scrollHeight = clientHeight, reader bottom 792 = content bottom 820 − 28px padding. The same fill pattern removed the month grid's 176px overflow (rows `minmax(5.5rem, 1fr)`) and the week grid's 7px (`flex: 1` instead of `max-height: calc(100dvh - 19rem)`). (2) Toolbar controls measured 35 vs 37px: the input and the segmented group added their 1px borders on top of `height: 2.25rem`. `box-sizing: border-box` on each, and inner segment buttons at `height: 100%`, brought all four to the same height. (3) At 1100px the view switch wrapped alone to the left of row 2 while the date picker stayed on row 1. Wrapping both in one group with `margin-left: auto` keeps them together and right-aligned (group right edge 1054 = toolbar right edge). At 375px no horizontal overflow in any mode.
- Taught: a view that holds its own scroller (iframe, time grid, month grid) should fill its parent from the same height chain instead of carrying a min-height or a viewport calc, so exactly one element scrolls. Controls meant to line up need the same box model, not just the same `height`. Items that must stay adjacent when a toolbar wraps belong in one flex group.
- Verdict: refinement (§3.A one owner, applied to scroll; §4.C row alignment; §8 reflow)
- Action: no version change; candidate for §8 "one scroll owner per view".

### 2026-11-01 — Minh Spark Company · mail rows collapsed to centered text after becoming buttons

- Space Read: Gmail-style message list · balanced · STEP 4 · DENSITY 6 · RIGOR 9 · dot / sender / subject / date must stay on shared column tracks.
- Did: rows changed from `<a>` to `<button>` so a click opens the message in place. The dashboard's generic `.ops-shell button` rule (0,1,1: `display: inline-flex; justify-content: center; padding; gap`) outranked the row's `.gm-row` grid (0,1,0), so every row became a centered inline run of text. One `.gm .gm-row` rule (0,2,0) now owns display grid, tracks, padding and font; the duplicate low-specificity rules were deleted. Measured at 1680/1100: dot 572, sender 603, subject 827 on every row, dates right-aligned at the same edge (row right − 16px); at 375 the two-line area layout returns, no horizontal scroll. The account column became `fit-content(22rem)` with a 15rem floor, so the longest address (24 chars) shows in full: column 267px, 0 of 4 names clipped.
- Taught: when an element changes tag, re-check which generic element rules now reach it; a component's layout rule must outrank the app's element-level defaults or it silently loses its display/justify. Size a label column with `fit-content(cap)` plus a floor instead of a fixed width when the labels are data.
- Verdict: refinement (§4 grid ownership; §9.D data-driven labels)
- Action: no version change.

### 2026-11-01 — Minh Spark Company · calendar sidebar removed, events became buttons

- Space Read: calendar panel · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · grid spans the tab; clickable chips keep their chip geometry.
- Did: dropped the 12rem "Lịch của tôi" column; `.gc-body` is one `minmax(0, 1fr)` track, so the week grid now starts at the toolbar's left edge (278) and matches its width (1351px at 1680). Events, all-day chips and month chips became `<button>`s to open a detail dialog; each got a `.gc .x` rule resetting the dashboard's generic button defaults (min-height, centering, border, padding). Measured: month chips 184px in 193px cells, all-day chip inset 4px, 0 vertical scroll; dialog `min(32rem, 100vw − 2rem)` sits 19px from both edges at 375px.
- Taught: same lesson as the mail rows: converting display elements to buttons inside an app with element-level button styles needs a component rule that resets min-height and justification, or chips grow to 36px and center their text.
- Verdict: covered (previous entry, §4 grid ownership)
- Action: no change.

### 2026-11-01 — Minh Spark Company · speech bubble and agent tags covering each other in the meeting room

- Space Read: floating labels over a 3D office · packed · STEP 4 · DENSITY 8 · RIGOR 6 · every bubble at least 8px from the next; the manager's speech bubble keeps its place and agent tags move around it.
- Did: the meeting animation added a CSS2D speech bubble above the seated manager. Agent tags already avoided each other in `layoutLabels`, but the bubble belonged to another object, so the tag of the agent seated next to the manager sat on top of it. Measured at the same frame by toggling the reservation: 6,919 px² overlap ("Sếp × AI Engineer"). The bubble's box is now reserved first in the same pass (clamped inside the viewport with the 8px edge gap), and the vertical-only dodge capped at 96px became a four-direction search (above, below, left, right of each hit) within 128px that hides a tag when nothing fits. After: 0 px² overlap, closest pair 8px apart, and in a second run 17px. At 392px wide the bubble had run past the right edge and shrunk to 145px; with the clamp and `width: 14rem; max-width: calc(100vw - 2rem)` its right edge sits 8px inside the viewport.
- Taught: collision avoidance must include every floating box over the scene, not only the ones one module owns. Reserve the foreign box first, search in four directions, and prefer hiding to overlapping. Absolutely positioned bubbles need a fixed width or they shrink near the edge.
- Verdict: gap (no section covered labels from two systems over one scene)
- Action: distilled into §8.E of `references/responsive-accessibility.md`; 2.19.0.


### 2026-11-01 — Minh Spark Company · event form edges vs a scrolling field area

- Space Read: modal form · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · label↔input 4px < field↔field 16px; inputs and footer actions share one right edge.
- Did: the create/edit dialog capped at 36rem made its field area scroll at 830px tall, and the scrollbar took 15px, so the fields ended at x=1168 while the Save button ended at 1183. `scrollbar-gutter: stable` would make the mismatch permanent (gutter reserved even with no overflow), so instead the form's cap became `calc(100dvh − 4rem)`: no overflow at 830px, fields and Save both end at 1183; at 375px the dialog sits 19px from both edges with fields and Save on one edge (333).
- Taught: a scroll container's scrollbar shifts its content edge off the edge of siblings outside it (footer, header). Prefer giving the container room so it does not scroll at common heights; reserve a gutter only when the siblings reserve the same gutter.
- Verdict: refinement (§4 shared edges; §8 one scroll owner)
- Action: no version change.

### 2026-11-01 — Minh Spark Company · Gmail labels in the mail sidebar and label chips in rows

- Space Read: mail sidebar + list · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · every folder kind (inbox icon, account dot, label tag) shares one 20px icon column; nested labels step in by one 16px rung; chips sit 8px before the subject.
- Did: added a "Nhãn" section that mirrors Gmail labels. The tag icon got the same 1.25rem box as the inbox glyph and the account dot (10px + 5px side margins), so all three centres sit at x=42; a child label (`swinburne/Rewards`) is indented `calc(1rem + depth × 1rem)` and its icon lands at x=48 (+16). Label chips (20px tall, 6px side padding, 4px apart) live inside the subject cell as a `flex: none` group with the subject text as the only shrinking child, so long subjects still ellipsize: at 1280px the clipped subject ends at 1198 and the time starts at 1214 (the row's 16px column gap). At 375px no row, chip or folder crosses the 16px gutter and the page has no horizontal scroll (scrollWidth 375).
- Taught: when a list mixes several marker types (glyph, dot, tag), give each the same box width rather than matching visual sizes, so their centres and the names after them share one column; nest by whole spacing steps.
- Verdict: covered (§4 shared edges, §6 proximity)
- Action: no change.

### 2026-11-01 — Minh Spark Company · agent tags flickering when collision avoidance flips each frame

- Space Read: floating labels over a 3D office · packed · STEP 4 · DENSITY 8 · RIGOR 6 · a tag keeps its slot until another box takes it; showing or hiding never happens within one frame.
- Did: tags such as "AI Engineer · Rảnh · codex-mcp-bridge" blinked because `layoutLabels` decided visibility fresh every frame: when two walking agents brushed past each other the search alternated between "slot found" and "no slot", toggling `offview` dozens of times a second. Added hysteresis: a tag hides only after 900 ms without a slot and reappears only after 350 ms with one; while a hide is pending it stays at its last slot and still reserves that box, and tags already shown are placed before hidden ones so a newcomer cannot evict them. Markup is rewritten only when the text actually changes. Simulated 240 frames of jittered movement: from many flips per tag to one.
- Taught: label placement over moving objects needs temporal stability as well as spatial separation. Give visibility changes asymmetric delays, let shown labels keep priority and their slot, and never decide show/hide from a single frame.
- Verdict: refinement (§8.E floating labels)
- Action: no version change.

### 2026-11-01 — Minh Spark Company · GitHub tab KPI strip and sync line

- Space Read: dashboard tab · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · the sync caption sits 8px under the KPI strip and 16px above the split view; five KPI cells share the split's left and right edges.
- Did: the GitHub tab shows five counters (CI, PR, issue, security, unread notifications). The project's base `.ops-kpis` rule loads after the tab's stylesheet and reset it to four columns, so the fifth cell wrapped; the selector became `.ops-kpis.gh-kpis` (two classes) so the tab wins without `!important`. At 1440px the cells are 5 × 223px, the strip ends at x=1392 like the split, caption 8px below and split 16px below that. On the narrow pane (392px) the grid drops to two columns and the odd fifth cell spans `1 / -1`, so it runs 15 → 366, matching the strip, instead of leaving half a row empty; scrollWidth equals the viewport.
- Taught: with an odd number of cells in a two-column fallback, make the last cell span the row so the strip keeps one right edge. A caption that belongs to the strip sits at half the gap that separates the strip from the next block.
- Verdict: covered (§4 shared edges, §6 proximity)
- Action: no change.

### 2026-11-01 — Minh Spark Company · personal to-do board with three columns

- Space Read: personal board · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · chip 4px < card 8px < column inset 12px < column gap 16px; the round check sits on the title's first line, not the card's middle.
- Did: replaced the agent board with a three-column to-do board (Cần làm, Đang làm, Xong). Measured at 1280px: column gap 16/16, all three column tops at y=179, card-to-card 8, column head → add form 12, hint → list 12, row icons 32px. The 22px check first sat 2.3px below the centre of the title's first line (1.19rem line box); `margin-top: -0.1rem` brought it to −0.25px. At 375px the columns stack at 341px each, icons grow to 44px, the check to 28px with `margin-top: -0.28rem` (offset −0.13px), inputs use 16px text, and the page has no horizontal scroll. A drop indicator is a 2px bar placed half a card gap above the target card (`top: calc(-0.25rem - 1px)`), so it sits in the gap instead of on the card border.
- Taught: a leading control in a multi-line card aligns to the first line's centre (line-height × font-size ÷ 2), not to the card; recompute the nudge whenever the control grows for touch. Put drag-and-drop insertion bars at the midpoint of the gap they will open.
- Verdict: covered (§7 optical alignment, §6 proximity)
- Action: no change.

### 2026-11-01 — Minh Spark Company · traffic and automation tabs

- Space Read: dashboard tab · balanced-dense · STEP 8 (existing ops rem scale) · DENSITY 7 · RIGOR 8 · label↔share bar 4px, row↔row 8px, card↔card 16px, section↔section ~32px.
- Did: built a traffic tab (KPI strip, day/hour bar chart, six breakdown cards) and an automation tab (five-cell KPI strip, attention list, job cards per machine). Measured at 1440px: in "Trang xem nhiều" the card's `scrollWidth − clientWidth` was 451px and 11 of 21 counts sat outside the card, although each row already had `min-width:0` and the label had `flex:0 1 auto; min-width:0` with an ellipsis. Each row `li` was itself `display:grid` with no template, so its implicit `auto` track grew to the max-content of the nowrap path. Adding `grid-template-columns:minmax(0,1fr)` to the list and to every row brought all six cards to 0px overflow and every count inside its card; 375px showed no page overflow. Bar values were also moved from the chart's top row to `bottom: calc(var(--h) + 0.25rem)` so each number sits on its own bar.
- Taught: `min-width:0` on a grid item does not cap that item's own inner grid; a nested `display:grid` needs its own `minmax(0,1fr)` track, otherwise one long unbroken string widens the row past its card even when every outer track is capped.
- Verdict: covered (§4.A `minmax(0, 1fr)`), applied one level deeper
- Action: no change.

### 2026-11-01 — Minh Spark Company · GitHub list grouped by repo

- Space Read: split list · balanced · STEP 4 · DENSITY 6 · RIGOR 8 · repo heading shares the row's left edge; badges share the row's right edge; heading sits 4px above its first row and groups are split by a hairline.
- Did: grouped GitHub items per repo. The heading reuses the group heading's 0.65rem side padding, so the repo name starts at x=287.4, exactly the LED column of the rows below; the kind badges are pushed right with `margin-left: auto` and end at 639.6 inside the 650 row edge (the row's own padding). Heading → first row 4px, groups separated by a 1px line plus 4px, so the eye reads repo blocks before rows. At 375px the heading wraps to two lines (38px) when name + commit count + badges do not fit, and the list has no horizontal overflow.
- Taught: when a flat list becomes grouped, keep group headings on the same left column as the row markers and let the summary badges take the row's right edge; a hairline plus a small gap separates groups without adding a second indent level.
- Verdict: covered (§4 shared edges, §6 proximity)
- Action: no change.

### 2026-11-01 — Minh Spark Company · minhspark.com admin tab and chart kit

- Space Read: dashboard · packed · STEP 4 (existing ops rem scale) · DENSITY 7 · RIGOR 8 · chart cards share the 12px grid gap, form rows 12px, subheading above 24 / below 12.
- Did: added a tenth dashboard tab and three measured fixes. (1) Mobile bottom tab bar at 375px: buttons were `flex:1` with nowrap labels, so each kept its min-content width and the tenth tab pushed the bar to 408px in 359px, hiding the last tab. `flex:1 1 0; min-width:0`, `white-space:normal; text-wrap:balance` and a short label ("Web") for the one long name fit all ten (scrollWidth 359 = clientWidth), every label inside its button, 1–2 lines each. (2) A form card measured 29.6px between title and description: h3 margin 4.8 + grid gap 12 + p margin 12.8, three owners. Zeroing children's margins (selector raised to `.ops-shell .pw-form > *` because `.ops-card h3` outranked the plain reset) left 11.8px owned by the gap; the select rendered 45px against a 36px input until both got `box-sizing:border-box; height:2.25rem`. (3) Stat values in two-up tiles overflowed by 28px at 375px ("37.643.000₫" in 134px); `container-type:inline-size` on the tile plus `font-size:clamp(1rem,12cqi,1.6rem)` fit all values, and an essential name ("@minhspark_bot") moved from the value slot into the label instead of being ellipsized.
- Taught: adding one item to an equal-share flex bar breaks it when items keep `min-width:auto`; give them `flex-basis:0` + `min-width:0` and let labels wrap to two balanced lines before reaching for horizontal scroll. Re-measure a reset that should own spacing: a component's own `h3` rule can outrank it and keep a second owner alive.
- Verdict: covered (§3.A single owner, §11 #26 yielding, §9.D worst-case slot), applied to a mobile tab bar and stat tiles
- Action: no change.

### 2026-11-01 — Minh Spark Company · buyer tab, order progress and customer messages

- Space Read: dashboard · packed · STEP 4 (ops rem scale) · DENSITY 7 · RIGOR 8 · filter row → segment 16, segment → stat tiles 16, step dot ↔ label 8, steps 8/12, chat bubbles 8.
- Did: three measured fixes. (1) The HUD side rail is a `display:grid` column with `overflow-y:auto`. One more tab made it 843px tall in a 794px box; the thin scrollbar took 8px, but the buttons kept their 201px min-content width, so `scrollWidth` went to 214 against `clientWidth` 206 and a horizontal scrollbar appeared. `grid-template-columns:minmax(0,1fr)` on the rail let the buttons shrink to 193px; 206 = 206 after reload. (2) A filter segment sat flush on the stat tiles (0px measured), while the search row above it had 16px; giving the segment `margin:0 0 1rem` restored the 16/16 rhythm. (3) A chat thread and the reply form below it both owned the gap (thread `margin-bottom` 16 + form `margin-top` 16 = 32); zeroing the thread margin left the form's 16px as the only owner.
- Taught: a scroll container whose items have intrinsic width will overflow sideways the moment its vertical scrollbar appears; cap the grid track (`minmax(0,1fr)`) so adding content never produces a second scrollbar. When a section gains a new control row (segment, filter), measure its distance to the next block; new rows often arrive with no outer spacing at all.
- Verdict: covered (§4.A `minmax(0, 1fr)`, §3.A single owner)
- Action: no change.

### 2026-11-01 — Minh Spark Company · automation tab split by machine

- Space Read: dashboard tab · balanced · STEP 8 (ops rem scale) · DENSITY 6 · RIGOR 8 · machine cards 12px apart, card row → machine panel 24px, group heading above 24 / below 8.
- Did: replaced three stacked machine sections with a row of three machine cards (one pressed) and one panel grouped by job type. Measured at 1440px: cards 361px wide at x 276/649/1021 (12px gaps), card row → panel 24px, no card overflows (`scrollWidth ≤ clientWidth`); at 375px the cards stack at 346×82 and the content has no horizontal overflow. Two fixes found by measuring: (1) the group heading rule `.au-group h3` also restyled every job card title nested in the group (14.4px titles turned into 12.8px group labels); the child combinator `.au-group > h3` scoped it. (2) The pressed state set `border-color`, which replaced the card's 3px left status stripe with the accent colour; setting only the top/right/bottom border colours kept the red/amber/green stripe (left border computed rgb(240,68,56) while pressed).
- Taught: a group heading styled by tag inside a container that also holds cards with the same heading tag must use a child combinator. A selected state on a card that already encodes status in one border side must recolour only the other sides, or selection hides the status.
- Verdict: covered (§6 proximity, §11 #7 over-boxing avoided by one panel)
- Action: no change.

### 2026-11-01 — Minh Spark Company · Quota Control popup filling the quota tab

- Space Read: dashboard embed · balanced · STEP inherited (popup tokens: section gap 14px, side pad 14px) · DENSITY 6 · RIGOR 8 · account cards in an auto-fill grid once the popup's own scroll container passes 46rem; column and row gutter 28px (2× the section gap).
- Did: the hub showed the Quota Control popup in an iframe capped at `min(100%, 25rem)`, centred in a 705–1351px tab, so the tab was mostly empty. Stretching the iframe alone would have turned each card into a 1,300px-wide single column. Instead the iframe takes the full tab (`flex:1; width:100%`) and the popup answers its own width: `container: uc-scroll / inline-size` on the scroll area and `@container uc-scroll (min-width: 46rem)` turns only the limits stack into `grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr))`, with non-card children (hints, sign-in progress) spanning all columns. Measured: 1680px viewport → frame 1351px, 4 columns of 313px, side padding 14/14, no horizontal overflow, no clipped button; 1024px → 2 columns; the frame squeezed to the real popup width (400px) → `display:flex`, 1 column, identical to the app window; narrow → wide → narrow returned the same columns.
- Taught: when a fixed-width app view is reused in a wide host, key the reflow on the view's own container, not a viewport media query or a host-side flag, so the native window cannot cross the threshold and stays untouched. Measuring trap: a 14px horizontal overflow came from an enter animation frozen at frame 0 (`translateX(14px)`, `currentTime 0`) in a test pane whose animation clock had stopped; finish the element's animations (`getAnimations().forEach(a => a.finish())`) before reading layout, or a transient transform reads as a layout bug.
- Verdict: covered (§8.C container queries, §8.I round trip)
- Action: no change.

### 2026-11-01 — Minh Spark Company · full add-task form in a kanban column

- Space Read: form · balanced · STEP 4 (ops rem scale) · DENSITY 5 · RIGOR 8 · label ↔ input 4, field ↔ field 12, card inset 12, form card ↔ task list 12 (separated by the card's own surface).
- Did: replaced a one-line quick-add with a labelled form (title, note, due date, priority, project) inside a 396px column. Measured: label → input 4px, every field gap 12px, inset 12px, no horizontal overflow at 1600, 1200 and 375px. First pass put date/priority/project in `repeat(auto-fit, minmax(6.5rem, 1fr))`: three tracks of 118px fit, but the empty native date input painted `mm/dd/yyy` and clipped the last character under its calendar icon (value dates like `11/06/2026` fitted, so the bug only showed while empty). Second pass: `display:flex; flex-wrap:wrap; gap:12px 8px` with `flex:1 1 8rem` on each field. At 370px inner width date and priority sit at 181px each and project wraps to a full 370px row; the wrapped row keeps the same 12px gap as the field stack, so the ladder holds.
- Taught: size a native date or time input from its empty placeholder plus the picker icon, not from a filled value. When the last item of a field row may wrap, use flex-wrap with a basis instead of an auto-fit grid, so the orphan spans the full row rather than sitting in half a track, and set row-gap equal to the form's field gap.
- Verdict: covered (§8 reflow, §6 proximity ladder)
- Action: no change.

### 2026-11-02 — Circular 3D cafe seating within one compact group

- Space Read: 3D cafe furniture group · packed · STEP inherited from scene proportions · DENSITY 7 · RIGOR 8 · four inward-facing stools share radius 1.85 around a counter of outer radius 1.35, preserving a central pickup lane.
- Did: removed two detached tables and moved four stools from two rows at z=2.22/3.85 to angles ±60°/±120° on the counter's radius. Cushion radius 0.24 leaves a 0.26 gap to the counter edge; seat top rises from 0.47 to 0.65. Reserved depth shrank from 5.7 to 3.7 scene units (35%). Updated actor seats, inward yaw, cup rest points on the counter at radius 1.12 and height 0.98, and furniture collision regions from the same seat coordinates. Verified the built local app visually in Chromium; 23 focused animation/navigation checks passed, including clear former table locations at office widths 30/42/60 and continuous cup ownership over both guests' cycles.
- Taught: furniture belongs to its service surface through proximity and a shared radial anchor; compacting the visual arrangement also requires moving the actor and collision anchors so the freed space remains usable.
- Verdict: covered (§6 proximity and §8.H motion preserves the scale), applied to scene units and shared furniture anchors.
- Action: no skill rule change.

### 2026-11-02 — A stocked circular beverage station with reachable tool groups

- Space Read: 3D service counter · packed · STEP inherited from scene proportions · DENSITY 7 · RIGOR 8 · group tools by task on the existing 0.72–1.35 annulus, while the front pickup and return trays remain open.
- Did: stocked 22 named equipment groups without enlarging the counter. Coffee works at the rear, matcha on the left and cold drinks on the right. Measured conservative world-space bounding-box corners for every equipment group: the bean jar initially reached radius 1.36061 beyond the 1.35 edge; moving its centre from (-1.06,-0.65) to (-1.04,-0.64) brought the maximum equipment radius to 1.33838. Tools used by the worker sit within two fixed 0.44 arm segments rather than stretching the old 0.14 limb as far as 1.594. Pickup, turning, pouring and release use separate eased phases; the matcha whisk stays inside the bowl during the full 15-second M stroke. Chromium renders of sifting, water, whisking, pouring and milk were inspected, and the full project suite passed 360 checks with 9 focused drink-bar checks.
- Taught: compact grouping needs both a surface budget and a reachable working anchor. A tool can fit the countertop while its handle remains out of reach; measure the handle that the animation actually grips, then preserve that anchor through turning and release. Check the final prop bounds, including handles and lids, against the surface edge.
- Verdict: covered (§6 proximity, §8.H motion preserves the scale), applied to equipment and animated hand anchors in scene units.
- Action: no skill rule change.

### 2026-11-02 — Reach limits must apply to every actor, not just the worker

- Space Read: shared 3D actor interactions · balanced · STEP inherited from model proportions · DENSITY 6 · RIGOR 9 · immutable limb lengths and shoulder anchors constrain every target, regardless of activity.
- Did: a follow-up screenshot exposed the cafe guest's stretched arm after the bartender alone had been corrected. Replaced shared unlimited arm stretching with two fixed segments: upper length inherited from each model and lower length 0.9 times the upper, giving body-local maximum reaches 0.266 (Claude), 0.304 (Codex) and 0.456 (Antigravity). Updated coffee delivery trays, fridge access steps and handle-following route, classroom pullout tools, rack controls, console grips and pool mechanical bridge. The cafe service route now climbs before each tread; a 120Hz raycast test checks feet against the real stair meshes instead of only checking endpoint height. Inspected Chromium renders for games, study, pool, cafe and fridge. Final build passed and the complete suite passed 367 checks, including immutable geometry, unit mesh scale, fixed joint lengths, unchanged shoulders, reachable contact and seek determinism.
- Taught: fixing one owner of an interaction misses the other participant. Audit every caller of a shared reach routine and every independent rig; check actual geometry and joints, not just a scale property. Reposition the actor or the service mechanism for distant targets rather than increasing the allowed arm length. For a route over steps, verify the foot height against the solid tread at intermediate frames, not only the destination.
- Verdict: covered (§6 proximity and §8.H motion preserves the scale), extended verification to all participants and solid route geometry.
- Action: corrected the earlier partial visual acceptance; no new skill rule.

### 2026-11-02 — PS5 and speaker must occupy separate shelf footprints

- Space Read: 3D TV equipment group · packed · STEP inherited from scene proportions · DENSITY 6 · RIGOR 9 · separate console and speaker volumes and anchor all equipment to the same shelf top.
- Did: the right speaker overlapped the PS5's conservative footprint by 0.155 × 0.300 × 0.065 scene units. Moved the PS5 centre from (1.02,-0.78) to (1.08,-0.80), moved both speakers symmetrically from x=±0.95 to ±0.80, and seated equipment at shelf y=0.43. The console stand now starts exactly at 0.43, body and tilted panels rest at its 0.022 top, and the cable follows the new rear connector. Final bounds: speaker-to-stand gap 0.055, stand-to-right shelf edge 0.055, no volume intersection. Inspected a close Chromium render and the fresh local build; build and 6 existing game checks passed.
- Taught: an apparent misaligned object may be two independently placed objects occupying the same volume. Measure their complete footprints, including stands, before changing the silhouette; use the shelf top as one vertical anchor and derive tilted-panel bottoms from their rotated extent.
- Verdict: covered (§4 shared anchors and §6 proximity), applied to 3D equipment footprints.
- Action: no skill rule change.

### 2026-11-02 — Desktop controls need physical surface anchors and preserved moving geometry

- Space Read: 3D agent workstation · packed · STEP inherited from model proportions · DENSITY 7 · RIGOR 9 · keep controls on the desktop and move the seat into fixed-length arm reach.
- Did: moved the shared seat offset from 0.95 to 0.58 scene units instead of lowering the keyboard and mouse trays toward distant actors. Controls stay at tray y=0.76 on a 1.78 by 0.82 desk; mouse body height changed from 0.045 to 0.035 relative to the tray to meet its surface. Keyboard contact now uses a real keycap top, including its 0.003 press travel, and the pressed key is under the hand. The full office static merge initially consumed the moving meshes and reduced instanced keycaps to static geometry; preserving only the animated descendants retained all 56 keys on each of 60 workstations. Chromium checks found no missing controls after the real full-office build; real keyboard/mouse contact error across the three full-size models was below 2.3e-16 scene units. A regression test also checks full and small models against the real moving key surfaces after static meshes are removed.
- Follow-up correction: the first contact checks proved proximity but missed handedness. With faces along local +Z, anatomical right is local -X; an agent turned toward the desk therefore needs the mouse at positive desk X and the negative-X arm must hold it. Swapped mouse ownership to that arm, moved the keyboard centre from +0.05 to -0.10 and its depth from 0.32 to 0.29, and placed the mouse pad at positive X (0.36 normally, 0.64 for the broad model). The visible keyboard-to-pad gap is now 0.09 or 0.11 scene units; small controls scale with their actor. Moved the phone back to clear this workspace. Signed actor-right assertions now accompany real keycap/wrist checks; all six model/size combinations pass. Inspected right-side Chromium renders and a fresh clip of all three models; the full suite passed 378 checks.
- Follow-up pose correction: hand contact alone also missed body clearance. Claude and Codex faces overlapped the keyboard footprint after seats were pulled forward. Their full-size desk seat now sits at z=0.75 (previously 0.53/0.58) and rises by 0.12; the desk-only reaching pose places the shoulder on the forward side of the torso while preserving both limb lengths and restoring the original joint when leaving the desk. Compact torso yaw is halved and forward lean is capped at 0.035. The chair gas lift and pad follow the actual seated hip, and the backward seat offset eases with the sitting blend. A full-office 60-second simulation of both models in full and small sizes measured a minimum face-to-keyboard gap above 0.031 and maximum typing/mouse contact error below 3.2e-9 scene units. Added core-geometry clearance and neutral-joint restoration checks to the existing regression. Removed two broad black floor supports under the footrest at the owner's request; one thin metal mount now joins the pad to the chair column. Inspected final side views and recorded a new clip; build and all 378 tests passed. Interaction acceptance must check both real hand contact and the surrounding body envelope.
- Two-hand correction: the broad-model condition still reserved Claude's right hand for the mouse during typing, so changing only the left-hand target did not satisfy a two-handed interaction. Typing now drives both hands with separate, half-cycle-offset key sequences; the mouse owns the right hand only in the mouse phase. Each Claude hand visits five real keycaps with a lifted travel phase before pressing the current cap. To keep both sides reachable without stretching limbs, the broad keyboard is centred at x=0 with width factor 2.2 (was x=-0.1 and factor 2), the right mouse moves to x=0.72 with a narrower pad, and the desk-only shoulder pose advances to z=0.27. The full-size keyboard-to-pad gap remains 0.0655 scene units and small controls preserve a proportional gap. Tests now require independent multi-key contact and horizontal wrist travel for each hand, and browser renders from both sides show both hands on the keyboard. The full 378-check suite and a fresh build passed.
- Taught: an isolated prop preview does not prove that its moving geometry survives the application's scene optimization. Verify the final scene graph and actual rendered contact surfaces; preserve dynamic descendants while leaving fixed furniture eligible for global batching. Resolve unreachable interaction by moving the seat and its actor together, keeping equipment on its intended surface.
- Verdict: covered (§6 shared anchors and §8.H motion preserves the scale), verified through full-scene batching and real key geometry.
- Action: no skill rule change.

### 2026-11-02 — Machine status popup as one responsive canvas surface

- Space Read: machine monitoring popup · packed · STEP 4 inherited from dashboard · DENSITY 8 · RIGOR 9 · one canvas owns the visible surface, with no duplicate profile or footer wrapper.
- Did: machine operation popups now contain only the existing status canvas, using zero wrapper padding and a width capped at 30rem. All three machines measured 480px wide on desktop with no profile, facts or footer. At a 375px viewport the popup measured 343px wide with its right edge at 351px and no horizontal overflow. Escape closes the popup; selecting a normal agent restores the normal agent card. Browser checks reported no page errors.
- Taught: a reusable card can switch to a canvas-only surface without shrinking the canvas through inherited card padding. Scope the variant to the selected content and verify the round trip back to the normal card, not only the compact state.
- Verdict: covered (§8 reflow and round trip, §6 proximity).
- Action: no skill rule change.

### 2026-11-03 — Admin dashboard: one gutter, flex headers that a grid rule silently overrode

- Space Read: admin dashboard (KPI row + chart/table column + side widgets + paginated tables + right drawer) · packed · STEP 4 inside tables, 8 layout · DENSITY 7 · RIGOR 8 · one 12px gutter for every card gap, 16px card inset.
- Did: rebuilt the minhspark.com admin sub-tabs of Minh Spark Company. Measured at 1440×960 (dashboard width 1121px): KPI gap 12, KPI-row-to-board 12, board column gap 12, side column 352px, card inset 16 (+1px border), four KPI cards equal height 166px. At 320px all four tabs had page scrollWidth = clientWidth and no clipped KPI value; wide tables scroll inside their own container. Three silent failures were caught only by measuring: (1) the card header was written as `.pw-card-head { display:flex }`, but the existing `.viz-card > header { display:grid }` (0,1,1) beat it (0,1,0), so the total pill wrapped under the title; fixed by matching the same selector shape `.viz-card > .pw-card-head`. (2) A reset button turned into a grid list item still inherited `.ops-shell button { justify-content:center }`, which centres the auto-sized grid track, so activity rows looked centre-aligned even with `justify-items:start`; fixed with `grid-template-columns:minmax(0,1fr); justify-content:stretch`. (3) A 4-up widget row first collapsed to 2-up at the real width because its container breakpoint (72rem) sat above the measured container (1121px); lowered to 60rem after measuring.
- Also: a 7–8 column table in a 737px main column overflowed by 47–65px; merged secondary columns into stacked cells (time under the reference, refund under the net amount) instead of shrinking type — final 755/755px.
- Taught: when adding a layout rule beside an existing component, give it at least the specificity of the rule it must replace (same selector shape), and measure the computed `display` rather than trusting the class. Any reset applied to a button that becomes a grid container must also reset `justify-content`. Set container-query breakpoints from the measured container width, not the viewport.
- Verdict: refinement (§4 alignment ownership and §12 cascade), the cascade check generalises.
- Action: logged; no rule text change yet (fits existing §12 cascade guidance).

### 2026-11-03 — Nested form popup anchored to its drawer, not the viewport

- Space Read: modal form inside a right-hand detail drawer · balanced · STEP 8 inherited · DENSITY 5 · RIGOR 8 · four fields two-up, header 16/16/0/24, body 4/24/24, footer 12/24, matching the existing task popup.
- Did: replaced the always-visible "Thêm đơn thủ công" block at the bottom of the Minh Spark Company customer drawer with a "Thêm đơn" button beside the "Đơn của khách" heading that opens a popup. The first version used `position:fixed` centred on the viewport. At 1440px it looked right, but at 800px the fixed app sidebar (a separate stacking context) painted over the left third of the popup. The popup now sits in an absolute layer that has the same box as the drawer (`top/right/bottom:0; width:min(42rem,100%)`, grid `place-items:center`, 16px padding), and the popup is capped at `min(34rem,100%)`. Measured centring at 1440px: drawer 751–1424, popup 816–1360 (left 65, right 64). At 800px: drawer 243–784, popup 260–768, with 16px inset on both sides and body scrollWidth ≤ clientWidth. The focus trap had to keep the popup's backdrop interactive; the backdrop class was added to its inert exclusion list.
- Taught: a dialog opened from inside a panel should be anchored to that panel's box, not the viewport, when any fixed chrome can overlap the viewport centre. Verify at the narrowest width where that chrome overlaps the content, not only at desktop width.
- Verdict: covered (§8 reflow, §9 focus), logged as a placement check.
- Action: no skill rule change.

### 2026-11-03 — Visually hidden caption escaped its scroller and shifted the whole panel

- Space Read: admin detail pane with inline edit form · balanced · STEP 8 inherited · DENSITY 5 · RIGOR 8 · action row Xác nhận/Huỷ at the top of the pane, fields two-up, order blocks with 12/16/16 inset.
- Did: replaced the Minh Spark Company customer/order popups with in-place editing. While the popup existed, its layer made `.ops-main` `position: relative`. A chart's visually hidden `<figcaption class="pw-sr">` (`position:absolute`, no `top`/`left`) then took `.ops-main` as its containing block but kept its static position deep inside the scrolling `.ops-content`, 1133px down a 736px shell. The `overflow:hidden` shell gained scrollable overflow and focusing the form scrolled it by 382px, leaving the lower half of the screen blank. Measured with a scan for elements whose bottom exceeded the shell, then fixed with `top:0; left:0` on `.pw-sr`; shell scrollHeight went from 1133 to 736 and scrollTop stayed 0.
- Taught: give every visually hidden absolute element explicit `top/left` (or `inset:0` + clip). Without them it sits at its static position, which can land outside a scroll container whose ancestor becomes the containing block, and an `overflow:hidden` ancestor will still scroll programmatically on focus.
- Verdict: gap (§12 cascade / implementation, sr-only pattern).
- Action: logged; candidate for the sr-only snippet in references/implementation.md.

### 2026-11-03 — Inline editor stacked into one column because the detail pane was too narrow

- Space Read: admin list + detail split with an inline edit form · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · six customer fields in full rows, label↔input 8 < field gap 12.
- Did: the Minh Spark Company customer editor rendered inside the detail pane of a 22rem list + pane split. The field grid used `repeat(auto-fill, minmax(min(100%,12rem),1fr))`, which needs ≥ 396px for two columns; the pane gave the form 286px, so every field stacked vertically and the owner asked why. While editing, the split now drops the list (`[data-editing] { grid-template-columns: minmax(0,1fr) }`, list `display:none`), caps the form at 60rem, and the editor grid uses a 15rem minimum. Measured at 1280×800: form grid 832px, three columns of 269px with 12px gaps, six fields in two full rows (top 0 and 67); previously one column of 286px with six rows.
- Taught: an auto-fill grid's column count is decided by its container, not the viewport. Compute the two-column threshold (2 × min + gap) and compare it with the measured container before blaming the grid. For a data-entry form inside a narrow detail pane, give the editor the pane's sibling space while editing, and choose the column minimum so the field count fills whole rows at the expected width.
- Verdict: refinement (§4 grid sizing, §8 container-driven reflow).
- Action: logged; no rule text change.

### 2026-11-03 — A taller sibling cell pushed the neighbouring inputs down (grid `align-content` default)

- Space Read: admin order form, 3-column field grid · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · inputs in one row share one top edge; label→input 4 < field row gap 12.
- Did: added a purchase-date field with a row of quick-pick chips ("Hôm nay", "Hôm qua") under its input in the Minh Spark Company order editor. The chip row made that cell 83px tall instead of 55px; the grid stretched the two neighbouring cells to 83px, and because each `.pw-field` is itself `display:grid` with the default `align-content: normal` (stretch for auto rows), the extra 28px went into the label row. Measured before: purchase input top 86px, expiry and reference inputs 100px (14px off). Fix: `.pw-field { align-content: start }`. After: all three input tops 86px, label→input gap 4px in every cell, next row at 162px (83 + 12 + 67).
- Taught: when a field wrapper is a grid or column flex and the parent grid stretches rows, pack the wrapper's own rows to the start (`align-content:start`, or `justify-content:flex-start` for flex). Otherwise any helper text or chips added under one input silently shift the label/input pair in every sibling cell. Measure input tops across the row, not cell tops — the cells were all aligned while the inputs were not.
- Verdict: refinement (§4 alignment ownership, §6.C label↔input unit).
- Action: logged; no rule text change.

### 2026-11-03 — Text date field plus calendar button kept on the same input line as its neighbours

- Space Read: admin order form, 3-column field grid · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · input + 36px icon button inline (gap 4), calendar popover 17rem anchored under the field.
- Did: replaced a native date input (its display follows the browser locale, so dd/mm/yyyy could not be forced) with a text input and a square calendar toggle in a flex row (`gap:0.25rem`, input `flex:1; min-width:0`, toggle `flex:none` 36×36 to match the 36px input height), quick-pick chips below, and an absolutely positioned calendar (`top: calc(100% + 0.25rem)`) so opening it never moves the grid. Measured at 1280px: the three row inputs and the toggle all start at 86px and are 36px tall; day cells 32px tall (≥ 24px target).
- Taught: when an inline control joins an input inside a grid cell, size it to the input's computed height and keep the popover out of flow; then re-measure input tops across the row, not only inside the edited cell.
- Verdict: covered (§4 alignment, §9 targets).
- Action: logged; no rule text change.


### 2026-11-04 — A `flex:none` action bar never wrapped, so the header clipped its last buttons

- Space Read: admin detail pane header (title block + action bar) · balanced · STEP 8 inherited · DENSITY 5 · RIGOR 7 · buttons keep their size; the bar wraps inside the pane instead of overflowing.
- Did: the Minh Spark Company customer profile header grew from two to four actions ("Thêm đơn", "Thêm email khác", "Sửa thông tin", "Xoá khách"). The header is `display:flex; flex-wrap:wrap`, the bar inside it was `.pw-pane-head > .pw-action-bar { flex:none }` with its own `flex-wrap:wrap`. Because the bar itself could not shrink, its width stayed max-content (538px) inside a 285px header, its own wrap never triggered, and the last two buttons were painted 225px past the pane edge (pane scrollWidth 566 vs clientWidth 341 at an 800px viewport). Fix: `flex:0 1 auto; min-width:0` on the bar, buttons stay `flex:none`. After: pane scrollWidth 341 = clientWidth, buttons in two rows (tops 144 and 188, 8px row gap), none with scrollWidth > clientWidth.
- Taught: `flex-wrap` on a container only fires when that container is given less than its max-content width. A wrapping group nested as a flex item must be allowed to shrink (`flex-shrink:1; min-width:0`); keep `flex:none` on the leaves (buttons, badges), not on the group that holds them. Re-measure whenever an action set grows.
- Verdict: refinement (§4.C which item yields, §8 reflow).
- Action: logged; no rule text change.

### 2026-11-04 — A fifth KPI card: column count keyed to the card count, not a blanket repeat(4)

- Space Read: dashboard KPI row · balanced · STEP 4 inherited (gap 12px) · DENSITY 6 · RIGOR 8 · five equal tracks share one 12px gutter; the longest value ("4.852.000₫") must never truncate.
- Did: added a "Lợi nhuận" card to the Minh Spark Company minhspark.com overview, making five KPI cards in a row built for four (`repeat(4, minmax(0,1fr))`). Rather than change every KPI row, the renderer now writes `data-count="${cards.length}"` and the CSS adds `.kpi-cards[data-count="5"] { repeat(5, …) }`, with container steps 3 columns at ≤ 68rem and 2 at ≤ 48rem; the existing 48rem/20rem rules list `[data-count="5"]` too so the higher-specificity selector cannot override them. 68rem = 5 × 13rem minimum card + 4 × 0.75rem gaps. Measured: 1600px viewport 5 × 243px with 12px gaps; 1200px 3 + 2 × 286px; 900px and 400px 2 columns; every `.kpi-value` scrollWidth ≤ clientWidth; narrow → wide round trip back to 5 columns.
- Taught: when one instance of a shared row component gets an extra cell, key the track count on the cell count (a data attribute from the renderer) and give it its own container breakpoints; repeat the attribute selector inside the narrower existing breakpoints, or the more specific base rule silently wins over them.
- Verdict: covered (§8.B columns from content demand, §11 #17 layout stays in CSS).
- Action: logged; no rule text change.

### 2026-11-04 — An HTML panel laid over a 3D screen mesh with CSS3DRenderer: no manual view-offset shift

- Space Read: in-scene TV screen (HTML over a WebGL plane) · balanced · STEP 8 · DENSITY 5 · RIGOR 7 · the HTML box must cover the mesh edge-to-edge at every zoom; header↔body 24, columns 32, items 16, label↔value 8.
- Did: replaced the canvas-textured LED wall in the Minh Spark Company 3D office with a YouTube TV built as HTML (2400 design px wide, height = 2400 × meshHeight / meshWidth) and placed with three.js `CSS3DRenderer`: copy the mesh's `matrixWorld` into the `CSS3DObject`, then scale by `meshWidth / 2400`. The orthographic camera uses `setViewOffset` to keep the room clear of a left sidebar and a top HUD. A first version also translated the CSS3D layer by that offset (`shiftX, shiftY`); measured result: the HTML box sat at 777,230 while the mesh's black area started at 655,162, exactly the 122 / 68 px offset too far. Removing the manual translate: box 655,162 · 534×134 at home zoom, 290,70 · 1264×318 after zooming in, edges on the mesh border both times.
- Taught: CSS3DRenderer already folds the camera's view offset into its CSS camera transform, so do not shift its layer again. Set the HTML element's aspect ratio from the mesh's own width/height instead of a fixed design height, and verify by comparing the element's bounding box with the visible mesh edges at two zoom levels.
- Verdict: gap (overlay alignment for 3D scenes is not covered).
- Action: logged; no rule text change.

### 2026-11-04 — Framing a tilted in-scene screen: fit by its projected height, centre in the free area

- Space Read: in-scene YouTube app on a tilted 3D screen · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · the screen must fill the free viewport (right of a 244px sidebar, below a 136px HUD) at 94% without touching either.
- Did: added a "fit screen" button to the Minh Spark Company YouTube TV. Zoom = min(freeWidth / meshWidth, freeHeight / projectedHeight) × 0.94, where projectedHeight = |(top − bottom of the mesh in world space) · camera up|, so the screen's tilt toward the camera is counted instead of its raw height; the camera target is the ground point on the view ray through the mesh centre. Measured at 1600×950: screen box 1275 px wide = 94% of the 1356 px free width, vertical centre 543 = centre of the free band (136–950). Before, manual zooming left the search bar of the screen under the HUD.
- Taught: to frame a tilted surface, measure its height along the camera's up vector, not its own height, and centre it on the free area that the view offset already describes; then verify the element's bounding box against the free area, not the window.
- Verdict: gap (camera framing of overlays is not covered).
- Action: logged; no rule text change.

### 2026-11-04 — Rebuilding YouTube desktop at 1.5x inside a 2400×1350 in-scene screen

- Space Read: YouTube desktop on a 2400×1350 TV · balanced · STEP 6 (YouTube's own ramp × 1.5) · DENSITY 5 · RIGOR 8 · masthead 84, guide 360, grid 3 columns gap 24 / rows 60, avatar↔text 18, thumbnail↔details 18.
- Did: the Minh Spark Company CEO screen was raised to 16:9 and its YouTube app redrawn to match the owner's screenshot of real YouTube Premium. Every size is YouTube's 1x value times 1.5 (the screen is 1.5 × a 1600 CSS px desktop): masthead 56→84, guide 240→360 (mini 72→108), guide row 40→60 with radius 10→15, search 640×40→960×60, chip 32→48, avatar 36→54, title 16/22→24/33, meta 14/20→21/30. Measured in the DOM: column gap 24, row gap 60, avatar→text 18, thumbnail→details 18, masthead 84, guide 360, three 639px tracks. The 4K player is a separate 3840×2160 box scaled by min(W/3840, H/2160) and, in the miniplayer, by 600/3840 with its corner radius divided by the same factor (18 / 0.156 ≈ 115).
- Taught: when cloning a known product UI at a non-1x canvas, take the product's 1x spacing ramp and multiply it by one factor instead of inventing a new ramp; any element drawn in a different scaled coordinate space (here the player box) needs its radii and insets divided by that space's scale. Third-party iframe chrome cannot be resized, so rendering it at 3840 px for 4K makes its controls ~1/3 size; flag that trade-off instead of hiding it.
- Verdict: refinement (§10 recipes assume native scale; scaled clones need the single-factor rule).
- Action: logged; no rule text change.

### 2026-11-04 — Office tool UI on a localhost page: inline table links fell under the 24px target

- Space Read: office forms + result tables (Recipt Tools web UI) · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · label↔input 8 < field↔field 16 < group 24, card inset 24.
- Did: built a 5-tab localhost UI (statements, contracts, customer editor, invoice drop zone) on one 8px ramp: `.field` gap 8, `.grid` gap 16, `.stack` gap 24, card padding 24, controls min-height 40. Measured at 320 px on every tab: `scrollWidth` = 320, no horizontal scroll. The audit of targets under 24×24 found the inline "open folder / download" text links in result tables at under 24 px tall (plain inline text at 15px / 1.5). Fix: `.link, td a { display: inline-flex; align-items: center; min-height: 24px; min-width: 24px }`; re-measured 0 of 8 links under 24 px, layout unchanged.
- Taught: text links that act as row actions inside a table are interactive targets too; an inline run of text is only as tall as its line box, so give them an inline-flex box with a 24px floor instead of padding that would change the row rhythm. Audit with a DOM pass over every visible `button, a` in each tab, not only the primary buttons.
- Verdict: covered (§9 target floor); this records the table-link case and the cheap fix.
- Action: logged; no rule text change.

### 2026-11-05 — A fixed sidebar ate the width of the densest editor; collapse it to icons while that editor is open

- Space Read: office app shell (Receipt Tools, desktop only) · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · sidebar 248, page padding 32, card↔card 24, label↔input 8 < field↔field 16.
- Did: moved the top tab bar into a 248px left sidebar with grouped, icon-led items. Measured at 1366 px: the slip editor's line-item table (min content 1162 px) now had a 493 px viewport and scrolled sideways, worse than before the sidebar. Fix with CSS only: `.app:has(#slip-editor:not([hidden])) { --sidebar: 72px }`, nav labels visually hidden (accessible name and `title` kept), and when the editor has no file preview (`.slip-editor:has(#slip-preview > p.hint:only-child)`) the two-column grid becomes one column. Re-measured: sidebar 72 px, table viewport 1113 px; no page-level horizontal scroll on any of 8 tabs at 1366 and 1024 px.
- Taught: adding persistent chrome is a width budget decision for the densest workflow, not only for the landing page. Measure the widest working surface (here a data-entry table's scrollWidth vs clientWidth) before and after; when it regresses, shrink the chrome contextually with `:has()` on the open editor instead of shrinking the table's columns. An empty side panel should release its column.
- Verdict: gap (§8 covers viewport reflow, not chrome competing with an in-page dense editor).
- Action: logged; no rule text change.

### 2026-11-05 — Ultrawide ops dashboard: a page cap, a half-empty row and a width leak behind a fixed sidebar

- Space Read: bot operations dashboard (Gemera, light only) · balanced to packed · STEP 8 · DENSITY 7 · RIGOR 8 · page gutter clamp(16px, 1.6vw, 32px) shared by topbar and content, section 24, card gap 16, card inset 20.
- Did: the owner's screenshot put the sidebar at 139 image px; it is 220 CSS px, so scale 0.63 and a real viewport of about 3175 CSS px. Rebuilt the view at that width and measured: content 1800px wide starting at x=793 while the topbar control sat at x=244, so 573px of misaligned empty space on the left. Removed the cap, so both left edges land on x=252. A panel alone in a two-column grid left half its row empty; paired it with the short schedule panel at 1fr/2fr. Replaced an inline `auto-fit, minmax(180px, 1fr)` stat row, which left orphans and outranked every media query, with explicit 6/3/2 columns. Added `min-width: 0` to the flex item beside the fixed sidebar: at 390px one 940px table had widened the page to 992px. Checked 7 widths × 5 tabs: 35/35 with `scrollWidth` = viewport, and a 390 → 3175 → 1440 → 390 → 3175 round trip returned identical columns and heights.
- Taught: derive the owner's viewport from a known fixed-width element in their screenshot before judging a layout, because a capped layout looks fine at every width the agent normally tests. A breakpoint ladder that ends in `max-width` is a decision about the widest screen, so check it against the widest screen actually in use. When a row holds one short card beside full-span siblings, pair it with another short card instead of stretching it.
- Verdict: refinement (§8 and §9.D cover reflow and the `min-width: 0` leak; reading the real viewport from a screenshot was not written down).
- Action: logged; no rule text change.

### 2026-11-05 — Excel statement: compute wrapped row heights, then calibrate against AutoFit in real Excel

- Space Read: A4 billing table in Excel (Receipt Tools) · packed · STEP 4 · DENSITY 8 · RIGOR 9 · description column wraps, numbers share one right edge, total label sits next to the amount.
- Did: 127/336 descriptions were cut at column width 29.43. Widened to 40, wrapped, set explicit row heights from Pillow text measurement, right-aligned every numeric column with one number format, merged the total label A:H right-aligned against the amount column, removed stray formulas below the table, and set A4 fit-to-one-page-wide with a repeating header. The first estimate made rows of one line as tall as two. Real Excel gave column px = width x 8 for Arial 11, line height 14.25pt, and a wrap boundary at about 319-323 measured px. After calibration, AutoFit across 20 files and 336 rows: 0 rows too short, 3 slightly tall, 0 `###` cells.
- Taught: a spreadsheet cannot be judged from file properties. openpyxl reported Calibri while the theme rendered Arial, so measure with the font Excel reports. Calibrate an estimated row height by comparing it with AutoFit on all real rows, and choose the padding so an error can only make a row taller, never clip it. Put a total label next to its value; a label across empty numeric columns detaches it from the number it names.
- Verdict: gap (§14 covers documents, not spreadsheet row and column calibration).
- Action: logged; no rule text change.

### 2026-11-05 — Answer form trapped in a capped pane: move the action up, not the scrollbar

- Space Read: agent question form inside an ops overview · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · label↔description 0, option↔option 8, block↔block 12–16, row min-height 44.
- Did: the form sat in a detail pane capped at clamp(400px, 55dvh, 640px), below KPI cards, with a second scrollbar on the page. Measured 1280×900: pane 480px tall holding 1337px of content, form 792px. Moved the pending question into a full-width band directly under the page heading, turned options into `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` and fields into `minmax(min(100%, 20rem), 1fr)`, set the free-text row on one line. Result: form 390px at 1280×900 and 403px at 1024×768, both fully inside the viewport with no scroll; a real mouse run confirmed selection and send.
- Taught: when the primary action of a screen needs scrolling inside a nested scroller, measure `scrollHeight` against `clientHeight` for every ancestor, then relocate the action to where the width is, because tightening gaps alone would not close a 2.8× overflow. Separately, count how often a live view replaces its DOM: at one swap per 3 s, a press spanning a swap lands on a new node and the click is lost, so hold the swap from pointerdown to pointerup.
- Verdict: refinement (§8 covers reflow; nested-scroller height budgeting for a primary action was not written down).
- Action: logged; no rule text change.

### 2026-11-05 — Phone popup under a fixed logo: size the popup to the free band, not to the viewport

- Space Read: floating agent popup on a phone HUD · balanced · STEP 4 · DENSITY 5 · RIGOR 8 · popup must sit between the fixed logo pill and the bottom-right buttons with one 12px gap each side.
- Did: at 375×812 the popup ran top 40 to bottom 740 while the logo pill (higher z-index) ended at 68, so the logo hid the popup title by 28px and the buttons covered its footer by 40px. Anchored it at `bottom: 7.75rem` and set `max-height: calc(100dvh - 7.75rem - edge - logo height - gap)`. Measured gaps afterwards: 12px top and 12px bottom at 375×812 and 320×568, no horizontal scroll, `elementFromPoint` on the title returns the popup. Content still scrolls inside the popup (738px in 608px).
- Taught: raising the popup's z-index would only swap which element is hidden. When fixed chrome sits at both ends, compute the popup's height budget from those elements and verify with `elementFromPoint` on the title, not only with rectangles.
- Verdict: refinement (§8 covers reflow; the height budget between fixed chrome on phones was not written down).
- Action: logged; no rule text change.

### 2026-11-05 — Spreadsheet preview with many columns: allot widths from measured words, not character counts

- Space Read: source spreadsheet viewer · packed · STEP 4 · DENSITY 8 · RIGOR 9 · 15 columns must fit a 901px panel with no scrollbar inside the table.
- Did: the table used `width: max-content` with a 100px minimum per cell and a 580px inner scroller: 1909px wide in an 886px panel. Switched to `table-layout: fixed` and computed each `col` from canvas `measureText`: the longest word sets the minimum, the longest line sets the wish, spare width fills wishes. Removed the inner height so the header sticks under the page's own jump bar. Measured 9 sheets at 1280 and 1500: `scrollWidth` equals `clientWidth`, 0 clipped cells, only tokens without spaces wrap.
- Taught: a first pass sized by character count broke "NGÀY" mid-word because Vietnamese capitals run wider than digits, so measure with the real font. When word minimums exceed the panel, lower a cap on long tokens step by step before allowing a scrollbar, and enable horizontal scrolling only for the sheet that still cannot fit, because a blanket media query would keep sticky headers off everywhere.
- Verdict: refinement (§8 covers overflow; measured column allotment for dense tables was not written down).
- Action: logged; no rule text change.

### 2026-11-05 — Link beside a button in a form footer: one action group, one owner of the gap

- Space Read: agent answer form footer · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · note text left, actions right, 8px between actions, 40px control height.
- Did: added an anchor next to the send button. Grouped both in one actions wrapper that owns the auto margin and the 8px gap, and removed the auto margin from the buttons inside it. Measured: link and button 40px tall with an 8px gap at 1024px, and 44px with the same gap on a touch width of 320px, where the group wraps under the note with no overflow.
- Taught: a button-only selector leaves an anchor styled as a button at a different height. Extend every state selector (base, hover, focus, coarse pointer) to the anchor, then compare measured heights.
- Verdict: covered (§3 single-owner gap, §9 targets).
- Action: logged; no rule text change.

### 2026-11-05 — Inputs without a type attribute skipped the form styling

- Space Read: settings form in a price card · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · three fields in one row, 16px field to actions, 41px controls.
- Did: added an edit form for prices using the page's field class. Measured the inputs at 21px tall while sibling forms had 41px, because the stylesheet targets `input[type=text]`. Added the attribute: inputs 41px, buttons 41px, 16px to the actions row, no page overflow at 1280px.
- Taught: an attribute selector silently misses a control that relies on the default type, so the form looks broken only at render time. Measure control heights against a sibling form rather than reading the markup.
- Verdict: covered (§9 targets, §3 gap owner).
- Action: logged; no rule text change.

### 2026-11-05 — Inline form row and a collapsible card: buttons above the inputs, filters flush with the table

- Space Read: price ledger edit row and unmatched-rows panel · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · buttons share the input row's edges, 16px between every block in the panel.
- Did: the actions cell in a four-column form grid stretched to label plus input height and centered its buttons, so they sat 14.5px above the inputs. Added `align-self: end` to that cell: 0px offset at the top and bottom at 1500px, 16px under the last field once it wraps at 375px. In a `<details class="card">` styled as a flex column with a 16px gap, the summary also had a 12px margin (28px to the hint), while the filter grid touched the table (0px). Removed the summary margin and gave the table a 16px top margin: 16/16/16. Set `white-space: nowrap` on table headers: header 56px to 36px, no horizontal scroll at 1500px.
- Taught: in Chrome, the children of `<details>` after the summary sit in the `::details-content` slot, so the details element's own flex `gap` only spaces the summary from that slot, not the blocks inside it. Measure each gap between the children instead of trusting the card's gap value.
- Verdict: refinement (§4.C covers bottom-aligned rows; the `<details>` gap boundary was not written down).
- Action: logged; no rule text change.

### 2026-11-05 — Filter bar with the submit button stacked inside the last field

- Space Read: document search filter · balanced · STEP 8 · DENSITY 5 · RIGOR 8 · every control on one bottom edge, 16px between tracks, 40px controls.
- Did: the third field held both a checkbox and the submit button in its column, so in an `auto-fit` grid the row ended at 761px while the inputs ended at 635px (1024px viewport). Moved the button into its own track, set `align-items: end` on the form grid, gave the checkbox label `min-height: 40px` to match the inputs, and used `minmax(0, 2fr) minmax(176px, 1fr) max-content max-content` with two columns at ≤1100px and one at ≤640px. Measured at 1560: all four controls end at 590px with 16px gaps; at 1101 the select keeps 176px; at 1024 and 800 two rows share their bottoms; at 320 one column, no horizontal overflow; 1560 → 1024 → 1560 returns the same geometry.
- Taught: a first pass with `minmax(0, 1fr)` for the select squeezed it to 116px at 1024, too narrow for its longest option, while the `max-content` tracks kept their width. Give a select a floor sized to its longest option, and move the breakpoint up rather than letting it shrink. Parsing the markup also found a malformed closing tag that hid one option.
- Verdict: covered (§4.C bottom-aligned rows, §8.I round trip).
- Action: logged; no rule text change.


### 2026-11-05 — Generated contract: a template's hard page breaks left most of a page empty

- Space Read: Word contract filled from a template · airy · STEP 6pt · DENSITY 3 · RIGOR 6 · each article follows the previous one at the template's own article spacing, page count matches the count the contract states.
- Did: the template had `<w:br w:type="page"/>` at the start of the "Điều 4" heading and a second one in the empty paragraph after the signature block. Exported via Word to PDF and measured text bounds: before, 5 pages, page 3 ended 131.9/841.9pt (710pt blank) and page 5 was fully blank. The export step now removes hard page breaks from article headings and trailing empty paragraphs, and sets keep-with-next on every article heading; the template file stays untouched. After: 3 pages, matching the contract's "gồm 03 trang"; space above Điều 4 is 12.5pt against 12.7pt above Điều 3 and 11.1pt above Điều 5–6.
- Taught: §14.G covers using a real page break and not faking one with Enter, but not the reverse case: a hard break inherited from a template goes stale once filled-in data changes the length of earlier sections. In generated documents, replace hard breaks before headings with keep-with-next, and check the trailing empty paragraphs for a break that adds a blank last page. Measure in Word's own PDF export (text bottom per page) rather than reading the XML.
- Verdict: refinement (§14.G).
- Action: logged; no rule text change.

### 2026-11-05 — Line-item table: untyped inputs, a dark native datalist, and fixed columns that starved the free-text cell

- Space Read: slip line-item table inside a form · balanced · STEP 8 · DENSITY 6 · RIGOR 8 · every control in a row shares one 36px box, one radius, one font and one vertical centre.
- Did: row inputs built in JS had no `type`, so the `input[type=text]` rule skipped 14 of them across three tables (13.3px font, 0px radius, grey 118 border beside 8px-radius selects). Added `input:not([type])` to the selector. The datalist popup rendered dark because the page left `color-scheme` at `normal` and Chrome followed the OS theme; set `color-scheme: light` on `:root`. Gave number columns preferred widths (88/120/112px) so the free-text column takes the slack: at 1500px description 186 → 462px. At 1024px that starved description to 55px, so added a 160px floor and narrower widths below 1280px (description 160px, wrapper 771/771, six digits fit a 64px input). Delete button 41 → 36px and amount `line-height: 36px`: input, button and amount text centres all at 22.5px. Invoice rows: `vertical-align: middle`, all centres 22px. 375 → 1500 → 375 returned identical geometry; at 375 the table scrolls inside its wrapper, page width unchanged.
- Taught: a native picker (datalist, select popup, date picker) takes its theme from `color-scheme`, not from page CSS, so a light-only page must declare `color-scheme: light` or its popups follow the OS dark mode. In an auto-layout table, preferred widths on narrow columns hand all slack to the free column at wide viewports but starve it at narrow ones; pair them with a floor on the free column and measure at the narrowest common laptop width, not only the wide one.
- Verdict: refinement (§4.C rows, §8.I round trip; the `color-scheme` / native-popup link was not written down).
- Action: logged; no rule text change.

### 2026-11-06 — Printed form with dotted fill-in lines at two paper sizes

- Space Read: printed sales receipt · balanced · STEP 2mm · DENSITY 6 · RIGOR 9 · labels and values share one baseline, fill-in lines end on one right edge, one sheet in A5 and in A4.
- Did: built the sheet in mm for A5 (136mm content, 6mm page margin) and scaled it for A4 with `zoom: 1.414` and an 8.5mm margin. With `align-items: flex-end` the label sat about 2px below its value, because the value box carries min-height, padding and a dotted border; `align-items: baseline` put them on one line. "SỐ LƯỢNG" wrapped in a 16mm column at 2.8mm type; 18mm with `white-space: nowrap` fixed it. Chrome print-to-PDF measured: A5 148×210mm, 1 page; A4 210×297mm, 1 page; 24 item rows flow to 2 pages with the table header repeated.
- Taught: for a label beside a ruled fill-in value, align by baseline, not by box bottom, since the ruled box is taller than the text. Scaling one mm layout with `zoom` keeps every ratio across paper sizes; verify each size through print-to-PDF page size and page count, not the on-screen view.
- Verdict: refinement (§4.C shared baselines, §12 print).
- Action: logged; no rule text change.
### 2026-11-06 — Sparse matrix table that overflowed sideways, and action rows on a phone

- Space Read: price grid inside a card · packed · STEP 4/8 · DENSITY 8 · RIGOR 9 · numbers right-aligned per column, service names on one line, every value visible without a sideways scroll.
- Did: the grid had one column per paper size, 16 of them almost empty, so at a 697px card the table scrolled and hid its right half. Kept six columns that most services use (A0 to A5) and moved rare sizes into one "Khổ khác" column of `paper + price` buttons in a wrapping flex row (gap 4 / 12). Table width at the same card went from 1000+ to 645/645 with all 56 prices still present and editable. Cell inline padding 12 → 8, last column floor 200 → 140 closed the final 3px. On the recent-files table, a 528/301 scroller hid the date and download action at 375px; below 640px each row became a two-column grid (document spans both, date left, actions right), giving 301/301. A 48px select and button share one bottom edge with `align-items: flex-end`, and the row breaks by container query on the card, not the viewport, because the sidebar changes the available width. Fixed 52px format badge min-width so title text starts on one x across DOCX and XLSX rows (was 4px apart).
- Taught: when a matrix is sparse, the fix for sideways scroll is not smaller type; split dense columns from rare ones and let rare values carry their own label in a wrapping cell. Prove nothing was lost by counting priced cells before and after. Rows holding actions must not rely on an overflow scroller at phone width, since the action column is the part that disappears. A short varying-width badge before a text column needs a min-width, or the text column jitters between rows.
- Verdict: refinement (§8.B column demand, §9.D no-wrap labels, §4.C flex yield).
- Action: logged; no rule text change.

### 2026-11-06 — The same sparse price grid, back to one column per size, fitted instead of split

- Space Read: price grid inside a card · packed · STEP 4 · DENSITY 9 · RIGOR 9 · every paper size keeps its own column, all 20 columns visible without a sideways scroll at 1280px and wider.
- Did: the owner rejected the "Khổ khác" grouping from the entry above and wanted each size back in its own column. Restored 19 paper columns plus the service column, then fitted them: cell padding 8 → 4px (service column left edge 8px), grid text 15 → 13px, and 12px at 1360px and below; paper headers wrap only at spaces (each word in a `white-space: nowrap` span, so `A3->A4` no longer broke at the hyphen); headers right-aligned over their numbers; service names may wrap. Measured table vs wrapper: 1440px viewport 1064/1064, 1280px 916/916 (932/916 before the 12px step), 0 cells with `scrollWidth > clientWidth`. Below about 1250px the table still scrolls inside its own wrapper; the page does not.
- Taught: splitting rare columns out is a layout decision the reader may not accept when their habit is to scan by column position; ask before regrouping a matrix someone already reads every day. When every column must stay, budget the width: at a fixed column count the floor is the sum of the widest value per column plus padding, so padding (×2 per column) and one font step are the levers, and header text should wrap only at word boundaries so the header never sets the column's minimum width. A hyphen is a line-break opportunity, so codes like `A3->A4` need a no-wrap span.
- Verdict: refinement (§8.B column demand, §9.D no-wrap labels).
- Action: logged; no rule text change.

### 2026-11-06 — Custom video controls drawn inside a 4K player that is scaled down

- Space Read: video player overlay · balanced · STEP 8 (in 3840-wide player px) · DENSITY 4 · RIGOR 7 · control size is set in the frame that gets scaled, so the on-screen size is size × scale, not the CSS number.
- Did: the YouTube iframe is built at 3840×2160 so it streams 4K, then scaled 0.625 into a 2400px TV that is itself scaled again by the 3D scene; the native control bar ended at about 13 CSS px per button. Hid it (`controls: 0`) and drew our own bar inside the same scaled box: buttons 160, icons 96, seek track 16 (24 on hover) in an 80 hit band, knob 48, time 64px tabular, title 80/104, gaps 16/24, insets 64/40, menu rows 144. Measured at a 1024px viewport: buttons 42.7 CSS px (about 3.3× native). Seek uses `event.offsetX / clientWidth` on the track, which Chrome maps through the CSS transforms, so the click landed at 321 s of 634 s for a click at the middle.
- Taught: inside a box that is scaled for a quality or layout reason, size controls in the box own unit and verify the rendered `getBoundingClientRect` size, since the CSS number is multiplied by every ancestor scale. For seek or scrub positions under transforms, use `offsetX` on the captured target instead of `clientX - rect.left`, which breaks under 3D transforms. In fullscreen the UA stylesheet resets `transform` to none, so the overlay needs its own `zoom` to keep the same proportion.
- Verdict: refinement (§9 targets measured after transforms; §8.E overlay bands).
- Action: logged; no rule text change.

### 2026-11-06 — A resume row above a video grid, and a status pill that became a button

- Space Read: video browse grid + player control row · balanced · STEP 6 (inherited 18/24/36/60 from a 1.5× layout) · DENSITY 5 · RIGOR 8 · the new row must share the grid's columns, and a short pill must keep a full-height target in a row of 160px buttons.
- Did: added a "continue watching" row above the existing three-column grid by reusing the same grid class. Measured in 2400 design px: chips → heading 36, heading → grid 18 (2:1), row → main grid 60 (the grid's own row gap), first thumbnails share the left edge and width. A 54px dismiss button sits 12/12 inside the thumbnail corner, on the same inset as the duration badge. A 6px progress bar sits flush at the thumbnail's bottom edge, below the badge's 12px inset, so they never touch. In the 160px control row the live label became a real button; its 80px pill height stayed, and `::after { inset: -40px 0 }` extended the hit area to the row height without moving anything (`elementFromPoint` 4px above the pill still returned the button).
- Taught: when a label turns into a control inside a row of larger targets, extend the hit area with a pseudo-element instead of growing the pill, so the row's visual rhythm stays and the target matches its neighbours. Verify with `elementFromPoint` outside the painted box, not by reading the CSS.
- Verdict: covered (§6.B ladder, §6.C parent owns the gap, §9 targets).
- Action: logged; no rule text change.

### 2026-11-06 — Thumbnail action buttons and queue rows in a scaled player menu

- Space Read: video card + player menu · balanced · STEP 6 on cards, STEP 8 in 4K player px · DENSITY 5 · RIGOR 8 · a new corner action reuses the inset of the corner action beside it; a three-button row keeps the menu's row height.
- Did: the add-to-queue button sits top-left of the thumbnail at 12/12, size 54, the same inset and size as the dismiss button top-right (measured 12, 12, 54×54 in 2400 design px). Queue rows keep the menu's 144 min-height with three 112 buttons, gap 8; the long title takes `flex: 1 1 auto; min-width: 0` with ellipsis, so buttons never shrink (title scrollWidth 696 = clientWidth 696 in a 576 CSS px row).
- Taught: nothing new; the title yields and the buttons hold, per the flex-yield rule. Hidden-until-hover actions need a `hover: none` fallback so touch screens still see them.
- Verdict: covered (§4.C flex yield, §9 targets).
- Action: logged; no rule text change.
