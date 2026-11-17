"use client";

import { useState, useSyncExternalStore } from "react";
import { pad2 } from "@/lib/format";

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function desktopNow() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export function GuideToc({ items }: { items: Array<{ id: string; label: string }> }) {
  const desktop = useSyncExternalStore(subscribe, desktopNow, () => false);
  const [userOpen, setUserOpen] = useState<boolean | null>(null);
  const open = userOpen ?? desktop;

  return (
    <details className="toc-details" open={open}>
      <summary
        onClick={(event) => {
          event.preventDefault();
          if (!desktop) setUserOpen(!open);
        }}
      >
        En esta guía
      </summary>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className="num">{pad2(index + 1)}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
