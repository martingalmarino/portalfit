import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Página no encontrada: volvé al inicio",
  description: "No encontramos esa página. Volvé al inicio o recorré las categorías y las marcas.",
  path: "/404",
  absoluteTitle: true,
});

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <title>Página no encontrada | Portal FIT</title>
        <meta
          name="description"
          content="No encontramos esa página. Volvé al inicio o recorré las categorías y las marcas."
        />
        <div className="kicker">404</div>
        <h1 className="h1" style={{ marginTop: 12 }}>
          Esta página no está en el portal
        </h1>
        <p className="lede" style={{ marginTop: 16, maxWidth: 560 }}>
          El enlace puede estar viejo o la página todavía no está publicada.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/">
            Volver al inicio
          </Link>
          <Link className="btn btn-ghost" href="/categorias">
            Ver categorías
          </Link>
          <Link className="btn btn-ghost" href="/marcas">
            Ver marcas
          </Link>
        </div>
      </div>
    </section>
  );
}
