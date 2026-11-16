"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AffiliateNotice } from "@/components/ui/affiliate-notice";
import { MlCard } from "@/components/ui/ml-card";
import { IconArrow } from "@/components/ui/icons";
import { blockHasAffiliate } from "@/lib/affiliates/notice";
import type { AffiliateProduct } from "@/lib/affiliates/types";
import { MICROCOPY } from "@/lib/microcopy";

type Option = { slug: string; nombre: string };

type Filters = {
  sub: string;
  brands: string[];
  rne: boolean;
};

const EMPTY: Filters = { sub: "todas", brands: [], rne: false };

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
  showGuide,
}: {
  products: AffiliateProduct[];
  subcategorias: Option[];
  marcas: Option[];
  showGuide: boolean;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
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
      if (filters.rne && !product.rneVerificado) return false;
      return true;
    });
  }, [products, filters]);

  if (products.length === 0) {
    return (
      <div className="empty-cat">
        <h2 className="h3">{MICROCOPY.categoriaVacia}</h2>
        <p className="small">Mientras tanto podés leer las guías o mirar las marcas de la categoría.</p>
        <div className="cats-chips" style={{ marginTop: 16 }}>
          <Link className="cchip" href="/blog">
            Guías
          </Link>
          {marcas.map((marca) => (
            <Link className="cchip" href={`/marcas/${marca.slug}`} key={marca.slug}>
              {marca.nombre}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const unfiltered = filters.sub === "todas" && filters.brands.length === 0 && !filters.rne;
  const guideIndex = showGuide && unfiltered ? Math.min(4, filtered.length) : -1;
  const activeCount = filters.brands.length + (filters.rne ? 1 : 0) + (filters.sub !== "todas" ? 1 : 0);

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
              onClick={() => update(EMPTY)}
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
          <fieldset className="sg" style={{ border: 0 }}>
            <legend className="kicker">Registros</legend>
            <label className={filters.rne ? "cb on" : "cb"}>
              <input
                type="checkbox"
                checked={filters.rne}
                onChange={() => update({ ...filters, rne: !filters.rne })}
              />
              <span className="box" aria-hidden="true">{filters.rne ? "✓" : ""}</span>
              {MICROCOPY.filtroRne}
            </label>
          </fieldset>
        </div>
        <p className="small" style={{ marginTop: 16 }}>
          <Link href="/etapas">Ver etapas de vida</Link>
        </p>
        <div className="sguide">
          <div className="kicker light">Herramienta</div>
          <b className="h4" style={{ display: "block", marginTop: 10 }}>Calculadora de proteína diaria</b>
          <p className="xs" style={{ color: "#b9b3a5" }}>Un rango orientativo de proteína por día según tu peso y tu nivel de entrenamiento.</p>
          <Link className="soon" href="/herramientas/proteina-diaria" style={{ marginTop: 14, display: "inline-block", color: "var(--brass)" }}>
            Próximamente
          </Link>
        </div>
      </aside>
      <div>
        <h2 className="sr-only">Productos de la categoría</h2>
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
        <div className="pgrid3">
          {filtered.map((product, index) => (
            <span key={product.id} style={{ display: "contents" }}>
              {index === guideIndex ? <GuideCard /> : null}
              <MlCard product={product} />
            </span>
          ))}
          {filtered.length === 0 ? (
            <div className="empty" style={{ gridColumn: "1 / -1" }}>
              <p>Ningún producto coincide con esos filtros.</p>
              <button className="btn btn-ghost" type="button" style={{ marginTop: 14 }} onClick={() => update(EMPTY)}>
                Limpiar filtros
              </button>
            </div>
          ) : null}
        </div>
        <AffiliateNotice text={MICROCOPY.bloqueListado} show={blockHasAffiliate(filtered)} />
      </div>
    </div>
  );
}

function GuideCard() {
  return (
    <article className="gins">
      <div className="kicker light">Guía rápida</div>
      <p className="gq">{MICROCOPY.guiaPregunta}</p>
      <p style={{ color: "#c9c3b5", fontSize: 15 }}>{MICROCOPY.guiaTexto}</p>
      <a className="link" href={MICROCOPY.guiaFuenteUrl} target="_blank" rel="noreferrer" style={{ color: "var(--paper)", marginTop: "auto" }}>
        {MICROCOPY.guiaFuente} <IconArrow />
      </a>
    </article>
  );
}
