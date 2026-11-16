import { Crumbs } from "@/components/ui/crumbs";
import { pageMetadata } from "@/lib/seo";
import { getDomainLabel, getSiteName } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacidad",
  description: "Qué datos trata Portal FIT en esta etapa y cuáles no se guardan.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  const name = getSiteName();
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap prose-page">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Privacidad", path: "/privacidad" }]} />
        <div className="page-hero">
          <div className="kicker">Legal</div>
          <h1 className="h1">Privacidad</h1>
          <p className="small">Texto informativo de la etapa 1. Razón social: <span className="pend">Pendiente</span>. Dominio: {getDomainLabel()}.</p>
        </div>
        <p>
          {name} es un sitio estático. No hay cuenta de usuario ni panel de suscripción activo. El formulario de la guía semanal no guarda el correo: muestra un aviso y no lo envía a ninguna lista.
        </p>
        <p>
          Las páginas pueden registrar, en el hosting, datos técnicos habituales de una visita (por ejemplo la dirección IP en registros del servidor de Vercel). No los usamos para perfilar personas ni los vendemos.
        </p>
        <p>
          Los botones de Mercado Libre te llevan a ese sitio. A partir de ahí rige la política de Mercado Libre, no esta. Los enlaces de compartir (WhatsApp, LinkedIn, X) también salen de {name}.
        </p>
        <p>
          No hay cookies propias de analítica en esta etapa. Si más adelante se suman, esta página lo va a decir antes de activarlas.
        </p>
        <p>
          Para pedir acceso, corrección o eliminación de un dato personal, el canal de contacto está <span className="pend">Pendiente</span>. No publicamos un correo inventado.
        </p>
      </div>
    </article>
  );
}
