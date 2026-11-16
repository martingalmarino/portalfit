import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="wrap">
        <div className="kicker">404</div>
        <h1 className="h1" style={{ marginTop: 12 }}>
          Esta página no está en el portal
        </h1>
        <p className="lede" style={{ marginTop: 16, maxWidth: 560 }}>
          El enlace puede estar viejo o la pieza todavía no se publicó. No completamos el hueco con contenido inventado.
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
