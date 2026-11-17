import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { Editorial } from "@/components/ui/editorial";
import { loadMarcas, loadTaxonomia } from "@/lib/content/load";
import { CERT_LABEL, EVIDENCE, hostOf, isHttpUrl, pad2, publicCopy, type CertState } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cómo evaluamos suplementos y marcas",
  description:
    "Cómo Portal FIT asigna el nivel de evidencia, qué significa cada estado de un registro y cuál es el criterio del orden de marcas.",
  path: "/como-evaluamos",
});

const STATES: CertState[] = ["verificado", "documento", "declarado", "terceros", "inferencia", "rotulo", "sin_dato"];

const STATE_COPY: Record<CertState, string> = {
  verificado: "Lo consultamos en un registro oficial (base SIFeGA) y anotamos la fecha.",
  documento: "Documento emitido por la autoridad sanitaria que la marca publica en su sitio.",
  declarado: "Lo dice la marca. No está contrastado de forma independiente.",
  terceros: "Lo informa un tercero, no la marca ni un registro oficial.",
  inferencia: "Es una lectura nuestra a partir de datos públicos. No es un registro ni una declaración de la marca.",
  rotulo: "Figura en el envase y se puede buscar en el buscador público de productos autorizados. No lo consultamos producto por producto.",
  sin_dato: "No hay un dato público que se pueda citar.",
};

export default function ComoEvaluamosPage() {
  const tax = loadTaxonomia();
  const marcas = loadMarcas();
  const levels = (Object.keys(EVIDENCE) as Array<keyof typeof EVIDENCE>).map((key) => ({
    key,
    ...EVIDENCE[key],
    text: tax.niveles_de_evidencia[key],
  }));

  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Cómo evaluamos", path: "/como-evaluamos" }]} />
        <div className="page-hero">
          <div className="kicker">Método</div>
          <h1 className="h1">Cómo evaluamos</h1>
          <p className="lede" style={{ marginTop: 16 }}>{tax.nota_evidencia}</p>
        </div>
        <h2>Niveles de evidencia</h2>
        <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
          {levels.map((level) => (
            <div key={level.key} className="srow" style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14, alignItems: "start" }}>
              {level.grade ? <span className={`grade ${level.gradeClass}`}>{level.grade}</span> : <span className="num">·</span>}
              <div>
                <b className="serif" style={{ fontSize: 20 }}>{level.label}</b>
                <p><Editorial text={level.text} /></p>
              </div>
            </div>
          ))}
        </div>
        <h2>Marco regulatorio argentino</h2>
        <p><Editorial text={tax.marco_regulatorio_argentino.resumen} /></p>
        <ul>
          {tax.marco_regulatorio_argentino.implicancias_editoriales.map((item) => {
            const visible = publicCopy(item);
            if (!visible) return null;
            return <li key={item}>{visible}</li>;
          })}
        </ul>
        <ol>
          {tax.marco_regulatorio_argentino.fuentes.map((fuente, index) => (
            <li key={fuente}>
              <span className="num">{pad2(index + 1)} </span>
              {isHttpUrl(fuente) ? <a href={fuente} target="_blank" rel="noreferrer">{hostOf(fuente)}</a> : <Editorial text={fuente} />}
            </li>
          ))}
        </ol>
        <h2 id="orden">Orden de las marcas</h2>
        <p><Editorial text={marcas.criterio_ranking} /></p>
        <h2>Estados de un registro</h2>
        <div className="ctable">
          <table>
            <thead>
              <tr>
                <th>Estado en la ficha</th>
                <th>Qué significa</th>
              </tr>
            </thead>
            <tbody>
              {STATES.map((state, index) => (
                <tr key={index}>
                  <td><b>{CERT_LABEL[state]}</b></td>
                  <td className="small">
                    {STATE_COPY[state]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 id="politica">Política editorial</h2>
        <p>
          El sitio es informativo. No diagnostica, no indica tratamientos y no reemplaza la consulta con un profesional de la salud. Si un dato no está, la ficha no lo muestra.
        </p>
        <p>
          Las guías llevan autor, fecha, fuentes y grado de evidencia. Si el revisor no está designado, esa línea no se muestra.
        </p>
        <p>
          El orden de los enlaces de Mercado Libre es editorial. No depende de la comisión. El detalle está en{" "}
          <Link href="/transparencia-afiliados">Links de afiliado</Link>.
        </p>
      </div>
    </article>
  );
}
