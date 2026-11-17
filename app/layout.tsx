import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter, UtilityBar } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { assertContentGraph } from "@/lib/content/load";
import { getNavData } from "@/lib/nav";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { absoluteUrl, getSiteName, getSiteUrl, robotsMetadata } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "optional",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  adjustFontFallback: true,
  preload: true,
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "optional",
  style: ["normal", "italic"],
  variable: "--font-source",
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: getSiteName(),
    template: `%s | ${getSiteName()}`,
  },
  description:
    "Guía independiente sobre suplementos, nutrición deportiva, longevidad y rendimiento en Argentina. Contenido informativo, no médico.",
  robots: robotsMetadata(),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: absoluteUrl("/"),
    siteName: getSiteName(),
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: getSiteName() }],
  },
  twitter: {
    card: "summary_large_image",
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  assertContentGraph();
  const nav = getNavData();
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body>
        <style>{`@media (max-width: 600px){.mhero{display:block}.hero{display:none}}`}</style>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <UtilityBar />
        <SiteHeader nav={nav} />
        <main id="contenido">{children}</main>
        <SiteFooter nav={nav} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
