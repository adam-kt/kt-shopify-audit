"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LOGOS_PER_ROW = 5;

export default function SingleRowLogoCloud() {
  const logos = [
    {
      title: "Spotify",
      src: "https://assets.aceternity.com/logos/spotify.webp",
    },
    {
      title: "Twitch",
      src: "https://assets.aceternity.com/logos/twitch.webp",
    },
    {
      title: "Netflix",
      src: "https://assets.aceternity.com/logos/netflix.webp",
    },
    {
      title: "Raycast",
      src: "https://assets.aceternity.com/logos/raycast.webp",
    },
    {
      title: "CharacterAI",
      src: "https://assets.aceternity.com/logos/characterai.png",
    },
    {
      title: "OpenAI",
      src: "https://assets.aceternity.com/logos/openai.png",
    },
    {
      title: "Dovly",
      src: "https://assets.aceternity.com/logos/dovly.webp",
    },
    {
      title: "Microsoft",
      src: "https://assets.aceternity.com/logos/microsoft.webp",
    },
    {
      title: "Portola",
      src: "https://assets.aceternity.com/logos/portola.png",
    },
    {
      title: "YC",
      src: "https://assets.aceternity.com/logos/y-combinator.png",
    },
  ];

  const setCount = Math.ceil(logos.length / LOGOS_PER_ROW);
  const [setIndex, setSetIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSetIndex((i) => (i + 1) % setCount);
    }, 2000);
    return () => clearInterval(id);
  }, [setCount]);

  const visibleLogos = logos.slice(
    setIndex * LOGOS_PER_ROW,
    setIndex * LOGOS_PER_ROW + LOGOS_PER_ROW,
  );

  return (
    <section className="mx-auto flex min-h-48 w-full max-w-4xl items-center justify-center px-4 py-10 sm:min-h-64 sm:py-12 md:min-h-80 md:px-8 md:py-0">
      <div className="flex w-full flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-center md:gap-4 lg:gap-6">
        <h2 className="shrink-0 text-center text-sm font-medium tracking-tight text-neutral-500 sm:text-base md:mr-6 md:text-left lg:mr-8">
          Trusted by the best
        </h2>
        <div className="grid min-h-9 w-full grid-cols-5 items-center justify-items-center gap-x-1.5 sm:min-h-10 sm:gap-x-2 md:flex md:min-h-10 md:flex-1 md:justify-between md:gap-4">
          <AnimatePresence mode="popLayout">
            {visibleLogos.map((logo, index) => (
              <motion.div
                key={logo.title}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="flex w-full items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.title}
                  className="aspect-video h-7 w-full max-w-full object-contain sm:h-8 md:h-10 md:w-auto md:max-w-none dark:invert"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
