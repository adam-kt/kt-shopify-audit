"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTextProps {
  children: string;
  className?: string;
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function ScrollText({ children, className }: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className={cn("py-24 sm:py-32 lg:py-40", className)}>
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-12">
        <p className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold tracking-[-0.025em] leading-[1.15] text-ink-900">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={`${word}-${i}`}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
}
