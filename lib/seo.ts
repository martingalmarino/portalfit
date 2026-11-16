import type { Metadata } from "next";
import { allowsIndexing, absoluteUrl, getSiteName, getSiteUrl } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

export function pageMetadata({ title, description, path, absoluteTitle, ogType = "website" }: MetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const indexing = allowsIndexing();
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: indexing
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: ogType,
      locale: "es_AR",
      url: canonical,
      siteName: getSiteName(),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
