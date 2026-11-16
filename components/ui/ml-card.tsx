import Image from "next/image";
import { BrandLogo } from "@/components/ui/brand-logo";
import { EVIDENCE } from "@/lib/format";
import { photoByFile } from "@/lib/photos";
import type { AffiliateProduct } from "@/lib/affiliates";
import { IconOut } from "@/components/ui/icons";

export function MlCard({ product }: { product: AffiliateProduct }) {
  const photo = photoByFile(product.imagen);
  const evidence = EVIDENCE[product.evidence];
  return (
    <article className="mlc">
      <div className="media">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(max-width: 600px) 46vw, 280px"
          style={{ objectPosition: product.posicion }}
        />
        <span className="ml-badge">
          <i>ML</i>Mercado Libre
        </span>
        <span className="logo-chip">
          <BrandLogo slug={product.marcaSlug} name={product.marcaNombre} variant="chip" />
        </span>
        <span className="illus">Foto ilustrativa</span>
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
          <h3 className="ptitle">{product.titulo}</h3>
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
        <div className="price">
          <b>{product.precioLabel}</b>
          <span className="ex">Precio de ejemplo</span>
        </div>
        <a className="cta-ml" href={product.href} target="_blank" rel="sponsored nofollow noopener">
          Ver en Mercado Libre <IconOut />
        </a>
        <p className="comm">Enlace de afiliado · podemos recibir comisión</p>
      </div>
    </article>
  );
}

export function MlGrid({ products }: { products: AffiliateProduct[] }) {
  if (products.length === 0) {
    return (
      <p className="empty">
        No hay productos de ejemplo para esta selección. Cuando se conecte Mercado Libre, acá van a aparecer
        publicaciones reales. No completamos el espacio con precios inventados.
      </p>
    );
  }
  return (
    <div className="ml-grid">
      {products.map((product) => (
        <MlCard key={product.id} product={product} />
      ))}
    </div>
  );
}
