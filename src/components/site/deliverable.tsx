"use client";

/**
 * B3 — the deliverable preview.
 *
 * Not a port of the old audit-deliverable-preview. That component rendered mock
 * report *pages* on a scaled 1920x1080 stage, and the hero browser window
 * already shows real screenshots of those pages, so rebuilding it would show the
 * same artifact twice. It also carried four invented statistics ("est. 6.1%
 * drop-off", "returns run 14% above DTC category median", "accounts for 31% of
 * mobile conversions", "12-18% est. lift") and a fictional client, Marlow &
 * Grove, presented as a real report.
 *
 * This shows the thing the rest of the page keeps promising and never displays:
 * the ranked findings register. "Ranked by impact", "start at the top", "your
 * developer can pick it up" are claims about a list nobody has seen.
 *
 * Every impact line is qualitative — what the issue does to the experience —
 * rather than a fabricated percentage. A sample that models invented numbers
 * would undercut the "every claim checked against your live store data" promise
 * sitting three sections above it.
 *
 * F.05 is deliberately an OK finding. The register records what is working as
 * well as what is not, which is both true and more credible than a list of
 * nothing but problems.
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

import { FINDINGS, SEVERITY } from "@/content/findings";

export function SiteDeliverable() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="deliverable"
      className="scroll-mt-28 px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
          This is the list you get
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base text-balance md:text-lg">
          Every finding gets a rank, a surface and the reason it matters. You
          work down it until you run out of time.
        </p>

        <div className="bg-card mt-10 overflow-hidden rounded-xl ring-1 ring-black/5 md:mt-14 dark:ring-white/10">
          <div className="text-muted-foreground flex items-center justify-between border-b px-5 py-3 text-xs font-medium tracking-wide uppercase">
            <span>Findings register</span>
            <span>Sample</span>
          </div>

          <ul className="divide-border divide-y">
            {FINDINGS.map((f, i) => {
              const sev = SEVERITY[f.severity];
              return (
                <motion.li
                  key={f.rank}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:gap-5"
                >
                  <div className="flex shrink-0 items-center gap-3 sm:w-40">
                    <span className="text-muted-foreground font-mono text-xs tabular-nums">
                      {f.rank}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        aria-hidden
                        className={cn("size-2 rounded-full", sev.dot)}
                      />
                      <span className={cn("text-xs font-medium", sev.text)}>
                        {sev.label}
                      </span>
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {f.area}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{f.title}</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {f.impact}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <p className="text-muted-foreground border-t px-5 py-3 text-xs">
            Six of the findings from a recent audit. Each one appears again in
            the document on an annotated screenshot of the page it was found on.
          </p>
        </div>
      </div>
    </section>
  );
}
