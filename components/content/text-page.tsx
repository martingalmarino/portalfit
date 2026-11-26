import Link from "next/link";
import { ContactEmail } from "@/components/ui/contact-email";
import { Crumbs } from "@/components/ui/crumbs";
import { LinkedCopy } from "@/components/ui/linked-copy";
import { contactEmailDomain, contactEmailUser } from "@/lib/site";
import { formatContentDate } from "@/lib/format";
import type { TextDoc } from "@/lib/content/pages";

function Rich({ text, links }: { text: string; links: Array<{ text: string; url: string }> }) {
  const phrases = links
    .filter((link) => link.text && text.includes(link.text))
    .map((link) => ({ phrase: link.text, href: link.url }));
  const user = contactEmailUser();
  const domain = contactEmailDomain();
  const parts = text.split("{CONTACT_EMAIL}");
  if (parts.length === 1) return <LinkedCopy text={text} links={phrases} />;
  return (
    <>
      {parts.map((part, index) => (
        <span key={`${index}-${part.slice(0, 12)}`}>
          {part}
          {index < parts.length - 1 ? <ContactEmail user={user} domain={domain} /> : null}
        </span>
      ))}
    </>
  );
}

export function TextPage({
  page,
  crumbs,
}: {
  page: TextDoc;
  crumbs: Array<{ name: string; path: string }>;
}) {
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs items={crumbs} />
        <div className="page-hero">
          {page.kicker ? <div className="kicker">{page.kicker}</div> : null}
          <h1 className="h1">{page.h1}</h1>
          {page.bajada ? (
            <p className="lede" style={{ marginTop: 16 }}>
              <Rich text={page.bajada} links={page.links} />
            </p>
          ) : null}
        </div>
        {page.cardsHeading ? <h2 className="h2">{page.cardsHeading}</h2> : null}
        {page.cards.length > 0 ? (
          <div style={{ display: "grid", gap: 16 }}>
            {page.cards.map((card) => {
              const body = (
                <>
                  {card.state ? <span className="soon">{card.state}</span> : null}
                  <h3 className="h3" style={{ marginTop: 10 }}>{card.title}</h3>
                  <p className="small"><Rich text={card.text} links={page.links} /></p>
                </>
              );
              return card.url ? (
                <Link key={card.title} href={card.url} className="srcbox" style={{ textDecoration: "none" }}>
                  {body}
                </Link>
              ) : (
                <div key={card.title} className="srcbox">{body}</div>
              );
            })}
          </div>
        ) : null}
        {page.sections.map((section) => (
          <section key={section.h2 || section.paragraphs[0]}>
            {section.h2 ? <h2 className={page.cardsHeading ? "h2" : undefined}>{section.h2}</h2> : null}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Rich text={paragraph} links={page.links} />
              </p>
            ))}
            {section.table ? (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      {section.table.columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, index) => (
                          <td key={`${index}-${cell}`}>
                            {cell.startsWith("https://") ? (
                              <a href={cell} target="_blank" rel="noreferrer">{cell.replace(/^https?:\/\//, "")}</a>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ))}
        {page.links.length > 0 ? (
          <ul>
            {page.links.map((link) => (
              <li key={link.url}>
                {link.url.startsWith("/") ? (
                  <Link href={link.url}>{link.text}</Link>
                ) : (
                  <a href={link.url} target="_blank" rel="noreferrer">{link.text}</a>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {page.updated ? <p className="xs">Actualizado {formatContentDate(page.updated)}</p> : null}
      </div>
    </article>
  );
}
