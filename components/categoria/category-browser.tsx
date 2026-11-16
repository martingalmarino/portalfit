"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MlCard } from "@/components/ui/ml-card";
import { IconArrow } from "@/components/ui/icons";
import type { AffiliateProduct } from "@/lib/affiliates";

type Option = { slug: string; nombre: string };

export function CategoryBrowser({
  products,
  subcategorias,
  marcas,
  etapas,
  niveles,
  showGuide,
}: {
  products: AffiliateProduct[];
  subcategorias: Option[];
  marcas: Option[];
  etapas: Option[];
  niveles: Option[];
  showGuide: boolean;
}) {
  const [sub, setSub] = useState("todas");
  const [brands, setBrands] = useState<string[]>([]);
  const [official, setOfficial] = useState(false);
  const [rne, setRne] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [note, setNote] = useState("");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (sub !== "todas" && product.subcategoria !== sub) return false;
      if (brands.length > 0 && !brands.includes(product.marcaSlug)) return false;
      if (official && !product.tiendaOficial) return false;
      if (rne && !product.rneVerificado) return false;
      return true;
    });
  }, [products, sub, brands, official, rne]);

  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * pageSize, current * pageSize);
  const guideIndex = showGuide && current === 1 ? Math.min(4, slice.length) : -1;

  function toggleBrand(slug: string) {
    setPage(1);
    setBrands((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]));
  }

  return (
    <div className="lgrid2">
      <aside className={filtersOpen ? "side open" : "side"}>
        <div className="sbox">
          <div className="sh">
            <b className="serif" style={{ fontSize: 19 }}>Filtros</b>
            <button
              className="xs"
              type="button"
              style={{ background: "none", border: 0, cursor: "pointer" }}
              onClick={() => {
                setBrands([]);
                setSub("todas");
                setOfficial(false);
                setRne(false);
                setPage(1);
                setNote("");
              }}
            >
              Limpiar
            </button>
          </div>
          <div className="sg">
            <div className="kicker">Marca</div>
            {marcas.map((marca) => {
              const on = brands.includes(marca.slug);
              return (
                <label className={on ? "cb on" : "cb"} key={marca.slug}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleBrand(marca.slug)}
                    style={{ position: "absolute", opacity: 0 }}
                  />
                  <span className="box">{on ? "✓" : ""}</span>
                  {marca.nombre}
                </label>
              );
            })}
          </div>
          <div className="sg">
            <div className="kicker">Etapa de vida</div>
            {etapas.slice(0, 5).map((etapa) => (
              <Link key={etapa.slug} href={`/etapas/${etapa.slug}`} className="cb">
                {etapa.nombre}
              </Link>
            ))}
            <p className="xs">El listado de ejemplo no clasifica productos por etapa. Estas son las guías de etapa.</p>
          </div>
          <div className="sg">
            <div className="kicker">Nivel de usuario</div>
            {niveles.map((nivel) => (
              <button
                key={nivel.slug}
                type="button"
                className="cb"
                onClick={() => setNote(`“${nivel.nombre}” queda para la etapa 2: el catálogo de ejemplo no trae nivel de usuario.`)}
              >
                {nivel.nombre}
              </button>
            ))}
          </div>
          <div className="sg" style={{ border: 0 }}>
            <label className="cb">
              <input type="checkbox" checked={official} onChange={() => { setOfficial((value) => !value); setPage(1); }} />
              Solo tiendas oficiales
            </label>
            <label className="cb">
              <input type="checkbox" checked={rne} onChange={() => { setRne((value) => !value); setPage(1); }} />
              Con RNE verificado
            </label>
          </div>
        </div>
        <div className="sguide">
          <div className="kicker light">Herramienta</div>
          <b className="h4" style={{ display: "block", marginTop: 10 }}>Calculadora de proteína diaria</b>
          <p className="xs" style={{ color: "#b9b3a5" }}>Estimá tu rango según peso y entrenamiento.</p>
          <Link className="soon" href="/herramientas/proteina-diaria" style={{ marginTop: 14, display: "inline-block", color: "var(--brass)" }}>
            Próximamente
          </Link>
        </div>
      </aside>
      <div>
        <div className="fbar">
          <div className="chips">
            <button type="button" className={sub === "todas" ? "fchip on" : "fchip"} onClick={() => { setSub("todas"); setPage(1); }}>
              Todas <span className="num">{products.length}</span>
            </button>
            {subcategorias.map((item) => (
              <button key={item.slug} type="button" className={sub === item.slug ? "fchip on" : "fchip"} onClick={() => { setSub(item.slug); setPage(1); }}>
                {item.nombre}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <div>
            <b className="serif" style={{ fontSize: 20 }}>{filtered.length} productos</b>
            <span className="xs"> en Mercado Libre · selección editorial</span>
            <span className="ex-flag" style={{ marginLeft: 10 }}>Productos y precios de ejemplo</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="mfbtn" type="button" onClick={() => setFiltersOpen((value) => !value)}>
              Filtros{brands.length + (official ? 1 : 0) + (rne ? 1 : 0) > 0 ? ` · ${brands.length + (official ? 1 : 0) + (rne ? 1 : 0)}` : ""}
            </button>
            <span className="xs d-only">Ordenar por</span>
            <span className="fchip">Relevancia editorial</span>
          </div>
        </div>
        {note ? <p className="small">{note}</p> : null}
        <div className="pgrid3">
          {slice.map((product, index) => (
            <span key={product.id} style={{ display: "contents" }}>
              {index === guideIndex ? <GuideCard /> : null}
              <MlCard product={product} />
            </span>
          ))}
          {slice.length === 0 ? <p className="empty" style={{ gridColumn: "1 / -1" }}>Ningún producto de ejemplo coincide con esos filtros.</p> : null}
        </div>
        {pages > 1 ? (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
            {Array.from({ length: pages }, (_, index) => (
              <button key={index} type="button" className={current === index + 1 ? "fchip on" : "fchip"} onClick={() => setPage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        ) : null}
        <p className="xs" style={{ marginTop: 16 }}>
          Enlaces de afiliado: si comprás, podemos recibir una comisión sin costo extra para vos. El orden “Relevancia editorial” no depende de comisiones. Fotos ilustrativas.
        </p>
      </div>
    </div>
  );
}

function GuideCard() {
  return (
    <article className="gins">
      <div className="kicker light">Guía rápida</div>
      <p className="gq">¿Concentrada o aislada?</p>
      <p style={{ color: "#c9c3b5", fontSize: 15 }}>
        La aislada tiene menos grasa y lactosa por porción; la concentrada suele costar menos. Para la mayoría, la diferencia práctica está en la tolerancia y el precio.
      </p>
      <span className="ex-flag" style={{ marginTop: 16, background: "rgb(255 255 255 / 0.08)", borderColor: "rgb(196 165 116 / 0.5)", color: "var(--brass)" }}>
        Texto de ejemplo
      </span>
      <Link className="link" href="/blog/proteina-despues-de-los-40" style={{ color: "var(--paper)", marginTop: "auto" }}>
        Leer la guía completa <IconArrow />
      </Link>
    </article>
  );
}
