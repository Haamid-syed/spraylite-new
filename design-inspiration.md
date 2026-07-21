# Design Inspiration Spec — sourced from buckssauce.com (REAL page source, verified)
### For: Spray Lite frontend build

Everything below marked **[CONFIRMED]** was pulled directly from the actual rendered HTML
(Next.js output, inline styles, class names, data-attributes). Nothing here is guessed.

---

## 1. Tech Stack [CONFIRMED]

- **Framework**: Next.js (App Router — `data-nimg`, `_next/static` paths, image srcSets)
- **CMS**: Prismic (all images served from `images.prismic.io/buckssauce/...`)
- **Styling**: Tailwind CSS v4-style (arbitrary value syntax like `text-[86px]`, `w-col-5`, CSS var-based color tokens)
- **Smooth scroll**: **Lenis** — confirmed via `data-lenis-prevent="true"` attributes on scroll-locked elements (nav/menu overlays)
- **Scroll animations**: **GSAP** — confirmed via `data-gsap-text-on-scroll`, `data-gsap-title-on-scroll`, `data-gsap-title` attributes scattered through headings/copy
- **Images**: Next/Image with blur-up placeholders (`w=24&q=30&blur=50` low-res preview swapped for full-res)

This is a fully custom-coded site (not Webflow/Shopify theme) — hand-rolled component system.

---

## 2. Color Tokens [CONFIRMED — exact hex]

```
--color-foreground : #100B06   (near-black, warm/charcoal, not pure black)
--color-background  : #F5E4C7   (warm cream/parchment)
--color-gold        : #BE8D3F   (used for one flavor card background — "bg-gold")
--color-red/orange   : #DA1F27  (accent — used sparingly, likely CTA/alert)
```

The whole site runs on a **2-color semantic system** — `foreground` and `background` —
used as Tailwind tokens (`bg-foreground`, `text-background`, `border-foreground/30` etc.),
NOT literal black/white. This is the single most important structural insight: it's built
so the entire palette can invert (dark-mode style swap) by just flipping which token means
"ink" vs "paper." Card backgrounds (gold, orange, red) are one-off accent overrides on top
of that base 2-token system, used per-product/section for variety.

**For Spraylite**: build the same way — pick ONE ink token + ONE paper token as your base
(e.g. `--color-ink: near-black-olive`, `--color-paper: warm off-white`), then layer 2–3
accent tokens per product family (olive-gold for Olive Oil, warm-butter-yellow for Butter,
sesame-brown for Oriental) as one-off card backgrounds, not global theme colors.

---

## 3. Typography [CONFIRMED]

- Custom variable fonts loaded via `next/font`: **"Inter Tight"** (body/UI) and a custom
  display font called **"Peperoncino Sans"** (loaded as `.woff`/`.woff2`, self-hosted —
  this is their bespoke headline font, not a Google Font)
- Class usage: `font-serif` is repurposed (Tailwind override) to actually mean their
  **display/headline font**, not an actual serif — confirms a fully custom Tailwind theme config
- Massive responsive type scale on hero: `text-[50px]` (mobile) → `sm:text-[86px]` →
  `lg:text-[120px]` — headline text scales aggressively across breakpoints, not just +/- a few px
- `leading-[0.85]` and `leading-none` used repeatedly on headlines — very tight line-height,
  a deliberate "condensed/stacked" look for big display type
- `uppercase` is applied almost everywhere text-related (nav, buttons, headings) — full-caps
  is a core brand voice choice, not incidental

**For Spraylite**: license or find a confident, slightly rugged display font (a heavy grotesk
or slab) and pair it with a clean, neutral body font like Inter or Inter Tight. Set your
hero headline with the same aggressive breakpoint jump and tight `line-height: 0.85–0.9`.

---

## 4. Confirmed Animation Details (real values, not guesses)

### Product pack swap animation (3-pack ↔ 6-pack toggle) [CONFIRMED]
Two states of the same image element, cross-fading via `transform` + `opacity`:

- **Entering pack** (becoming visible):
  `transform: translate3d(0,0,0)`, `opacity: 1`
  `transition-duration: 520ms`, `transition-delay: 180ms`
  `cubic-bezier(0.16, 1, 0.3, 1)` — this is the well-known **"ease-out-expo-ish" curve**
  (fast start, long gentle settle — very "premium UI" feeling, used everywhere in modern
  Awwwards-style sites for its snappy-but-soft landing)

- **Exiting pack** (becoming hidden):
  `transform: translate3d(0,72px,0)`, `opacity: 0`
  `transition-duration: 240ms`, `transition-delay: 0ms`
  `cubic-bezier(0.55, 0, 1, 0.45)` — this is an **"ease-in" curve** (slow start, hard
  accelerate out) — makes the outgoing element feel like it's dropping away/sinking,
  while the incoming one feels like it's floating up into place

This asymmetric in/out timing (slower luxurious entrance, quicker snappy exit) is a
genuinely reusable, high-quality micro-interaction pattern — steal this exact curve pair.

### General motion conventions [CONFIRMED via class usage]
- `will-change-transform` used on **59 separate elements** — everything that animates gets
  GPU-layer-promoted ahead of time, standard perf practice for buttery scroll-linked motion
- `translate-z-0` + `backface-hidden` used together (60 elements) — forces hardware
  acceleration and prevents flicker on 3D-transformed elements — classic combo for
  smooth `transform`-based animation at scale
- `transition-colors duration-300` on nav links (hover states) — simple 300ms color fades,
  nothing fancy for basic hover, fancy stuff reserved for hero/scroll moments
- `animate-[bucks-loading-dot_0.8s_ease-in-out_infinite]` — a custom keyframe (not in
  Tailwind by default) for the "Adding..." button loading-dot animation, 0.8s ease-in-out loop

### Nav link hover effect [CONFIRMED — real component structure]
Each nav link (`Shop`, `Wholesale`, `About`, etc.) is actually **two stacked copies of the
same text**, one solid + one outlined (`-webkit-text-stroke`), inside an `overflow-hidden`
wrapper sized to one line of text (`h-[0.85em]`). On hover, presumably a vertical translate
swaps which copy is visible — this is the classic **"text flip/reveal on hover"** effect
(first line slides up out of view, second line slides in from below), done with pure
CSS+JS transform rather than a GIF or video. Confirmed structural pattern, direction/trigger
inferred from the two-copy-in-a-mask setup (extremely standard implementation of this effect).

### Button component [CONFIRMED — same two-copy trick applied to buttons]
The Instagram/Facebook footer buttons use the identical `data-text-first` / `data-text-second`
+ `data-right-icon-first` / `data-right-icon-second` doubling pattern — text AND icon both
have a hidden "second state" copy sitting at `opacity-0`, ready to swap in on hover/interaction.
This is a **reusable button micro-component**: label + icon, each with a primary/secondary
state, likely animated via GSAP timeline on hover (translate + opacity swap, matching the
nav link pattern).

---

## 5. Layout System [CONFIRMED]

- Custom grid units beyond standard Tailwind: `w-col-5`, `w-col-6`, `w-col-12` — a bespoke
  12-column-ish layout scale layered on top of Tailwind, used for precise multi-column
  sections (e.g. the "Why Bucks Sauce" numbered reason cards)
- `p-container` utility — a custom global horizontal-padding class applied per-section,
  keeping consistent page margins without repeating raw padding values everywhere
- Sections given generous vertical rhythm: `mt-38`, `mt-26`, `mt-12` type spacing — chunky
  gaps between major sections, nothing cramped
- `rounded-xl` is the single most-used border-radius (71 occurrences) — one consistent
  radius token for cards, buttons, image containers, everything. No mixing of radius sizes.

---

## 6. Confirmed Section Structure (from real DOM order + component names)

1. **Nav** — `data-lenis-prevent` fixed nav, hover text-flip links, cart button with `cart(0)` counter
2. **Hero** — big serif-styled headline (`The BBQ sauce that makes other sauces insecure`), staggered reveal via `data-gsap-title`
3. **Value pillar strip** — 4 short cards (No HFCS / No seed oils / etc.)
4. **"Choose your weapon"** flavor grid — `data-listing-card`, each with:
   - colored background (`bg-gold` etc.)
   - dashed inset border overlay (`border-dashed inset-2.5` — decorative inner frame)
   - rotated product bottle image (`rotate-3`) for a slight "not perfectly aligned, feels handmade" tilt
   - tagline positioned absolutely at the bottom of the text block
5. **"Why Bucks Sauce"** — numbered reason cards (`data-reason="0"/"1"/"2"`), each a big
   digit badge (`data-reason-digit`) + pill-shaped title bar (`bg-foreground`, rounded, two
   small circle dots flanking the title — decorative "capsule" header) + body copy
6. **Bundles/packs** — `data-bundles-box`, `data-pack-image="3"` / `"6"` — the animated
   pack-swap toggle described above, `touch-pan-y` (swipeable on mobile)
7. **Reviews marquee**
8. **Footer** — email capture + social buttons using the two-copy hover-swap button component

---

## 7. What To Actually Reuse vs Reinterpret for Spraylite

**Reuse directly (technique, not content):**
- 2-token semantic color system (ink/paper) + one-off accent bg per product card
- `cubic-bezier(0.16, 1, 0.3, 1)` for anything entering/appearing (cards, images, modals)
- `cubic-bezier(0.55, 0, 1, 0.45)` for anything exiting/dismissing
- Two-copy text/icon hover-swap component for nav links and buttons
- Single consistent border-radius token used everywhere (pick one, e.g. 12–16px equiv, stop mixing)
- Numbered "reason" card pattern → perfect fit for Spraylite's 4 core pillars
  (Health / Economy / Technology / Versatility) or a "3 steps" (Spray → Cook → Save Calories) block
- Dashed inner-border overlay on product cards — cheap but effective "crafted/stamped" detail
- Slight `rotate-3` tilt on product shots inside cards — keeps a grid from feeling too rigid/corporate

**Reinterpret (don't copy content/voice):**
- Their palette (cream/near-black/gold/red) is BBQ-coded warmth — build Spraylite's own
  2-token base around a "clean kitchen" feel (e.g. warm off-white paper + deep olive/near-black ink),
  with accent tokens per oil variant (olive-gold, avocado-green, butter-yellow, sesame-brown)
- Their snarky copy voice → Spraylite's voice should be confident-and-credible (backed by
  actual %s and gram figures), wit only in microcopy/button states, not in the core health claims
- Swap "antler" and BBQ iconography for spray-nozzle / droplet / flame / leaf icon system

---

## 8. Practical build note
Lenis + GSAP is very achievable in a Next.js/React or plain Vite build — both have free,
well-documented APIs (`gsap.timeline()`, `ScrollTrigger`, Lenis's `lenis.on('scroll')`). If
you're building in vanilla HTML/CSS/JS for this assignment, both work fine via CDN import
too — no build step required for a basic implementation of these effects.