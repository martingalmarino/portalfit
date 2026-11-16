import { Editorial } from "@/components/ui/editorial";
import { hostOf, isHttpUrl, pad2 } from "@/lib/format";

export function FaqList({
  items,
}: {
  items: Array<{ q: string; a: string; fuentes?: string[] }>;
}) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details key={item.q} open={index === 0}>
          <summary>
            <span>
              <span className="num" style={{ marginRight: 14 }}>
                {pad2(index + 1)}
              </span>
              <Editorial text={item.q} />
            </span>
            <span className="pm" aria-hidden />
          </summary>
          <p className="a">
            <Editorial text={item.a} />
          </p>
          {item.fuentes && item.fuentes.length > 0 ? (
            <p className="src">
              Fuente:{" "}
              {item.fuentes.map((fuente, fuenteIndex) => (
                <span key={fuente}>
                  {fuenteIndex > 0 ? " · " : null}
                  {isHttpUrl(fuente) ? (
                    <a href={fuente} target="_blank" rel="noreferrer">
                      {hostOf(fuente)}
                    </a>
                  ) : (
                    <Editorial text={fuente} />
                  )}
                </span>
              ))}
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}
