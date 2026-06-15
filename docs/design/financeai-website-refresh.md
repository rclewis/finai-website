# FinanceAI — Website Design Refresh Handoff

**For:** Claude Code, working in the `finai-website` repo
**From:** `finai-ui` (the customer-facing web app), whose UI refresh is complete and merged
**Goal:** Refresh the FinanceAI marketing website so it shares a consistent look-and-feel with the web application.

---

## 0. How to use this document

This document ports the **design language** of the FinanceAI web app to the
marketing website. It is self-contained — everything you need is inline. You do
**not** need access to the app repo.

The app and the website are different surfaces of one product. The app is a
data-dense analytical tool; the website is a marketing site (plain HTML/CSS).
They should look like the same brand: same color, same type, same brand mark,
same feel. They are **not** identical — the website lives on the expressive,
narrative end of the system, and this document tells you where it is allowed to
diverge.

**What ports (the core of this doc):**
- The design-token layer (color, typography sizing, spacing, radius, motion) — §3
- Inter as the typeface, with its tuned OpenType features — §4
- Color usage rules — §5
- The brand wordmark / F-mark — §6
- A sanctioned "marketing layer" of extensions the site may use — §7

**What does NOT port (app-only, ignore):**
- Angular Material component theming
- AG Grid data-table theming
- The dense statement/grid row-height tiers
- The variance cell renderer and its polarity contract
- The app shell (sidebar nav, top bar, project switcher)

When in doubt: **tokens, never literals.** The single biggest lever for
consistency is adopting the token stylesheet in §3 verbatim and consuming it via
`var(--token)` everywhere. The app spent its entire refresh de-hardcoding colors
and sizes; don't reintroduce hardcoded hex or px on the website.

---

## 1. Positioning (carry this over)

> **FinanceAI feels like a modern fintech product on its shell and narrative
> surfaces — warm, confident, contemporary. Its analytical surfaces carry
> institutional-grade density but rendered with modern typography, restrained
> color, and selective emphasis. "Serious tool, built this decade."**

The marketing website is **entirely** a shell/narrative surface. It carries the
"modern fintech — warm, confident, contemporary" register. It does **not** carry
the dense-table density (that's the app's analytical surfaces). So the site
leans into the expressive end of the system: generous type, breathing room,
selective accent — but always inside the token vocabulary below.

**Reference triangle (anchors, not targets):** Pilot (friendly-but-professional
shell), Koyfin (data-density conventions — for the app, not the site), Causal
(modern bridge).

**Explicitly NOT aiming for — this matters even more on a marketing site:**
- Bloomberg-terminal literalism
- Consumer-fintech softness (Mercury / Monzo)
- "AI app" visual clichés: **purple gradients, sparkle icons, Space Grotesk.**

That last line is a hard constraint. The website is the most tempting place to
reach for AI-app clichés. Don't. The brand reads as a serious financial tool.

---

## 2. The non-negotiables (mirror the app's constraints)

1. **Tokens, never literals.** Every color and size is a `--*` token from §3. No
   hardcoded hex or px.
2. **Inter is locked.** See §4 for the rationale. Do not propose alternatives —
   this is a deliberate, evaluated decision, not a default. (Standard "marketing
   sites shouldn't use Inter" advice does not apply here; brand consistency with
   the app wins, and the app is numeric-heavy.)
3. **Semantic colors carry meaning.** Green = directionally good, red =
   directionally bad. Never use them decoratively (e.g. a green checkmark in a
   feature list is fine; a green section background "because it looks nice" is
   not).
4. **Verify both themes.** The token layer ships light + dark. If the site
   supports a theme toggle (or respects `prefers-color-scheme`), verify every
   surface in both. Don't ship a light-only or dark-broken page.

---

## 3. The token foundation (the portable core)

Drop this in as a global stylesheet, loaded before any page CSS. Light mode is
the default on `:root`; dark mode remaps under `[data-theme="dark"]`. Because
surfaces/text/borders are defined as `var()` references into the neutral ramp,
they re-resolve automatically in dark mode — you set `data-theme="dark"` on
`<html>` and everything follows.

> **Note on layout-size tokens:** the `--size-*` tokens at the end are
> app-shell structural dimensions (sidebar width, top-bar height, AG Grid row
> heights). They are **app-only** — keep them for fidelity if you like, but the
> website will rarely consume them. The color, type, spacing, radius, and motion
> tokens above them are the ones you want.

```css
/* =============================================================================
 * FinanceAI — Design Tokens
 * Single source of truth for color, typography, spacing, radius, and motion.
 *
 * NO component may hard-code a hex value, font size, or pixel spacing.
 * Consume these tokens via var(--token).
 *
 * Light mode is the default, declared on :root. Dark mode remaps the neutral
 * ramp and a handful of semantic/accent tokens under [data-theme="dark"];
 * surfaces/text/borders are var() references to the neutral ramp, so they
 * re-resolve automatically in dark mode.
 * ========================================================================== */

:root {
  /* ---- Neutrals — warm-leaning gray ramp ------------------------------ */
  --neutral-0:   #FFFFFF;
  --neutral-50:  #FAFAF9;  /* page bg */
  --neutral-100: #F4F4F2;  /* surface bg, subtle */
  --neutral-200: #E8E8E4;  /* borders, dividers */
  --neutral-300: #D4D4CE;  /* disabled, placeholder */
  --neutral-400: #A3A39C;  /* tertiary text */
  --neutral-500: #737370;  /* secondary text */
  --neutral-600: #52524F;  /* body text subtle */
  --neutral-700: #3A3A38;  /* body text */
  --neutral-800: #252523;  /* primary text */
  --neutral-900: #151514;  /* max contrast */

  /* ---- Accent — deep teal --------------------------------------------- */
  --accent-50:  #EDF7F5;
  --accent-100: #D1ECE6;
  --accent-200: #A3D9CD;
  --accent-300: #6AC0AE;
  --accent-400: #3DA38E;
  --accent-500: #1E8471;  /* primary accent — buttons, links, active state */
  --accent-600: #166558;  /* hover */
  --accent-700: #104A40;
  --accent-800: #0B3229;
  --accent-900: #061D18;

  /* ---- Semantic — positive (directionally good) ----------------------- */
  --positive-50:     #ECF6EE;
  --positive-100:    #CFE8D4;
  --positive-500:    #2E7D3A;  /* text, icon */
  --positive-600:    #236330;
  --positive-bg:     #ECF6EE;
  --positive-border: #CFE8D4;

  /* ---- Semantic — negative (directionally bad) ------------------------ */
  --negative-50:     #FBECEC;
  --negative-100:    #F4CECE;
  --negative-500:    #B23535;  /* text, icon */
  --negative-600:    #8C2828;  /* text on washes (chips/banners/errors) */
  --negative-700:    #6E1F1F;
  --negative-bg:     #FBECEC;
  --negative-border: #F4CECE;

  /* ---- Semantic — warning (caution, trial, pending) ------------------- */
  --warning-50:  #FBF3E1;
  --warning-100: #F5DFA8;
  --warning-500: #B88020;
  --warning-600: #8E611A;

  /* ---- Semantic — info (neutral flag) --------------------------------- */
  --info-50:  #EDF2FB;
  --info-100: #D0DCF3;
  --info-500: #2B5AB8;
  --info-600: #1F4491;

  /* Non-status accent — a distinct hue for type/category markers that must
     NOT carry gain/loss meaning. Use sparingly. */
  --violet-500: #6E56CF;

  /* ---- Surfaces ------------------------------------------------------- */
  --surface-page:        var(--neutral-50);
  --surface-card:        var(--neutral-0);
  --surface-card-sunken: var(--neutral-100);
  --surface-overlay:     var(--neutral-0);

  /* ---- Text ----------------------------------------------------------- */
  --text-primary:   var(--neutral-800);
  --text-secondary: var(--neutral-500);
  --text-tertiary:  var(--neutral-400);
  --text-disabled:  var(--neutral-300);
  --text-on-accent: var(--neutral-0);

  /* ---- Borders -------------------------------------------------------- */
  --border-subtle:  var(--neutral-200);
  --border-default: var(--neutral-300);
  --border-strong:  var(--neutral-400);
  --border-focus:   var(--accent-500);

  /* ---- Elevation — use sparingly; prefer borders + surfaces ----------- */
  --shadow-sm: 0 1px 2px rgba(21, 21, 20, 0.04);
  --shadow-md: 0 2px 8px rgba(21, 21, 20, 0.06), 0 1px 2px rgba(21, 21, 20, 0.04);
  --shadow-lg: 0 8px 24px rgba(21, 21, 20, 0.08), 0 2px 6px rgba(21, 21, 20, 0.04);

  /* ---- Font stacks ---------------------------------------------------- */
  --font-ui:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace;

  /* ---- Type scale — size / line-height / weight per tier -------------- */
  --text-xs:          11px;  --text-xs-lh:   16px;  --text-xs-weight:   500;  /* uppercase labels, metadata */
  --text-sm:          12px;  --text-sm-lh:   18px;  --text-sm-weight:   400;  /* captions, fine print */
  --text-base:        13px;  --text-base-lh: 20px;  --text-base-weight: 400;  /* persistent chrome (nav/footer) */
  --text-md:          14px;  --text-md-lh:   22px;  --text-md-weight:   400;  /* default UI, body */
  --text-lg:          16px;  --text-lg-lh:   24px;  --text-lg-weight:   400;  /* prose, marketing body copy */
  --text-xl:          20px;  --text-xl-lh:   28px;  --text-xl-weight:   500;  /* subsection headings */
  --text-2xl:         24px;  --text-2xl-lh:  32px;  --text-2xl-weight:  600;  /* card titles, section headers */
  --text-3xl:         32px;  --text-3xl-lh:  40px;  --text-3xl-weight:  600;  /* page titles, hero sub-display */
  --text-4xl:         40px;  --text-4xl-lh:  48px;  --text-4xl-weight:  600;  /* hero display, KPI values */

  /* ---- Letter-spacing ------------------------------------------------- */
  --tracking-caps:  0.06em;   /* uppercase labels (--text-xs in caps) */
  --tracking-title: -0.02em;  /* page/hero titles (--text-3xl+) */
  --tracking-tight: -0.01em;  /* tighter title option / wordmark */

  /* ---- Spacing scale (4px base) --------------------------------------- */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ---- Radius --------------------------------------------------------- */
  --radius-sm:   4px;    /* chips, badges, small buttons */
  --radius-md:   6px;    /* buttons, inputs */
  --radius-lg:   10px;   /* cards, dialogs */
  --radius-xl:   14px;   /* hero cards, marketing surfaces */
  --radius-full: 999px;

  /* ---- Motion --------------------------------------------------------- */
  --motion-fast:    120ms cubic-bezier(0.4, 0, 0.2, 1);
  --motion-default: 180ms cubic-bezier(0.4, 0, 0.2, 1);
  --motion-slow:    240ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ---- Layout sizing (APP-ONLY structural dimensions; rarely needed on
   *      the website — kept for parity) ---------------------------------- */
  --size-nav-expanded:    240px;
  --size-nav-collapsed:   64px;
  --size-nav-item:        36px;
  --size-topbar:          76px;
  --size-avatar:          32px;
  --size-icon:            16px;
  --size-icon-stroke:     1.5px;
}

/* =============================================================================
 * Dark mode
 * Remap the neutral ramp + a handful of accent/semantic tokens. Surfaces,
 * text, and borders inherit automatically through their var() references.
 * ========================================================================== */
[data-theme="dark"] {
  --neutral-0:   #0E0E0D;
  --neutral-50:  #141413;
  --neutral-100: #1C1C1B;
  --neutral-200: #2A2A28;
  --neutral-300: #3A3A38;
  --neutral-400: #5F5F5B;
  --neutral-500: #8A8A85;
  --neutral-600: #ADADA8;
  --neutral-700: #C9C9C4;
  --neutral-800: #E4E4E0;
  --neutral-900: #F5F5F2;

  /* Selection/hover tint — composites predictably over any dark surface. */
  --accent-50:  #13261F;
  --accent-500: #3DA38E;  /* brighter for dark-bg contrast */
  --accent-600: #6AC0AE;

  /* Semantic light-tint sub-ramps. The -50/-100/-600 trio is used as a UNIT
     on the same component (wash / hairline / text) — remap them together. */
  --positive-50:     #15271B;
  --positive-100:    #24412C;
  --positive-500:    #6FBF7A;
  --positive-600:    #84CE8F;
  --positive-bg:     rgba(46, 125, 58, 0.15);
  --positive-border: rgba(111, 191, 122, 0.25);

  --negative-50:     #2A1717;
  --negative-100:    #432222;
  --negative-500:    #E07070;
  --negative-600:    #ED9292;
  --negative-700:    #C44A4A;
  --negative-bg:     rgba(178, 53, 53, 0.15);
  --negative-border: rgba(224, 112, 112, 0.25);

  --warning-50:  #261D10;
  --warning-100: #3D2F16;
  --warning-500: #D4A354;
  --warning-600: #E3B968;

  --info-50:  #161F2E;
  --info-100: #243450;
  --info-500: #5A85D9;
  --info-600: #8FACE8;

  --violet-500: #9B8AFB;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3);
}
```

---

## 4. Typography

**Inter is locked.** The app uses Inter for a deliberate reason: it is a
data-dense financial tool, and Inter's tuned `tabular-nums`, `slashed-zero`, and
`cv11` stylistic alternate are correct for numeric content. The website inherits
Inter for **brand consistency** — the product wordmark and all copy should match
the app. Do not substitute a "marketing display face." (Standard frontend advice
to avoid Inter on marketing sites is explicitly overridden here.)

**Load Inter** (e.g. from Google Fonts or self-hosted; weights 400/500/600 cover
the scale) and set the global feature string on `body`:

```css
body {
  font-family: var(--font-ui);
  color: var(--text-primary);
  font-size: var(--text-md);
  line-height: var(--text-md-lh);
  /* Inter OpenType: tabular figures, single-story a (ss01), cv11 alternate. */
  font-feature-settings: 'tnum' 1, 'ss01' 1, 'cv11' 1;
}
```

**Type roles** (use the token, not a literal size):

| Role | Token | Notes |
|------|-------|-------|
| Hero display / big KPI | `--text-4xl` (40px·600) | The site leans on this where the app rarely does — see §7. |
| Page title / hero sub-display | `--text-3xl` (32px·600) | Use `--tracking-title` (-0.02em). |
| Section header / card title | `--text-2xl` (24px·600) | |
| Subsection heading | `--text-xl` (20px·500) | |
| Marketing body / prose | `--text-lg` (16px·400) | Comfortable reading size for long-form copy. |
| Default UI / body | `--text-md` (14px·400) | Body base. |
| Persistent chrome (footer, fine nav) | `--text-base` (13px·400) | One step down from body. |
| Caption / fine print | `--text-sm` (12px·400) | |
| Uppercase eyebrow / label | `--text-xs` (11px·500) | Pair with `--tracking-caps` (0.06em) and `text-transform: uppercase`. |

Each tier ships a matching `*-lh` (line-height) and `*-weight` token — use them
together.

---

## 5. Color usage

- **Neutrals are the substrate.** Pages sit on `--surface-page`; cards on
  `--surface-card` with a `--border-subtle` hairline. Reach for borders + surface
  steps before reaching for shadow. Text uses the `--text-*` semantic tokens, not
  raw neutral steps.
- **Teal accent, used with restraint.** `--accent-500` is the primary action /
  link / active color; `--accent-600` is its hover. The accent is for the few
  things that matter (primary CTA, links) — not large fills. A page that's mostly
  warm-neutral with selective teal reads as the brand; a teal-saturated page does
  not.
- **Semantic colors mean direction.** `--positive-*` = good, `--negative-*` =
  bad, `--warning-*` = caution, `--info-*` = neutral flag. Each has a 3-part wash
  set (`-50` background / `-100` border / `-600` text) for chips and banners. Do
  not use semantic hues decoratively or for generic emphasis — that's the
  accent's job.
- **`--violet-500` is the non-status hue.** It exists for category/type markers
  that must *not* read as gain/loss. You'll rarely need it on the site; never use
  it as a second brand accent or a gradient stop.
- **No gradients-as-brand.** Especially no purple gradients (see §1). Flat,
  confident color.

---

## 6. Brand (wordmark + F-mark)

The app currently ships an **interim text wordmark** (the final logo is deferred
pending an identity engagement). Match it exactly so the site and app agree:

**Wordmark:**
- `FinanceAI` in Inter weight **600**
- Color `--neutral-800` (light) / `--neutral-100` (dark) — **not** the accent color
- Letter-spacing `-0.01em` (`--tracking-tight`)
- No mark, no icon, no placeholder graphic

**F-mark** (favicon, compact header, social avatar contexts):
- A single uppercase `F` in the same treatment
- Inside a **6px** rounded square (`--radius-md`) of `--neutral-800`, white
  letter — inverse for dark mode

Do not reintroduce the old multicolor gradient orb logo if it appears anywhere on
the current site — it reads "consumer-AI 2021" and pulls against the positioning.

---

## 7. The marketing layer (sanctioned extensions)

The website may go beyond the app in these specific, bounded ways — all still
expressed through tokens:

- **Hero scale.** Use `--text-4xl` (and `--text-3xl` for sub-display) for hero
  headlines and big stat/KPI call-outs. The app reserves `--text-4xl` for KPI
  values; the marketing site is the natural home for display type.
- **`--radius-xl` marketing surfaces.** The `14px` radius exists specifically for
  "hero cards, marketing surfaces." Use it for feature cards, pricing cards, and
  hero containers. Keep `--radius-lg` (10px) for smaller standard cards.
- **Restrained accent washes for section backgrounds.** `--accent-50` /
  `--accent-100` (and the neutral `--surface-card-sunken`) can tint alternating
  sections or highlight blocks. Keep it subtle — a faint wash, not a saturated
  band.
- **Elevation for floating marketing cards.** The `--shadow-sm/md/lg` tokens are
  available; prefer the lighter end. Borders still do most of the separation
  work.
- **Motion.** Use `--motion-default` / `--motion-slow` for hover and scroll-in
  transitions. Keep it calm and quick; no bouncy or attention-grabbing easing.

**The boundary:** every one of these is a *token*. If you find yourself writing a
literal hex, px, or shadow that isn't in §3, stop — either there's a token for it,
or the effect is outside the design language.

---

## 8. Recommended refresh sequence

1. **Audit the current site against the tokens.** Inventory the existing
   colors, fonts, sizes, radii, and shadows. Map each to its nearest token in §3;
   flag anything with no token home (those are the places the current site
   diverges from the brand — candidates to bring in line, not to tokenize as-is).
2. **Drop in the foundation.** Add the §3 token stylesheet as a global, loaded
   first. Load Inter (400/500/600) and apply the `body` setup from §4.
3. **Adopt type roles.** Replace literal font sizes/weights with the `--text-*`
   roles from §4. Headings → the 2xl/3xl/4xl tiers; body → `--text-lg`/`--text-md`.
4. **Re-color against tokens.** Swap literal colors for neutral/accent/semantic
   tokens per §5. Backgrounds → surfaces; text → `--text-*`; CTAs/links →
   `--accent-500`.
5. **Restyle components.** Buttons, cards, chips, nav, footer — radius from §3,
   borders from `--border-*`, hover via `--accent-600` and the motion tokens.
   Apply the §7 marketing layer to hero/feature/pricing surfaces.
6. **Swap the brand mark.** Replace the current logo with the §6 wordmark /
   F-mark.
7. **Verify both themes.** If the site has (or should have) a dark mode, set
   `data-theme="dark"` on `<html>` and check every page. Confirm semantic washes,
   accent contrast, and the wordmark all read correctly in dark.

**Guardrails checklist (mirror the app's):**
- [ ] No hardcoded hex or px — every color/size is a `var(--token)`.
- [ ] Inter is the only typeface; OpenType feature string applied on `body`.
- [ ] Teal accent used selectively (CTAs/links), not as large fills.
- [ ] Semantic colors only where they carry directional meaning.
- [ ] No purple/AI-cliché gradients, sparkle icons, or Space Grotesk.
- [ ] Brand mark matches the app's interim wordmark / F-mark exactly.
- [ ] Verified in light **and** dark.

---

*Questions about intent (rather than mechanics) trace back to the app's
authoritative spec, `docs/design/financeai-ui-refresh-spec.md` in `finai-ui` —
but this handoff is self-sufficient for the website refresh.*
