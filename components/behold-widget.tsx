"use client";

import { useEffect } from "react";

export function BeholdWidget({ feedId }: { feedId: string }) {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
  }, []);

  return (
    // @ts-expect-error – custom element from Behold
    <behold-widget feed-id={feedId} />
  );
}
