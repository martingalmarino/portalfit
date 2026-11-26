import Link from "next/link";
import type { ReactNode } from "react";

type PhraseLink = { phrase: string; href: string };

/** Enlaza la primera aparición de cada frase, sin cambiar el texto. */
export function LinkedCopy({ text, links = [] }: { text: string; links?: PhraseLink[] }) {
  const usable = links
    .filter((link) => link.phrase.length > 0 && text.includes(link.phrase))
    .sort((a, b) => b.phrase.length - a.phrase.length);
  if (usable.length === 0) return <>{text}</>;

  const spans: Array<{ start: number; end: number; href: string; phrase: string }> = [];
  for (const link of usable) {
    const start = text.indexOf(link.phrase);
    if (start < 0) continue;
    const end = start + link.phrase.length;
    if (spans.some((span) => start < span.end && end > span.start)) continue;
    spans.push({ start, end, href: link.href, phrase: link.phrase });
  }
  spans.sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;
  spans.forEach((span, index) => {
    if (span.start > cursor) nodes.push(text.slice(cursor, span.start));
    nodes.push(
      <Link className="copy-link" href={span.href} key={`${span.href}-${index}`}>
        {span.phrase}
      </Link>,
    );
    cursor = span.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
