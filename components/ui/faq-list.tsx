import Link from "next/link";
import { linkParts } from "@/components/hub/copy-block";
import { Editorial } from "@/components/ui/editorial";
import { LinkedCopy } from "@/components/ui/linked-copy";
import type { HubLink } from "@/lib/content/hubs";
import { hostOf, isHttpUrl, pad2, publicCopy, publishedCopy } from "@/lib/format";

function Fuente({ fuente }: { fuente: string }) {
  if (isHttpUrl(fuente)) {
    return (
      <a href={fuente} target="_blank" rel="noreferrer">
        {hostOf(fuente)}
      </a>
    );
  }
  const path = /^(\/[a-z0-9/-]+)/i.exec(fuente.trim())?.[1];
  if (path) return <Link href={path}>{path}</Link>;
  const label = fuente.trim();
  if (!label) return null;
  return (
    <span>
      <Editorial text={label} />
    </span>
  );
}

export function FaqList({
  items,
  verbatim = false,
}: {
  items: Array<{ q: string; a: string; fuentes?: string[]; enlaces?: HubLink[] }>;
  verbatim?: boolean;
}) {
  return (
    <div className="faq">
      {items.map((item, index) => {
        const answer = (verbatim ? publishedCopy : publicCopy)(item.a);
        if (!answer) return null;
        const links = (item.enlaces ?? []).map(linkParts).filter((link) => link.url.startsWith("/") && link.texto);
        const inline = links.filter((link) => link.frase && answer.includes(link.frase));
        const extra = links.filter((link) => !link.frase || !answer.includes(link.frase));
        return (
          <details key={item.q} open={index === 0}>
            <summary>
              <span>
                <span className="num" style={{ marginRight: 14 }}>
                  {pad2(index + 1)}
                </span>
                <Editorial text={item.q} verbatim={verbatim} />
              </span>
              <span className="pm" aria-hidden />
            </summary>
            <p className="a">
              <LinkedCopy
                text={answer}
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
            {item.fuentes && item.fuentes.length > 0 ? (
              <p className="src">
                <span>Fuente:</span>
                {item.fuentes.map((fuente) => (
                  <Fuente fuente={fuente} key={fuente} />
                ))}
              </p>
            ) : null}
          </details>
        );
      })}
    </div>
  );
}
