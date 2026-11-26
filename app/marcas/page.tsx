import Link from "next/link";
import { CopyBlock, HubH2, linkParts } from "@/components/hub/copy-block";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { LinkedCopy } from "@/components/ui/linked-copy";
import { getFicha, getMarcas } from "@/lib/content/load";
import { loadHubs, marcasCountText } from "@/lib/content/hubs";
import type { Marca } from "@/lib/content/schema";
import { isHttpUrl, pad2, publicCopy, shortOrigin } from "@/lib/format";
import { collectionPageJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

const hub = loadHubs().marcas;
const marcas = getMarcas();
const description = marcasCountText(hub.description, marcas.length);

export const metadata = pageMetadata({
  title: hub.title,
  description,
  path: "/marcas",
});

function sinceLabel(raw: string | number): string | null {
  const text = publicCopy(String(raw));
  if (!text) return null;
  const year = /(?:19|20)\d{2}/.exec(text);
  return year ? `Desde ${year[0]}` : text;
}

function brandFacts(marca: Marca): string {
  const origin = shortOrigin(String(marca.origen.valor));
  const since = sinceLabel(marca.anio_fundacion.valor);
  const shop = isHttpUrl(String(marca.mercado_libre.valor)) ? "sí" : "no";
  return [origin, since, `Tienda oficial en Mercado Libre: ${shop}`].filter(Boolean).join(" · ");
}

export default function MarcasPage() {
  const criterio = linkParts(hub.criterio_frase);
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Marcas", path: "/marcas" }]} />
        <JsonLd
          data={collectionPageJsonLd({
            name: hub.h1,
            description,
            path: "/marcas",
            listName: "Marcas",
            items: marcas.map((marca) => ({ name: marca.nombre, path: `/marcas/${marca.slug}`, type: "Brand" })),
          })}
        />
        <JsonLd data={faqJsonLd(hub.faq)} />
        <div className="page-hero">
          <div className="kicker">{hub.kicker}</div>
          <h1 className="h1">{hub.h1}</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            {hub.intro}
          </p>
        </div>

        <HubH2>{marcasCountText(hub.vistazo_h2, marcas.length)}</HubH2>
        <div className="mgrid">
          {marcas.map((marca) => (
            <Link href={`/marcas/${marca.slug}`} key={marca.slug}>
              <div className="lbox">
                <BrandLogo slug={marca.slug} name={marca.nombre} variant="card" />
                <span className="bn">{pad2(marca.ranking_relevancia)}</span>
              </div>
              <b className="h4" style={{ display: "block", marginTop: 10, fontSize: 16 }}>{marca.nombre}</b>
              <span className="xs">{shortOrigin(String(marca.origen.valor))}</span>
            </Link>
          ))}
        </div>

        <HubH2>{hub.fichas_h2}</HubH2>
        <div style={{ display: "grid", gap: 28 }}>
          {marcas.map((marca) => {
            const ficha = getFicha(marca.slug);
            const resumen = marca.resumen_card ?? ficha?.intro;
            return (
              <article key={marca.slug} className="erow" style={{ textDecoration: "none" }}>
                <span className="num">{pad2(marca.ranking_relevancia)}</span>
                <Link href={`/marcas/${marca.slug}`}>
                  <h3 className="h3" style={{ fontSize: 22, margin: 0 }}>{marca.nombre}</h3>
                </Link>
                <div className="erow-facts">
                  {resumen ? <p className="small" style={{ margin: 0 }}><Editorial text={resumen} /></p> : null}
                  <p className="xs" style={{ margin: "6px 0 0" }}>{brandFacts(marca)}</p>
                </div>
                <Link href={`/marcas/${marca.slug}`} aria-label={`Ver ficha de ${marca.nombre}`}>→</Link>
              </article>
            );
          })}
        </div>

        <HubH2>
          <Link className="h-anchor" href={criterio.url}>{hub.criterio_h2}</Link>
        </HubH2>
        <p style={{ margin: 0, maxWidth: "68ch", color: "var(--ink-2)" }}>
          <LinkedCopy text={hub.criterio} links={criterio.frase ? [{ phrase: criterio.frase, href: criterio.url }] : []} />
        </p>

        <HubH2>{hub.mirar_h2}</HubH2>
        {hub.mirar.map((item) => (
          <div className="hub-sub" key={item.h3}>
            <h3 className="h3">{item.h3}</h3>
            <CopyBlock text={item.texto} links={item.enlaces} />
          </div>
        ))}

        <HubH2>{hub.faq_h2}</HubH2>
        <FaqList items={hub.faq} />

        <HubH2>{hub.seguir_h2}</HubH2>
        <div className="hub-links">
          {hub.seguir.map((item) => {
            const link = linkParts(item);
            return (
              <Link className="link" href={link.url} key={link.url}>
                {link.texto}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
