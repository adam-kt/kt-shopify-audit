import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Register our custom typography classes so they don't conflict
      // with text color classes (text-ink-*, text-white, text-black, etc.).
      "font-size": [
        { text: ["mega", "display", "headline", "title", "body-lg", "body", "caption"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
