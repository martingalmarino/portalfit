"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconCaret, IconMenu, IconSearch } from "@/components/ui/icons";
import { Wordmark } from "@/components/ui/wordmark";
import type { NavData } from "@/lib/nav";
import { getSiteName } from "@/lib/site";

function sectionOf(path: string): string {
  if (path.startsWith("/categorias")) return "categorias";
  if (path.startsWith("/marcas")) return "marcas";
  if (path.startsWith("/etapas")) return "etapas";
  if (path.startsWith("/blog")) return "guias";
  if (path.startsWith("/como-evaluamos")) return "metodo";
  if (path.startsWith("/herramientas")) return "herramientas";
  return "";
}

export function SiteHeader({ nav }: { nav: NavData }) {
  const path = usePathname();
  const section = sectionOf(path);
  const searchRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setQuery("");
        searchRef.current?.showModal();
      }
      if (event.key === "Escape") {
        searchRef.current?.close();
        menuRef.current?.close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return nav.search.slice(0, 6);
    return nav.search.filter((item) => item.haystack.toLowerCase().includes(needle)).slice(0, 8);
  }, [nav.search, query]);

  return (
    <>
      <header className="hdr">
        <div className="wrap">
          <Wordmark />
          <nav className="nav" aria-label="Principal">
            <div className="nav-drop">
              <Link className={section === "categorias" ? "on" : ""} href="/categorias">
                Categorías <IconCaret />
              </Link>
              <div className="menu">
                {nav.categories.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                    <span className="xs">{item.meta}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav-drop">
              <Link className={section === "marcas" ? "on" : ""} href="/marcas">
                Marcas <IconCaret />
              </Link>
              <div className="menu">
                {nav.brands.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav-drop">
              <Link className={section === "etapas" ? "on" : ""} href="/etapas/30-39">
                Etapas de vida <IconCaret />
              </Link>
              <div className="menu">
                {nav.stages.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link className={section === "guias" ? "on" : ""} href="/blog">
              Guías
            </Link>
            <Link className={section === "metodo" ? "on" : ""} href="/como-evaluamos">
              Cómo evaluamos
            </Link>
            <Link className={section === "herramientas" ? "muted-item on" : "muted-item"} href="/herramientas">
              Herramientas <span className="soon">Próximamente</span>
            </Link>
          </nav>
          <div className="hdr-tools">
            <button
              className="search-btn"
              type="button"
              onClick={() => {
                setQuery("");
                searchRef.current?.showModal();
              }}
            >
              <IconSearch />
              Buscar en {getSiteName()}
              <kbd>/</kbd>
            </button>
            <Link className="btn btn-primary d-only" href="/#newsletter">
              Newsletter
            </Link>
            <button
              className="icon-btn"
              type="button"
              aria-label="Buscar"
              onClick={() => {
                setQuery("");
                searchRef.current?.showModal();
              }}
            >
              <IconSearch />
            </button>
            <button className="icon-btn" type="button" aria-label="Abrir menú" onClick={() => menuRef.current?.showModal()}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>
      <div className="m-nav" aria-label="Atajos">
        <Link className={section === "categorias" ? "on" : ""} href="/categorias">
          Categorías
        </Link>
        <Link className={section === "marcas" ? "on" : ""} href="/marcas">
          Marcas
        </Link>
        <Link className={section === "herramientas" ? "on" : ""} href="/herramientas" style={{ color: "var(--ink-3)" }}>
          Herramientas <span className="soon">Próximamente</span>
        </Link>
      </div>
      <dialog className="dialog" ref={searchRef} aria-labelledby={searchId} onClose={() => setQuery("")}>
        <div className="dialog-card">
          <h2 id={searchId} className="h4" style={{ marginTop: 0 }}>
            Buscar en {getSiteName()}
          </h2>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Marcas, categorías, etapas o guías"
            autoFocus
          />
          <div style={{ marginTop: 8 }}>
            {results.length === 0 ? <p className="small">Sin resultados para esa búsqueda.</p> : null}
            {results.map((item) => (
              <a
                key={item.href}
                className="search-hit"
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  searchRef.current?.close();
                  router.push(item.href);
                }}
              >
                <span>{item.title}</span>
                <span className="xs">{item.kind}</span>
              </a>
            ))}
          </div>
        </div>
      </dialog>
      <dialog className="dialog" ref={menuRef} aria-label="Menú">
        <div className="dialog-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong className="h4">Menú</strong>
            <button className="btn btn-ghost" type="button" onClick={() => menuRef.current?.close()} style={{ height: 36 }}>
              Cerrar
            </button>
          </div>
          <div className="menu" style={{ display: "grid", position: "static", width: "auto", boxShadow: "none", border: 0, padding: 0, maxHeight: "70vh" }}>
            <Link href="/categorias" onClick={() => menuRef.current?.close()}>Categorías</Link>
            {nav.categories.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => menuRef.current?.close()}>
                {item.label}
              </Link>
            ))}
            <Link href="/marcas" onClick={() => menuRef.current?.close()}>Marcas</Link>
            {nav.brands.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => menuRef.current?.close()}>
                {item.label}
              </Link>
            ))}
            {nav.stages.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => menuRef.current?.close()}>
                {item.label}
              </Link>
            ))}
            <Link href="/blog" onClick={() => menuRef.current?.close()}>Guías</Link>
            <Link href="/como-evaluamos" onClick={() => menuRef.current?.close()}>Cómo evaluamos</Link>
            <Link href="/herramientas" onClick={() => menuRef.current?.close()}>Herramientas</Link>
            <Link href="/transparencia-afiliados" onClick={() => menuRef.current?.close()}>Afiliados</Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
