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
