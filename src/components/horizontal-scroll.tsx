"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import macbook2 from "@/images/macbook-2.png";
import macbook3 from "@/images/macbook-3.png";
import macbook4 from "@/images/macbook-4.png";
import macbook5 from "@/images/macbook-5.png";
import macbook6 from "@/images/macbook-6.png";
import macbook8 from "@/images/macbook-8.png";
import macbook9 from "@/images/macbook-9.png";
import iphone2 from "@/images/iphone-2.png";

/**
 * Effect 038 — Horizontal scroll with thin columns and rotated labels.
 * Desktop: pinned horizontal scroll. Mobile: stacked vertical list.
 */

const projects: {
  label: string;
  year: string;
  image: StaticImageData;
}[] = [
  { label: "Homepage", year: "Analysis", image: macbook2 },
  { label: "Navigation", year: "Structure", image: macbook3 },
  { label: "Collections", year: "Discovery", image: macbook4 },
  { label: "Product Pages", year: "Conversion", image: macbook5 },
  { label: "Cart Flow", year: "Checkout", image: macbook6 },
  { label: "Mobile UX", year: "Responsive", image: iphone2 },
  { label: "Trust Signals", year: "Confidence", image: macbook8 },
  { label: "Conversion Cues", year: "Action", image: macbook9 },
];

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: ReturnType<typeof import("gsap").gsap.matchMedia> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !containerRef.current) return;

      mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const projectEls =
          containerRef.current!.querySelectorAll<HTMLElement>(".hs-project");
        if (!projectEls.length) return;

        projectEls[0].classList.add("on");
        const numProjects = projectEls.length;
        let currentProject: Element = projectEls[0];

        const container = containerRef.current!;
        const dist = container.scrollWidth - document.body.clientWidth;

        gsap.to(container, {
          x: -dist,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current!.querySelector(".hs-pin-height"),
            pin: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const closestIndex = Math.round(
                self.progress * (numProjects - 1)
              );
              const closestProject = projectEls[closestIndex];

              if (closestProject && closestProject !== currentProject) {
                currentProject.classList.remove("on");
                closestProject.classList.add("on");
                currentProject = closestProject;
              }
            },
          },
        });
      });
    })();

    return () => {
      mm?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-[var(--color-cream)]">
      {/* Desktop: horizontal scroll */}
      <div className="hs-pin-height hidden md:block" style={{ height: "300vh", overflow: "hidden" }}>
        <div
          ref={containerRef}
          className="flex"
          style={{ width: "max-content", height: "100vh", paddingTop: "70px" }}
        >
          {projects.map((project) => (
            <div
              key={project.label}
              className="hs-project relative"
              style={{
                height: "100%",
                minWidth: "4vw",
                borderRight: "1px solid rgba(20,20,20,0.08)",
                color: "rgba(20,20,20,0.22)",
                transition: "color 0.3s",
              }}
            >
              {/* Rotated label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "2vw",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "2vw",
                  lineHeight: "2.6vw",
                  letterSpacing: "-0.03em",
                  transform: "rotate(-90deg)",
                  transformOrigin: "0 50%",
                  width: "calc(100vh - 70px - 2.6vw)",
                }}
              >
                <p>{project.label}</p>
                <p
                  className="hs-year"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8vw",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    alignSelf: "flex-end",
                  }}
                >
                  {project.year}
                </p>
              </div>

              {/* Image */}
              <div
                className="hs-media"
                style={{
                  height: "calc(100% - 2.6vw)",
                  width: "auto",
                  margin: "1.3vw 1.3vw 0 4vw",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    aspectRatio: "1.6",
                    borderRadius: "1.2vw",
                    overflow: "hidden",
                    background: "#ffffff",
                    border: "2px solid #141414",
                    boxShadow: "0 16px 32px -14px rgba(20,20,20,0.25)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.label} — representative reviewed Shopify page`}
                    fill
                    sizes="80vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                  <span
                    className="hs-pill"
                    style={{
                      position: "absolute",
                      top: "0.9vw",
                      left: "0.9vw",
                      padding: "0.35vw 0.9vw",
                      borderRadius: "999px",
                      background: "#ff5a66",
                      color: "#ffffff",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.7vw",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked vertical */}
      <div className="md:hidden px-6 py-16">
        <p className="text-caption text-coral-600 mb-4">What we review</p>
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={`m-${project.label}`}
              className="border-t border-ink-200 pt-4"
            >
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-xl font-extrabold tracking-tight text-ink-900">
                  {project.label}
                </p>
                <p className="text-[10px] font-bold text-ink-500 tracking-widest uppercase">
                  {project.year}
                </p>
              </div>
              <div className="relative aspect-[1.8] rounded-[var(--radius-card)] overflow-hidden bg-white border-2 border-ink-900 shadow-soft">
                <Image
                  src={project.image}
                  alt={`${project.label} — representative reviewed Shopify page`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  placeholder="blur"
                />
                <span className="absolute top-3 left-3 rounded-full bg-coral-600 px-3 py-1 text-white font-bold text-[10px] tracking-wide uppercase">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
