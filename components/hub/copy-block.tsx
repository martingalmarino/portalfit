import Link from "next/link";
import type { ReactNode } from "react";
import type { HubLink } from "@/lib/content/hubs";
import { LinkedCopy } from "@/components/ui/linked-copy";

export function linkParts(link: HubLink): { texto: string; url: string; frase?: string } {
  const frase = link.frase ?? link.phrase;
  return {
    texto: link.texto ?? frase ?? "",
    url: link.url ?? link.href ?? "",
    frase,
  };
}

export function CopyBlock({
  text,
  links = [],
  className,
}: {
  text: string;
  links?: HubLink[];
  className?: string;
}) {
  const normalized = links.map(linkParts).filter((link) => link.url.startsWith("/") && link.texto);
  const inline = normalized.filter((link) => link.frase && text.includes(link.frase));
  const extra = normalized.filter((link) => !link.frase || !text.includes(link.frase));
  return (
    <>
      <p className={className} style={{ margin: "8px 0 0", maxWidth: "68ch", color: "var(--ink-2)" }}>
        <LinkedCopy
          text={text}
          links={inline.map((link) => ({ phrase: link.frase ?? link.texto, href: link.url }))}
        />
      </p>
      {extra.length > 0 ? (
        <div className="hub-links">
          {extra.map((link) => (
            <Link className="link" href={link.url} key={`${link.url}-${link.texto}`}>
              {link.texto}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function HubH2({ children }: { children: ReactNode }) {
  return <h2 className="h2 hub-h2">{children}</h2>;
}
