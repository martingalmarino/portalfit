import { Editorial } from "@/components/ui/editorial";
import { hostOf, isHttpUrl, pad2 } from "@/lib/format";

export function FaqList({
  items,
  verbatim = false,
}: {
  items: Array<{ q: string; a: string; fuentes?: string[] }>;
  verbatim?: boolean;
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
              <Editorial text={item.q} verbatim={verbatim} />
            </span>
            <span className="pm" aria-hidden />
          </summary>
          <p className="a">
            <Editorial text={item.a} verbatim={verbatim} />
          </p>
          {item.fuentes && item.fuentes.length > 0 ? (
            <p className="src">
              <span>Fuente:</span>
              {item.fuentes.map((fuente) => {
                const label = (isHttpUrl(fuente) ? hostOf(fuente) : fuente).trim();
                if (!label) return null;
                return isHttpUrl(fuente) ? (
                  <a key={fuente} href={fuente} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                ) : (
                  <span key={fuente}>
                    <Editorial text={label} />
                  </span>
                );
              })}
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}
