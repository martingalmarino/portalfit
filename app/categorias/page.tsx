import Link from "next/link";
import { CopyBlock, HubH2, linkParts } from "@/components/hub/copy-block";
import { Crumbs } from "@/components/ui/crumbs";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { LinkedCopy } from "@/components/ui/linked-copy";
import { getCategorias } from "@/lib/content/load";
import { categoriasCountText, loadHubs } from "@/lib/content/hubs";
import type { Categoria } from "@/lib/content/schema";
import { EVIDENCE, pad2 } from "@/lib/format";
import { collectionPageJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const hub = loadHubs().categorias;
const categorias = getCategorias();
const description = categoriasCountText(hub.description, categorias.length);

export const metadata = pageMetadata({
  title: hub.title,
  description,
  path: "/categorias",
});

function groupCategories(): Array<{ h2: string; items: Categoria[] }> {
  const bySlug = new Map(categorias.map((item) => [item.slug, item]));
  const used = new Set<string>();
  const groups = hub.grupos.map((group) => {
    const items: Categoria[] = [];
    for (const slug of group.orden) {
      const categoria = bySlug.get(slug);
      if (!categoria || used.has(slug)) continue;
      items.push(categoria);
      used.add(slug);
    }
    for (const categoria of categorias) {
      if (used.has(categoria.slug) || categoria.nivel_evidencia !== group.nivel) continue;
      items.push(categoria);
      used.add(categoria.slug);
    }
    return { h2: group.h2, items };
  });
  const rest = categorias.filter((item) => !used.has(item.slug));
  if (rest.length > 0 && groups.length > 0) groups[groups.length - 1].items.push(...rest);
  return groups.filter((group) => group.items.length > 0);
}

export default function CategoriasPage() {
  const groups = groupCategories();
  const intro = linkParts(hub.intro_frase);
  const creatina = linkParts(hub.creatina_enlace);
  const cierre = linkParts(hub.cierre);
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Categorías", path: "/categorias" }]} />
        <JsonLd
          data={collectionPageJsonLd({
            name: hub.h1,
            description,
            path: "/categorias",
            listName: "Categorías",
            items: categorias.map((item) => ({ name: item.nombre, path: `/categorias/${item.slug}` })),
          })}
        />
        <JsonLd data={faqJsonLd(hub.faq)} />
        <div className="page-hero">
          <div className="kicker">{hub.kicker}</div>
          <h1 className="h1">{hub.h1}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 720 }}>
            <LinkedCopy text={hub.intro} links={intro.frase ? [{ phrase: intro.frase, href: intro.url }] : []} />
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.h2}>
            <HubH2>{group.h2}</HubH2>
            <ol className="cindex">
              {group.items.map((categoria, index) => {
                const meta = EVIDENCE[categoria.nivel_evidencia];
                return (
                  <li key={categoria.slug}>
                    <Link href={`/categorias/${categoria.slug}`}>
                      <span className="num">{pad2(index + 1)}</span>
                      <span>
                        <h3 className="h3" style={{ fontSize: 22, margin: 0, color: "var(--ink)" }}>{categoria.nombre}</h3>
                        <span className="small" style={{ display: "block" }}>{categoria.descripcion}</span>
                      </span>
                      <span className="xs d-only">{categoria.marcas.length} marcas</span>
                      <span className={`pill ev ${meta.chip}`}>
                        <span className="dot" />
                        {meta.label}
                      </span>
                    </Link>
                    {categoria.slug === "creatina" ? (
                      <Link className="link" href={creatina.url} style={{ marginLeft: 46 }}>
                        {creatina.texto}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}

        <HubH2>{hub.nivel_h2}</HubH2>
        <CopyBlock text={hub.nivel_texto} links={hub.nivel_enlaces} />

        <HubH2>{hub.faq_h2}</HubH2>
        <FaqList items={hub.faq} />

        <p className="hub-links">
          <Link className="link" href={cierre.url}>{cierre.texto}</Link>
        </p>
      </div>
    </section>
  );
}
