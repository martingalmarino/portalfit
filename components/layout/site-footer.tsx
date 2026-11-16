import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { ContactEmail } from "@/components/ui/contact-email";
import { Wordmark } from "@/components/ui/wordmark";
import { contentUpdatedLabel } from "@/lib/content/load";
import { formatContentDate } from "@/lib/format";
import { MICROCOPY } from "@/lib/microcopy";
import type { NavData } from "@/lib/nav";
import { contactEmailDomain, contactEmailUser, getSiteName } from "@/lib/site";

export function UtilityBar() {
  const updated = formatContentDate(contentUpdatedLabel());
  return (
    <div className="util">
      <div className="wrap">
        <div>
          Contenido informativo, <b>no médico</b>
          <span className="sep">·</span>
          Datos con fuente y fecha
          <span className="sep d-only">·</span>
          <span className="d-only">Actualizado {updated}</span>
        </div>
        <div className="r">
          {MICROCOPY.barra}
          <span className="sep">·</span>
          <Link href="/transparencia-afiliados">{MICROCOPY.barraLink}</Link>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter({ nav }: { nav: NavData }) {
  const year = contentUpdatedLabel().slice(0, 4);
  const name = getSiteName();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <div>
            <Wordmark />
            <p className="serif it" style={{ marginTop: 22, fontWeight: 300, fontSize: 26, lineHeight: 1.25, color: "#ede7da", maxWidth: 420 }}>
              Suplementos y nutrición deportiva en Argentina, explicados con evidencia.
            </p>
            <div id="newsletter">
              <NewsletterForm />
            </div>
            <p className="xs" style={{ color: "#8f8a7f", marginTop: 12 }}>
              Una guía por semana. Sin promesas, sin spam. Podés darte de baja cuando quieras.
            </p>
          </div>
          <div className="cols">
            <div>
              <h2>Categorías</h2>
              <ul>
                {nav.categories.slice(0, 8).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/categorias" style={{ color: "var(--brass)" }}>
                    Ver las {nav.categories.length} →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Marcas</h2>
              <ul>
                {nav.brands.slice(0, 8).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/marcas" style={{ color: "var(--brass)" }}>
                    Ver las {nav.brands.length} →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Etapas de vida</h2>
              <ul>
                {nav.stages.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{name}</h2>
              <ul>
                <li>
                  <Link href="/como-evaluamos">Cómo evaluamos la evidencia</Link>
                </li>
                <li>
                  <Link href="/como-evaluamos#politica">Política editorial</Link>
                </li>
                <li>
                  <Link href="/transparencia-afiliados">{MICROCOPY.pieEnlace}</Link>
                </li>
                <li>
                  <Link href="/contacto">Contacto</Link>
                </li>
                <li>
                  <Link href="/herramientas">
                    Herramientas <span className="soon">Próximamente</span>
                  </Link>
                </li>
                <li>
                  <Link href="/creditos">Créditos fotográficos</Link>
                </li>
                <li>
                  <Link href="/blog">Guías</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="legal">
          <p>{MICROCOPY.avisoLegal}</p>
          <p>{MICROCOPY.pieBloque}</p>
        </div>
        <div className="bottom">
          <span>
            © {year} {name} · <Link href="/terminos">Términos</Link> · <Link href="/privacidad">Privacidad</Link> ·{" "}
            <Link href="/sitemap.xml">Mapa del sitio</Link>
            <span className="sep">·</span>
            <ContactEmail user={contactEmailUser()} domain={contactEmailDomain()} />
          </span>
          <span>Fotos de Pexels · <Link href="/creditos">ver créditos</Link></span>
        </div>
      </div>
    </footer>
  );
}
