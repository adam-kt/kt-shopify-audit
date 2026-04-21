"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function RevealText({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: RevealTextProps) {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
