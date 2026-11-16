import Link from "next/link";
import { Crumbs } from "@/components/ui/crumbs";
import { pageMetadata } from "@/lib/seo";
import { getDomainLabel, getSiteName } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Términos",
  description: "Condiciones de uso del sitio informativo Portal FIT.",
  path: "/terminos",
});

export default function TerminosPage() {
  const name = getSiteName();
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Términos", path: "/terminos" }]} />
        <div className="page-hero">
          <div className="kicker">Legal</div>
          <h1 className="h1">Términos de uso</h1>
          <p className="small">
            Sitio: {getDomainLabel()}. Razón social, CUIT y domicilio: <span className="pend">Pendiente</span>.
          </p>
        </div>
        <p>
          {name} publica información general sobre suplementos, nutrición deportiva, longevidad y rendimiento. No es un servicio médico, no indica tratamientos y no reemplaza la consulta con un profesional de la salud. Los suplementos dietarios no están destinados a diagnosticar, tratar, curar ni prevenir enfermedades.
        </p>
        <p>
          Los precios que ves en las cards son de ejemplo hasta que exista una conexión real con Mercado Libre. La compra se hace en Mercado Libre, con sus propias condiciones. Si el enlace es de afiliado, {name} puede recibir una comisión. El detalle está en{" "}
          <Link href="/transparencia-afiliados">Transparencia de afiliados</Link>.
        </p>
        <p>
          Las marcas, los logos y los nombres de productos pertenecen a sus titulares y se muestran para identificar las fichas. Un dato marcado como pendiente no está verificado.
        </p>
        <p>
          El contenido de ejemplo del blog está rotulado como tal. No lo tomes como la guía definitiva del sitio.
        </p>
      </div>
    </article>
  );
}
