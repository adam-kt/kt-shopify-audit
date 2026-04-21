"use client";

import { useEffect, useRef } from "react";
import { useGsapIn } from "@/lib/gsap-hooks";
import styles from "./audit-deliverable-preview.module.css";

const findings = [
  {
    severity: "high" as const,
    area: "Mobile PDP",
    title: "Sticky add-to-cart is missing on product pages.",
    impact: "Customers must scroll to act — est. 6.1% drop-off on longer PDPs.",
    rank: "F.01",
  },
  {
    severity: "high" as const,
    area: "Cart",
    title: "Cart lacks confidence cues before checkout.",
    impact: "No shipping threshold, returns policy or trust seals at decision point.",
    rank: "F.02",
  },
  {
    severity: "high" as const,
    area: "Navigation",
    title: "Primary nav buries the best-seller collection two taps deep.",
    impact: "Revenue-weighted SKUs require a mega-menu hover most mobile users never trigger.",
    rank: "F.03",
  },
  {
    severity: "med" as const,
    area: "Product Page",
    title: "Variant selection is unclear — selected state has low contrast.",
    impact: "Users add the wrong size; returns run 14% above DTC category median.",
    rank: "F.04",
  },
  {
    severity: "ok" as const,
    area: "Checkout",
    title: "Shop Pay accelerated checkout is well-positioned.",
    impact: "Preserve as-is — accounts for 31% of mobile conversions.",
    rank: "F.05",
  },
];

const dotClass = { high: styles.dotHigh, med: styles.dotMed, ok: styles.dotOk };
const pinClass = { high: styles.cpinHigh, med: styles.cpinMed, ok: styles.cpinOk };
const sevLabel = { high: styles.sevHigh, med: styles.sevMed, ok: styles.sevOk };

export function AuditDeliverablePreview() {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance: the whole frame fades up as it enters view.
  // Runs once — no scrub, no reverse on scroll-out.
  useGsapIn(frameRef, {
    from: { opacity: 0, y: 80 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    scroll: true,
  });

  // The stage is drawn at a fixed 1920×1080 and scaled to fit the frame.
  // ResizeObserver keeps the scale in sync with the container width.
  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;
    const apply = () => {
      const scale = frame.clientWidth / 1920;
      stage.style.transform = `scale(${scale})`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
      <div ref={frameRef} className={styles.frame}>
        <div ref={stageRef} className={styles.stage}>
          <span className={`${styles.tick} ${styles.tickTl}`} />
          <span className={`${styles.tick} ${styles.tickTr}`} />
          <span className={`${styles.tick} ${styles.tickBr}`} />

          <div className={styles.pages}>
            {/* PAGE 1 — Cover */}
            <article className={`${styles.page} ${styles.p1}`}>
              <header className={styles.sheetHd}>
                <span>Knock Twice</span>
                <span>01 / 47</span>
              </header>
              <div className={styles.sheetBody}>
                <span className={styles.coverCat}>
                  Report № 042 &nbsp;·&nbsp; Series A
                </span>
                <h1 className={styles.p1Title}>
                  Shopify
                  <br />
                  conversion
                  <br />
                  <em>audit.</em>
                </h1>
                <div className={styles.rule} />
                <div className={styles.prep}>Prepared for</div>
                <div className={styles.brandName}>Marlow &amp; Grove</div>
              </div>
            </article>

            {/* PAGE 2 — Findings */}
            <article className={`${styles.page} ${styles.p2}`}>
              <header className={styles.sheetHd}>
                <span>Section 02 — Findings</span>
                <span>14 / 47</span>
              </header>
              <div className={styles.sheetBody}>
                <h2 className={styles.p2Title}>
                  Prioritized <em>findings.</em>
                </h2>
                <p className={styles.sub}>
                  A ranked register of every opportunity surfaced during the
                  review, grouped by surface and weighted by expected revenue
                  impact.
                </p>

<div className={styles.stats}>
                  <div>
                    <div className={styles.statK}>Findings</div>
                    <div className={styles.statV}>22</div>
                  </div>
                  <div>
                    <div className={styles.statK}>Critical</div>
                    <div className={styles.statV} style={{ color: "#e63d49" }}>
                      7
                    </div>
                  </div>
                  <div>
                    <div className={styles.statK}>Est. lift</div>
                    <div className={styles.statV}>
                      12<small>–18%</small>
                    </div>
                  </div>
                  <div>
                    <div className={styles.statK}>Payback</div>
                    <div className={styles.statV}>
                      6<small>wk</small>
                    </div>
                  </div>
                </div>

                <div className={styles.rows}>
                  {findings.map((f) => (
                    <div key={f.rank} className={styles.row}>
                      <div className={`${styles.dot} ${dotClass[f.severity]}`} />
                      <div className={styles.area}>{f.area}</div>
                      <div className={styles.finding}>
                        {f.title}
                        <span className={styles.impact}>{f.impact}</span>
                      </div>
                      <div className={styles.rank}>{f.rank}</div>
                    </div>
                  ))}
                </div>
              </div>
              <footer className={styles.sheetFt}>
                <span>§ 02 · findings register</span>
                <span>14</span>
              </footer>
            </article>

            {/* PAGE 3 — Annotations */}
            <article className={`${styles.page} ${styles.p3}`}>
              <header className={styles.sheetHd}>
                <span>Section 04 — Annotations</span>
                <span>28 / 47</span>
              </header>
              <div className={styles.sheetBody}>
                <h3 className={styles.p3Title}>
                  Homepage <em>annotations.</em>
                </h3>
                <div className={styles.p3Sub}>
                  marlowandgrove.com &nbsp;·&nbsp; captured 04/24/26
                </div>

                <div className={styles.mock}>
                  <div className={styles.mockHdr}>
                    <span className={styles.mockLogo}>Marlow &amp; Grove</span>
                    <div className={styles.mockNav}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className={styles.mockImg}>[ product shot ]</div>
                  <div className={styles.mockInfo}>
                    <div className={styles.mockTitle}>The Everyday Overshirt</div>
                    <div className={styles.mockPrice}>$148.00 USD</div>
                    <div className={`${styles.mockBar} ${styles.mockBarW2}`} />
                    <div className={`${styles.mockBar} ${styles.mockBarW3}`} />
                    <div className={styles.mockSwatches}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className={styles.mockCta}>
                    <div className={styles.mockBtn}>Add to cart</div>
                    <div className={`${styles.mockBtn} ${styles.mockBtnGhost}`}>♡</div>
                  </div>

                  <div className={styles.callouts}>
                    <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden>
                      <g
                        stroke="#85816f"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        fill="none"
                        opacity="0.75"
                      >
                        <path d="M 620,48  L 560,-20" />
                        <path d="M 240,228 L 60,200" />
                        <path d="M 650,370 L 90,460" />
                        <path d="M 680,540 L 940,620" />
                      </g>
                    </svg>

                    <div
                      className={`${styles.cpin} ${pinClass.high}`}
                      style={{ left: "62%", top: "8%" }}
                    >
                      1
                    </div>
                    <div
                      className={`${styles.cpin} ${pinClass.med}`}
                      style={{ left: "24%", top: "38%" }}
                    >
                      2
                    </div>
                    <div
                      className={`${styles.cpin} ${pinClass.high}`}
                      style={{ left: "65%", top: "62%" }}
                    >
                      3
                    </div>
                    <div
                      className={`${styles.cpin} ${pinClass.ok}`}
                      style={{ left: "68%", top: "90%" }}
                    >
                      4
                    </div>

                    <div className={styles.clabel} style={{ left: "52%", top: "-18px" }}>
                      <span className={styles.clabelN}>01</span>
                      <span className={sevLabel.high}>High</span>
                      &nbsp; Nav hides best-sellers
                    </div>
                    <div className={styles.clabel} style={{ left: "4px", top: "30%" }}>
                      <span className={styles.clabelN}>02</span>
                      <span className={sevLabel.med}>Med</span>
                      &nbsp; Gallery lacks zoom
                    </div>
                    <div className={styles.clabel} style={{ left: "2%", bottom: "70px" }}>
                      <span className={styles.clabelN}>03</span>
                      <span className={sevLabel.high}>High</span>
                      &nbsp; CTA low contrast
                    </div>
                    <div className={styles.clabel} style={{ right: "2%", bottom: "-18px" }}>
                      <span className={styles.clabelN}>04</span>
                      <span className={sevLabel.ok}>OK</span>
                      &nbsp; Shop Pay preserved
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
