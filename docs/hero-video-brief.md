# Hero sizzle + bento card assets — production brief

Working brief for generating motion in Runway and filling the four bento
placeholders in `src/components/site/features.tsx`.

---

## 0. The one rule

**Drive everything from real captures. Never text-to-video a storefront.**

Text-to-video will invent a Shopify store with garbled UI text. That fails twice
over: legible interface text is the weakest thing these models do, and a
fabricated storefront on this page contradicts the claim sitting three sections
below it ("every claim checked against your live store data"). It is the same
failure as the placeholder logos and the Unsplash avatars, in a new medium.

Image-to-video on your own screenshots is Runway at its strongest and keeps the
content honest.

**Source material you already have:**

| Asset | Size | Good for |
|---|---|---|
| `review/homepage-trust.png` | 2080×1440 | Shot 1, shot 2 |
| `review/product-evidence.png` | 2080×1440 | Shot 2 alt |
| `review/cart-funnel.png` | 2080×1440 | Shot 3 |
| `review/mobile-thumb.png` | 2080×1440 | Mobile cut |
| `annotated-pdp.png` | 1440×6178 | Card 3, long scroll |
| `macbook-1..9`, `iphone-1..7` | 2250×1688 | Device framing, before/after |

---

## 1. Hero sizzle — 12 seconds, silent, looping

### Placement decision first

The hero already holds an interactive browser window with four tabs. **Do not
replace it with video** — you would trade a working, real, clickable artifact
for a loop, and lose the tab interaction that carries the "what we review"
content.

Two options that do work:

- **A.** Video plays *inside* the browser window frame as a fifth state, or
  behind the tabs on first load, then settles into the static screenshot.
- **B.** Video sits in the deliverable section (`#deliverable`) above the
  findings register, showing the document being produced.

**Recommendation: B.** The hero's job is comprehension in three seconds, and
video delays that. The deliverable section is where someone is already
leaning in.

### Shot list

Four shots, roughly 3s each. Runway clips are short by design, so generate each
separately and cut them together.

---

**Shot 1 — the ordinary store (0:00–0:03)**

*Input image:* `review/homepage-trust.png`

```
Slow, steady push in toward the centre of the screen. Almost imperceptible
parallax between foreground and background layers. Cool even lighting, no
flicker, no camera shake. Static composition, documentary stillness.
```

Intent: this is somebody's store on an ordinary day. Calm, not broken.

---

**Shot 2 — the review (0:03–0:06)**

*Input image:* `review/homepage-trust.png` or `product-evidence.png`

```
A soft horizontal light sweep passes once across the surface from left to
right, like a scanner pass. The image stays sharp and still beneath it.
Subtle depth as the sweep travels. No text changes, no UI movement.
```

Intent: something is being examined. The sweep is the only motion.

> Runway will try to alter UI text if you give it any excuse. Keep prompts about
> **light and camera**, never about interface elements changing.

---

**Shot 3 — the findings (0:06–0:09)**

*Input image:* `review/cart-funnel.png`

```
Very slow drift downward, as if reading. Shallow depth of field settling on
the middle of the frame. Gentle vignette closing in at the edges. No zoom,
no rotation.
```

Intent: attention narrowing onto specific things.

---

**Shot 4 — the document (0:09–0:12)**

*Input image:* `macbook-3.png` or `macbook-4.png`

```
Slow orbit of a few degrees around a laptop on a desk, shallow focus, warm
key light from the left. The screen content stays fixed and readable.
Cinematic, unhurried, ends on a static frame.
```

Intent: this arrives as a real thing you open.

> Ending on a static frame makes the loop point invisible.

### What Runway will not do

Do not attempt these in Runway. They need code or motion graphics:

- Annotation pins appearing in sequence
- A findings list assembling itself
- Any legible number counting up
- Anything where text must stay crisp and correct

The findings register in `src/components/site/deliverable.tsx` already animates
in with `motion`. If you want "the list assembling", that component does it
correctly and truthfully today.

### Web delivery specs

The page currently ships **zero remote images** and 192 kB First Load JS. Do not
undo that with a 20 MB hero video.

| | |
|---|---|
| Format | MP4 (H.264) **and** WebM (VP9), `<video>` with both sources |
| Resolution | 1920×1080 max, downscale to 1280×720 if budget is tight |
| Target size | **Under 2 MB.** Over 4 MB, cut a shot |
| Attributes | `muted playsInline loop autoPlay preload="metadata"` |
| Poster | A still frame, so the first paint is instant |
| Reduced motion | Render the poster instead. Every other animation on this site respects `prefers-reduced-motion`; this must too |

Autoplay only works muted. Do not add audio expecting it to play.

---

## 2. Bento card assets

The four placeholders in `features.tsx`. **Two of them need no generation at
all** — you already have the asset or the code.

### Card 1 — "Surface coverage map"

*Every page, not just the obvious ones*

**Not Runway.** This is a diagram: homepage, collections, PDP, cart, checkout,
navigation, on desktop and phone. A generated video cannot label anything
legibly.

Build as inline SVG, or animate small labelled nodes with `motion`. It should
match the four tab labels in the hero so the two agree on scope.

### Card 2 — "Ranked findings list"

*Ranked by what's worth doing*

**Not Runway, and already built.** `src/components/site/deliverable.tsx` renders
exactly this. Extract a compact three-row version as a shared component and use
it in both places, so the card and the section cannot drift apart.

### Card 3 — "Annotated screenshot"

*A screenshot for every finding*

**No generation needed. You have `annotated-pdp.png`** (1440×6178). It is a real
annotated page, which is more convincing than anything generated.

It is very tall, so crop to the most legible annotated region rather than
scaling the whole thing down. This is the tall card in the bento, which suits it.

Optional Runway pass — a slow vertical scroll down the annotations, from the
image:

```
Slow steady vertical scroll downward at constant speed. No zoom, no
rotation, no change to the content. Even lighting throughout.
```

### Card 4 — "Rescan timeline / before-and-after"

*We check back after you ship*

**Real capture beats generation.** A genuine before-and-after from a client who
shipped fixes is the strongest asset on the whole page. Two of the macbook
mockups side by side, or a wipe between them.

If no real pair exists yet, build a timeline diagram in code (day 0 → day 30)
rather than generating a fake comparison. A fabricated before-and-after is the
worst possible thing to put on this particular page.

---

## 3. Order of work

1. **Card 3 first.** You already have the asset. Crop and ship it.
2. **Card 2 second.** Extract from the register component. No new asset.
3. **Shots 1 and 2** in Runway. Cheapest to test whether the look is right.
4. **Card 1 and card 4** as designed graphics.
5. **Shots 3 and 4** only if the first two land.

Two of the four cards can be finished today without opening Runway.

---

## 4. Before anything ships

- [ ] Video under 2 MB, poster frame present
- [ ] `prefers-reduced-motion` renders the poster, not the loop
- [ ] No fabricated storefront, no invented numbers, no fake before-and-after
- [ ] Card art matches the copy on the card
- [ ] Hero browser window still interactive, not replaced
- [ ] Page still under the 8-viewport budget (currently 7.1)

---

## 5. Base screenshots for the review slides

The four images behind the annotation pins in the hero. They should be
**storefront pages**, not pages of the audit document. Cards showing findings on
top of a document that already lists findings reads as findings-on-findings, and
the current stand-ins still carry "Marlow & Grove", the fictional brand.

### What to capture

| | |
|---|---|
| Target | A real Shopify storefront, de-branded (see below) |
| Viewport | 1440 x 900, desktop, then scroll to the region the finding is about |
| Export | 2080 x 1440 to match the current assets, PNG |
| State | Cookie banners dismissed, nothing hovered, no modal open |
| Mobile slide | Capture at 375 wide, then place on a neutral ground so it fills a landscape frame |

Four files, one per tab:

| Tab | Show | Findings pinned there |
|---|---|---|
| Homepage | Hero and primary nav | F.06 empty heading, F.07 missing alt text |
| Product pages | Gallery, price, add-to-cart area | F.04 no sticky ATC, F.05 no shipping or returns copy |
| Cart & checkout | Line items, subtotal, checkout buttons | F.01 silent ATC failure, F.02 no delivery estimate, F.03 accelerated checkout |
| Mobile | Footer and primary nav at 375 | F.08 footer touch targets, F.09 16px nav |

### De-branding

Enough that nobody can identify the store, no more:

- Blur or grey the wordmark and any logo
- Replace product names with neutral text, or blur them
- Remove any URL visible in a browser chrome capture
- Leave layout, spacing and colour intact, since that is what makes it read as a
  real storefront rather than a wireframe

### After the swap

Pin coordinates in `src/content/findings.ts` are percentages tuned to the
current stand-ins. They will point at the wrong places on new screenshots and
need retuning, which is quick once the images exist: each finding has a
`pin: { x, y }` and the pins are visible as you adjust.

Swapping is four import lines in `src/components/site/hero.tsx`.
