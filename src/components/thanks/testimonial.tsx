"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGsapIn } from "@/lib/gsap-hooks";
import iphone3 from "@/images/iphone-3.png";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export function Testimonial({ quote, name, role }: TestimonialProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useGsapIn(cardRef, {
    from: { y: 24, opacity: 0, rotate: -3, duration: 0.75, ease: "power3.out" },
    to: { rotate: -2 },
    scroll: true,
  });

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-14">
        <div
          ref={cardRef}
          className="relative grid md:grid-cols-[1fr_1.3fr] gap-0 rounded-[var(--radius-card-lg)] bg-[var(--color-tan-soft)] overflow-hidden shadow-soft"
          style={{ rotate: "-2deg" }}
        >
          <div className="relative aspect-[3/4] md:aspect-auto bg-[var(--color-peach)] overflow-hidden">
            <Image
              src={iphone3}
              alt="Annotated audit deliverable on mobile"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              placeholder="blur"
            />
          </div>

          <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
            <p className="text-[22px] sm:text-[28px] font-extrabold tracking-[-0.01em] leading-[1.2] text-ink-950">
              &ldquo;{quote}&rdquo;
            </p>
            <div className="mt-8">
              <p className="text-[15px] font-bold text-ink-950">— {name}</p>
              <p className="text-[14px] text-ink-700 font-medium mt-0.5">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
