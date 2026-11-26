import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { getEtapas } from "@/lib/content/load";
import { pad2 } from "@/lib/format";
import { STAGE_PHOTOS } from "@/lib/photos";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Etapas de vida y suplementos según la edad",
  description: "Qué priorizar en entrenamiento, alimentación y suplementos según tu etapa: de los 30 a los 60, mujer, hombre, menopausia y masa muscular.",
  path: "/etapas",
});

export default function EtapasPage() {
  const etapas = getEtapas();
  return (
    <section className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Etapas de vida", path: "/etapas" }]} />
        <JsonLd
          data={itemListJsonLd(
            "Etapas de vida",
            "/etapas",
            etapas.map((etapa) => ({ name: etapa.nombre, path: `/etapas/${etapa.slug}` })),
          )}
        />
        <div className="page-hero">
          <div className="kicker">Etapas de vida</div>
          <h1 className="h1">Suplementación según la edad</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 680 }}>
            Qué conviene priorizar en cada etapa: entrenamiento, alimentación y los suplementos que tienen evidencia para esa edad.
          </p>
        </div>
        <div className="egrid">
          {etapas.map((etapa, index) => {
            const file = STAGE_PHOTOS[etapa.slug];
            return (
              <Link className="ecard" href={`/etapas/${etapa.slug}`} key={etapa.slug}>
                {file ? (
                  <Photo file={file} className="ecard" sizes="(max-width: 600px) 100vw, 30vw" />
                ) : null}
                <div className="eov">
                  <div className="num" style={{ color: "var(--brass)" }}>{pad2(index + 1)}</div>
                  <h2 className="h-et">{etapa.nombre}</h2>
                  <p style={{ fontSize: 14.5, marginTop: 10 }}>
                    <Editorial text={etapa.descripcion} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
