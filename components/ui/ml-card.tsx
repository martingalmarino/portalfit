import Image from "next/image";
import { BrandLogo } from "@/components/ui/brand-logo";
import { EVIDENCE } from "@/lib/format";
import { MICROCOPY, mlButtonLabel } from "@/lib/microcopy";
import type { AffiliateProduct } from "@/lib/affiliates";
import { IconOut } from "@/components/ui/icons";

export function MlCard({ product }: { product: AffiliateProduct }) {
  const evidence = EVIDENCE[product.evidence];
  return (
    <article className="mlc">
      <div className={product.imagenUrl ? "media" : "media is-mark"}>
        {product.imagenUrl ? (
          <Image src={product.imagenUrl} alt={product.titulo} fill unoptimized sizes="(max-width: 480px) 100vw, 280px" />
        ) : (
          <div className="mark-fallback">
            <BrandLogo slug={product.marcaSlug} name={product.marcaNombre} variant="card" scale={1.6} />
          </div>
        )}
        <span className="ml-badge">
          <i>ML</i>Mercado Libre
        </span>
        <span className="logo-chip">
          <BrandLogo slug={product.marcaSlug} name={product.marcaNombre} variant="chip" />
        </span>
        {product.tiendaOficial ? <span className="official">{MICROCOPY.tiendaOficial}</span> : null}
      </div>
      <div className="body">
        <div className="meta">
          <span className="cat">{product.categoriaNombre}</span>
          <span className={`pill ev ${evidence.chip}`}>
            <span className="dot" />
            {evidence.label}
          </span>
        </div>
        <div>
          <div className="brandname">{product.marcaNombre}</div>
          <p className="ptitle">{product.titulo}</p>
        </div>
        {product.etiquetas.length > 0 ? (
          <div className="tagrow">
            {product.etiquetas.map((tag) => (
              <span className="pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {product.afiliado ? (
          <p className="xs affiliate-flag" title={MICROCOPY.tooltip}>
            {MICROCOPY.avisoAfiliado}
          </p>
        ) : null}
        <p className="xs">{MICROCOPY.notaPrecio}</p>
        <a
          className="cta-ml"
          href={product.href}
          target="_blank"
          rel="sponsored nofollow noopener"
          aria-label={mlButtonLabel(product.titulo, product.afiliado)}
        >
          {MICROCOPY.cta} <IconOut />
        </a>
      </div>
    </article>
  );
}

export function MlGrid({ products }: { products: AffiliateProduct[] }) {
  if (products.length === 0) {
    return <p className="empty">Todavía no hay publicaciones en esta selección.</p>;
  }
  return (
    <div className="ml-grid">
      {products.map((product) => (
        <MlCard key={product.id} product={product} />
      ))}
    </div>
  );
}
