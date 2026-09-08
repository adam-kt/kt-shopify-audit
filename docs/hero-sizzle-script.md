# Hero sizzle reel — shooting script

Ten seconds, silent, seamless loop, sits in the hero.

---

## The idea

**The pass.** A storefront sits there looking perfectly fine. Something moves
across it. Marks appear where the problems are. Next surface. Same again.

That is the entire product in one sentence, and it is the one thing worth
showing: not the report, not a laptop on a desk, but *the moment a page stops
looking fine*.

The reel ends on the frame it started on, so the loop is invisible.

---

## The rule that shapes everything below

**Runway renders the storefront. It never renders a word.**

Text-to-video mangles interface type, and any finding text baked into a frame
is unreadable at 2 MB, uneditable, and invisible to search and screen readers.

So the split is:

| Layer | Made in | Contains |
|---|---|---|
| Video | Runway, from your captures | The storefront, camera motion, the scan sweep |
| Marks | After Effects, or CSS over the video | Circles, brackets, rules. **Geometry only** |
| Words | HTML in the hero | Headline, finding text, CTA |

If you want the finding text on screen, it goes in the DOM on top of the video,
not inside it. That also means you can change a finding without re-rendering.

---

## Format

| | |
|---|---|
| Length | 10s, seamless loop |
| Aspect | 16:9 primary. Also export a 4:5 crop for mobile |
| Frame rate | 24fps. Cinematic, and smaller than 30 |
| Audio | None. Autoplay only works muted, so do not compose for sound |
| Grade | Desaturated, slightly cool. It sits under white type and must not compete |
| Target size | **Under 2 MB** MP4 + WebM. Over 4 MB, cut a beat |

---

## Captures you need first

Four real storefronts, de-branded. Wordmark, product names and any visible URL
blurred or greyed; layout, spacing and colour left completely intact, because
that is what makes it read as a real shop rather than a wireframe.

| Beat | Capture | 
|---|---|
| 1 | Homepage, hero and nav, 1440×900 viewport |
| 2 | Product page, gallery + price + buy button in frame |
| 3 | Cart, line items and totals in frame |
| 4 | Mobile, 375 wide, on a neutral ground |

Export 2560 wide so there is room to push in without softening.

---

## Beat 1 — Homepage · 0:00–0:02.5

*Input:* homepage capture

```
Extremely slow push in toward the centre of the frame. Almost imperceptible
parallax between foreground and background. Cool, even, unchanging light.
No camera shake, no flicker, no movement in the content itself.
Documentary stillness.
```

**Marks (post):** none yet. The first two seconds must look completely ordinary.
That is what makes beat 2 land.

---

## Beat 2 — The pass · 0:02.5–0:05

*Input:* product page capture

```
A single soft light sweep travels once across the surface from left to right,
like a scanner pass over a flat document. The image stays sharp and still
beneath it. Slight depth as the sweep travels. Nothing in the content changes.
```

**Marks (post):** as the sweep clears each area, one thin circle draws on, then
a second. Draw-on, never pop. 200ms each, ease-out, 300ms apart.

> This is the whole reel. If only one beat is good, make it this one.

---

## Beat 3 — Cart · 0:05–0:07.5

*Input:* cart capture

```
Very slow drift downward, as if reading. Shallow depth of field settling on
the middle of the frame. Gentle vignette closing at the edges.
No zoom, no rotation.
```

**Marks (post):** a bracket down the left of the totals block, and one circle on
the checkout button. The bracket says "this whole region", the circle says "this
exact control". Two different marks reads as a system.

---

## Beat 4 — Mobile, and the loop · 0:07.5–0:10

*Input:* mobile capture

```
Slow pull back from a phone-shaped frame until it sits centred and still.
Soft key light from the left, cool fill. Ends completely static, holding
the final frame for the last half second.
```

**Marks (post):** three small circles down the footer area, appearing fast, 120ms
apart. Then everything fades out over the last 400ms so the cut back to beat 1
is clean.

**Loop:** grade the final held frame to match beat 1's opening frame. Cross
dissolve 6 frames at the loop point if the cut reads hard.

---

## Marks: the visual language

Keep it to three shapes for the whole reel.

| Mark | Means | Spec |
|---|---|---|
| Thin circle | One specific element | 2px stroke, no fill, ~1.4× the element |
| Bracket | A whole region | 2px, corners only, not a full box |
| Hairline rule | An alignment or spacing issue | 1px, dashed |

Two colours only: one warning tone for problems, one positive for the thing
that is working. Match the site: `red-500` and `emerald-500`.

**Include one positive mark.** One green circle on something correct, in beat 3.
A reel that only ever finds faults reads as a sales pitch. One mark saying
"this is right, leave it alone" reads as an audit.

---

## Dropping it into the hero

```tsx
<video
  autoPlay muted loop playsInline
  poster="/hero-poster.jpg"
  preload="metadata"
  className="h-full w-full object-cover"
>
  <source src="/hero.webm" type="video/webm" />
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

Non-negotiables, because the rest of the site already honours all of them:

- **Poster frame** so first paint is instant and the LCP is not the video
- **`prefers-reduced-motion` renders the poster only.** Every animation on this
  site respects it
- The headline, sub and CTA stay in **HTML over the video**, never baked in.
  A visitor with video blocked still gets the whole offer
- Scrim between video and type. The video is graded to sit under white text but
  a gradient guarantees contrast at every frame

---

## Before it ships

- [ ] Under 2 MB, MP4 and WebM, poster present
- [ ] Loops with no visible seam
- [ ] Headline and CTA readable on **every** frame, checked at 375 and 1440
- [ ] Reduced motion shows the poster
- [ ] No storefront is identifiable
- [ ] No text rendered inside the video
- [ ] No number on screen that is not a measurement of the interface
- [ ] One positive mark present
