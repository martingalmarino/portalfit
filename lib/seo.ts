import type { Metadata } from "next";
import { publicCopy } from "@/lib/format";
import { absoluteUrl, getSiteName, getSiteUrl, robotsMetadata } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

const FALLBACK_DESCRIPTION =
  "Contenido informativo sobre suplementos y nutrición deportiva en Argentina.";

function siteSuffix(): string {
  return ` | ${getSiteName()}`;
}

/** Arma el <title> completo, sin recortar palabras. */
export function withSiteTitle(title: string): string {
  const suffix = siteSuffix();
  const escaped = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const base = title.replace(new RegExp(`${escaped}$`), "").replace(/\s+/g, " ").trim();
  return `${base}${suffix}`;
}

/** Elige la primera frase completa que entra entre 45 y 65 caracteres. */
export function pickCompleteTitle(candidates: string[]): string {
  const fulls = candidates.map((item) => withSiteTitle(item));
  return (
    fulls.find((item) => item.length >= 45 && item.length <= 65) ??
    fulls.find((item) => item.length <= 65) ??
    fulls[fulls.length - 1]
  );
}

export function categoryTitle(nombre: string): string {
  return pickCompleteTitle([
    `${nombre} en Argentina: tipos, marcas y guía`,
    `${nombre}: marcas y guía en Argentina`,
    `${nombre} en Argentina: guía`,
    `${nombre} en Argentina`,
    nombre,
  ]);
}

export function stageTitle(nombre: string): string {
  return pickCompleteTitle([
    `${nombre}: suplementos según la edad`,
    `${nombre}: suplementos`,
    nombre,
  ]);
}

export function brandTitle(name: string, metaTitle: string): string {
  return pickCompleteTitle([
    metaTitle,
    `${name}: historia, productos y dónde comprar`,
    `${name}: historia y dónde comprar`,
    `${name}: productos y dónde comprar`,
    `${name}: dónde comprar`,
  ]);
}

export function pageMetadata({ title, description, path, ogType = "website" }: MetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const safeTitle = withSiteTitle(publicCopy(title) ?? getSiteName());
  const safeDescription = publicCopy(description) ?? FALLBACK_DESCRIPTION;
  const image = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: getSiteName() };
  return {
    title: { absolute: safeTitle },
    description: safeDescription,
    alternates: { canonical },
    robots: robotsMetadata(),
    openGraph: {
      type: ogType,
      locale: "es_AR",
      url: canonical,
      siteName: getSiteName(),
      title: safeTitle,
      description: safeDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [image.url],
    },
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.flatMap((item) => {
      const name = publicCopy(item.q);
      const text = publicCopy(item.a);
      if (!name || !text) return [];
      return [{ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }];
    }),
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  const name = getSiteName();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    description:
      "Guía independiente sobre suplementos y nutrición deportiva en Argentina. Contenido informativo, no médico.",
  };
}

export function websiteJsonLd() {
  const name = getSiteName();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    inLanguage: "es-AR",
    publisher: { "@type": "Organization", name, url },
  };
}

export function webPageJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const site = getSiteName();
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "es-AR",
    isPartOf: { "@type": "WebSite", name: site, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: site, url: absoluteUrl("/") },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(name: string, path: string, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
