import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { loadAffiliateFile } from "@/lib/content/load";
import { pageMetadata } from "@/lib/seo";
import { getSiteName } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Transparencia de afiliados",
  description:
    "Cómo se financian los enlaces a Mercado Libre en Portal FIT, qué es un precio de ejemplo y qué no cambia la comisión.",
  path: "/transparencia-afiliados",
});

export default function TransparenciaPage() {
  const catalog = loadAffiliateFile();
  const name = getSiteName();
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs
          items={[
            { name: "Inicio", path: "/" },
            { name: "Transparencia de afiliados", path: "/transparencia-afiliados" },
          ]}
        />
        <div className="page-hero">
          <div className="kicker">Financiación</div>
          <h1 className="h1">Transparencia de afiliados</h1>
        </div>
        <p>
          Algunos botones de {name} llevan a Mercado Libre con un enlace de afiliado. Si comprás desde ese enlace, {name} puede recibir una comisión, sin costo extra para vos. El botón dice “Ver en Mercado Libre”, abre en una pestaña nueva y el enlace lleva <code>rel=&quot;sponsored nofollow noopener&quot;</code>.
        </p>
        <p>{catalog.aviso}</p>
        <p>
          En esta etapa el catálogo es un mock: cada producto tiene <code>ejemplo: true</code> y el precio se rotula “Precio de ejemplo”. No son precios de una publicación real y no se publican como oferta. Cuando se conecte la API, la página se va a poder revalidar con ISR; hasta entonces no hay datos de Product ni Offer.
        </p>
        <p>
          La comisión no cambia el orden de las marcas ni el nivel de evidencia. El criterio está en{" "}
          <Link href="/como-evaluamos#orden">Cómo evaluamos</Link>. Los canales oficiales de cada marca (sitio, redes, tienda oficial) están separados de los botones de afiliado.
        </p>
        <p>
          El identificador de afiliado sale de la variable <code>ML_AFFILIATE_ID</code>. Si no está configurada, el destino sigue siendo el del mock, sin identificador inventado.
        </p>
      </div>
    </article>
  );
}
