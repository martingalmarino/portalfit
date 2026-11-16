import type { Metadata } from "next";
import { publicCopy } from "@/lib/format";
import { allowsIndexing, absoluteUrl, getSiteName, getSiteUrl } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

const FALLBACK_DESCRIPTION =
  "Contenido informativo sobre suplementos y nutrición deportiva en Argentina.";

export function categoryTitle(nombre: string): string {
  if (nombre.length <= 16) return `${nombre} en Argentina: tipos, marcas y guía`;
  const mid = `${nombre}: marcas y guía en Argentina`;
  return mid.length <= 47 ? mid : `${nombre} en Argentina`;
}

export function stageTitle(nombre: string): string {
  const titled = `${nombre}: suplementos según la edad`;
  return titled.length <= 48 ? titled : nombre;
}

export function pageMetadata({ title, description, path, absoluteTitle, ogType = "website" }: MetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const indexing = allowsIndexing();
  const safeTitle = publicCopy(title) ?? getSiteName();
  const safeDescription = publicCopy(description) ?? FALLBACK_DESCRIPTION;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: getSiteName() };
  return {
    title: absoluteTitle ? { absolute: safeTitle } : safeTitle,
    description: safeDescription,
    alternates: { canonical },
    robots: indexing
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
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
