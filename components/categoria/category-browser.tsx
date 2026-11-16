"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { MlCard } from "@/components/ui/ml-card";
import { IconArrow } from "@/components/ui/icons";
import type { AffiliateProduct } from "@/lib/affiliates";

type Option = { slug: string; nombre: string };

type Filters = {
  sub: string;
  brands: string[];
  official: boolean;
  rne: boolean;
};

const EMPTY: Filters = { sub: "todas", brands: [], official: false, rne: false };

function readFilters(search: string, subs: Set<string>, brandSlugs: Set<string>): Filters {
  const params = new URLSearchParams(search);
  const sub = params.get("sub") ?? "todas";
  const brands = (params.get("marca") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => brandSlugs.has(item));
  return {
    sub: sub !== "todas" && subs.has(sub) ? sub : "todas",
    brands,
    official: params.get("oficial") === "1",
    rne: params.get("rne") === "1",
  };
}

const urlListeners = new Set<() => void>();

function subscribeToUrl(listener: () => void) {
  urlListeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    urlListeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function notifyUrl() {
  urlListeners.forEach((listener) => listener());
}

function currentSearch() {
  return window.location.search;
}

function emptySearch() {
  return "";
}

function writeFilters(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.sub !== "todas") params.set("sub", filters.sub);
  if (filters.brands.length > 0) params.set("marca", filters.brands.join(","));
  if (filters.official) params.set("oficial", "1");
  if (filters.rne) params.set("rne", "1");
  const query = params.toString();
  const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  const current = `${window.location.pathname}${window.location.search}`;
  if (next === current) return;
  window.history.pushState(null, "", next);
  notifyUrl();
}

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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [note, setNote] = useState("");
  const subs = useMemo(() => new Set(subcategorias.map((item) => item.slug)), [subcategorias]);
  const brandSlugs = useMemo(() => new Set(marcas.map((item) => item.slug)), [marcas]);
  const search = useSyncExternalStore(subscribeToUrl, currentSearch, emptySearch);
  const filters = useMemo(() => readFilters(search, subs, brandSlugs), [search, subs, brandSlugs]);

  function update(next: Filters) {
    writeFilters(next);
  }

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (filters.sub !== "todas" && product.subcategoria !== filters.sub) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.marcaSlug)) return false;
      if (filters.official && !product.tiendaOficial) return false;
      if (filters.rne && !product.rneVerificado) return false;
      return true;
    });
  }, [products, filters]);

  const unfiltered = filters.sub === "todas" && filters.brands.length === 0 && !filters.official && !filters.rne;
  const guideIndex = showGuide && unfiltered ? Math.min(4, filtered.length) : -1;
  const activeCount = filters.brands.length + (filters.official ? 1 : 0) + (filters.rne ? 1 : 0) + (filters.sub !== "todas" ? 1 : 0);

  return (
    <div className="lgrid2">
      <aside id="filtros-categoria" className={filtersOpen ? "side open" : "side"}>
        <div className="sbox">
          <div className="sh">
            <b className="serif" style={{ fontSize: 19 }}>Filtros</b>
            <button
              className="xs"
              type="button"
              style={{ background: "none", border: 0, cursor: "pointer", minHeight: 44 }}
              onClick={() => {
                setNote("");
                update(EMPTY);
              }}
            >
              Limpiar
            </button>
          </div>
          <fieldset className="sg">
            <legend className="kicker">Marca</legend>
            {marcas.map((marca) => {
              const on = filters.brands.includes(marca.slug);
              return (
                <label className={on ? "cb on" : "cb"} key={marca.slug}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      const brands = on
                        ? filters.brands.filter((item) => item !== marca.slug)
                        : [...filters.brands, marca.slug];
                      update({ ...filters, brands });
                    }}
                  />
                  <span className="box" aria-hidden="true">{on ? "✓" : ""}</span>
                  {marca.nombre}
                </label>
              );
            })}
          </fieldset>
          <div className="sg">
            <div className="kicker">Etapa de vida</div>
            {etapas.slice(0, 5).map((etapa) => (
              <Link key={etapa.slug} href={`/etapas/${etapa.slug}`} className="cb">
                {etapa.nombre}
              </Link>
            ))}
            <p className="xs">El listado de ejemplo no clasifica productos por etapa. Estas son las guías de etapa.</p>
          </div>
          <fieldset className="sg">
            <legend className="kicker">Nivel de usuario</legend>
            {niveles.map((nivel) => (
              <button
                key={nivel.slug}
                type="button"
                className="cb"
                aria-pressed="false"
                onClick={() =>
                  setNote(`“${nivel.nombre}” queda para la etapa 2: el catálogo de ejemplo no trae nivel de usuario.`)
                }
              >
                {nivel.nombre}
              </button>
            ))}
          </fieldset>
          <fieldset className="sg" style={{ border: 0 }}>
            <legend className="kicker">Registros</legend>
            <label className={filters.official ? "cb on" : "cb"}>
              <input
                type="checkbox"
                checked={filters.official}
                onChange={() => update({ ...filters, official: !filters.official })}
              />
              <span className="box" aria-hidden="true">{filters.official ? "✓" : ""}</span>
              Solo tiendas oficiales
            </label>
            <label className={filters.rne ? "cb on" : "cb"}>
              <input
                type="checkbox"
                checked={filters.rne}
                onChange={() => update({ ...filters, rne: !filters.rne })}
              />
              <span className="box" aria-hidden="true">{filters.rne ? "✓" : ""}</span>
              Con RNE verificado
            </label>
          </fieldset>
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
          <div className="chips" role="group" aria-label="Subcategoría">
            <button
              type="button"
              className={filters.sub === "todas" ? "fchip on" : "fchip"}
              aria-pressed={filters.sub === "todas"}
              onClick={() => update({ ...filters, sub: "todas" })}
            >
              Todas <span className="num">{products.length}</span>
            </button>
            {subcategorias.map((item) => {
              const count = products.filter((product) => product.subcategoria === item.slug).length;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className={filters.sub === item.slug ? "fchip on" : "fchip"}
                  aria-pressed={filters.sub === item.slug}
                  onClick={() => update({ ...filters, sub: item.slug })}
                >
                  {item.nombre} <span className="num">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <p className="count" aria-live="polite" aria-atomic="true" style={{ margin: 0 }}>
            <b className="serif" style={{ fontSize: 20 }}>
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </b>
            <span className="xs"> en Mercado Libre · selección editorial</span>
            <span className="ex-flag" style={{ marginLeft: 10 }}>Productos y precios de ejemplo</span>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              className="mfbtn"
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="filtros-categoria"
              onClick={() => setFiltersOpen((value) => !value)}
            >
              Filtros{activeCount > 0 ? ` · ${activeCount}` : ""}
            </button>
            <span className="xs d-only">Ordenar por</span>
            <span className="fchip">Relevancia editorial</span>
          </div>
        </div>
        {note ? <p className="small" role="status">{note}</p> : null}
        <div className="pgrid3">
          {filtered.map((product, index) => (
            <span key={product.id} style={{ display: "contents" }}>
              {index === guideIndex ? <GuideCard /> : null}
              <MlCard product={product} />
            </span>
          ))}
          {filtered.length === 0 ? (
            <p className="empty" style={{ gridColumn: "1 / -1" }}>Ningún producto de ejemplo coincide con esos filtros.</p>
          ) : null}
        </div>
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
      <span className="ex-flag" style={{ marginTop: 16, background: "rgb(255 255 255 / 0.08)", borderColor: "rgb(196 165 116 / 0.5)", color: "#e6d3ae" }}>
        Texto de ejemplo
      </span>
      <Link className="link" href="/blog/proteina-despues-de-los-40" style={{ color: "var(--paper)", marginTop: "auto" }}>
        Leer la guía completa <IconArrow />
      </Link>
    </article>
  );
}
