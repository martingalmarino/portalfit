import Link from "next/link";
import { CopyBlock, HubH2, linkParts } from "@/components/hub/copy-block";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { LinkedCopy } from "@/components/ui/linked-copy";
import { Photo } from "@/components/ui/photo";
import { getEtapas } from "@/lib/content/load";
import { loadHubs } from "@/lib/content/hubs";
import type { Etapa } from "@/lib/content/schema";
import { pad2 } from "@/lib/format";
import { STAGE_PHOTOS } from "@/lib/photos";
import { collectionPageJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const hub = loadHubs().etapas;

export const metadata = pageMetadata({
  title: hub.title,
  description: hub.description,
  path: "/etapas",
});

function grouped(etapas: Etapa[]): Array<{ h2: string; items: Etapa[] }> {
  const bySlug = new Map(etapas.map((item) => [item.slug, item]));
  const used = new Set<string>();
  const groups = hub.grupos.map((group) => {
    const items = group.slugs.flatMap((slug) => {
      const etapa = bySlug.get(slug);
      if (!etapa) return [];
      used.add(slug);
      return [etapa];
    });
    return { h2: group.h2, items };
  });
  const rest = etapas.filter((item) => !used.has(item.slug));
  if (rest.length > 0 && groups.length > 0) groups[groups.length - 1].items.push(...rest);
  return groups;
}

export default function EtapasPage() {
  const etapas = getEtapas();
  const groups = grouped(etapas);
  const intro = linkParts(hub.intro_frase);
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Etapas de vida", path: "/etapas" }]} />
        <JsonLd
          data={collectionPageJsonLd({
            name: hub.h1,
            description: hub.description,
            path: "/etapas",
            listName: "Etapas de vida",
            items: etapas.map((etapa) => ({ name: etapa.nombre, path: `/etapas/${etapa.slug}` })),
          })}
        />
        <JsonLd data={faqJsonLd(hub.faq)} />
        <div className="page-hero">
          <div className="kicker">{hub.kicker}</div>
          <h1 className="h1">{hub.h1}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            <LinkedCopy text={hub.intro} links={intro.frase ? [{ phrase: intro.frase, href: intro.url }] : []} />
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.h2}>
            <HubH2>{group.h2}</HubH2>
            <div className="egrid">
              {group.items.map((etapa, index) => {
                const file = STAGE_PHOTOS[etapa.slug];
                const resumen = etapa.resumen_card ?? etapa.descripcion;
                return (
                  <Link className="ecard" href={`/etapas/${etapa.slug}`} key={etapa.slug}>
                    {file ? (
                      <Photo file={file} className="ecard" sizes="(max-width: 600px) 100vw, 30vw" />
                    ) : null}
                    <div className="eov">
                      <div className="num" style={{ color: "var(--brass)" }}>{pad2(index + 1)}</div>
                      <h3 className="h-et">{etapa.nombre}</h3>
                      <p style={{ fontSize: 14.5, marginTop: 10 }}>
                        <Editorial text={resumen} />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <HubH2>{hub.repetido_h2}</HubH2>
        {hub.repetido.map((item) => (
          <div className="hub-sub" key={item.h3}>
            <h3 className="h3">{item.h3}</h3>
            <CopyBlock text={item.texto} links={item.enlaces} />
          </div>
        ))}

        <HubH2>{hub.faq_h2}</HubH2>
        <FaqList items={hub.faq} />
      </div>
    </section>
  );
}
