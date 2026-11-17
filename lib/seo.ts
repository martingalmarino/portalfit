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
  if (mid.length <= 47) return mid;
  const withGuide = `${nombre} en Argentina: guía`;
  return withGuide.length <= 47 ? withGuide : `${nombre} en Argentina`;
}

export function stageTitle(nombre: string): string {
  const titled = `${nombre}: suplementos según la edad`;
  return titled.length <= 48 ? titled : nombre;
}

/** Deja el <title> completo entre 50 y 60 caracteres, usando palabras que ya están en el título o la bajada. */
export function balanceTitle(title: string, absolute = false, description?: string): string {
  const suffix = ` | ${getSiteName()}`;
  const escaped = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const alreadyFull = absolute || title.endsWith(suffix);
  let base = (alreadyFull ? title.replace(new RegExp(`${escaped}$`), "") : title).replace(/\s+/g, " ").trim();
  let full = `${base}${suffix}`;
  if (full.length > 60) {
    const words = base.split(" ");
    while (words.length > 1 && `${words.join(" ")}${suffix}`.length > 60) words.pop();
    base = words.join(" ");
    full = `${base}${suffix}`;
  }
  if (full.length < 50 && description) {
    const words = description
      .replace(/[|]+/g, " ")
      .split(/\s+/)
      .map((word) => word.replace(/^[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+$/g, ""))
      .filter(Boolean);
    const extra: string[] = [];
    for (const word of words) {
      const nextBase = `${base}: ${[...extra, word].join(" ")}`;
      if (`${nextBase}${suffix}`.length > 60) break;
      extra.push(word);
      full = `${nextBase}${suffix}`;
      if (full.length >= 50) break;
    }
  }
  return full;
}

export function pageMetadata({ title, description, path, absoluteTitle, ogType = "website" }: MetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const indexing = allowsIndexing();
  const safeTitle = balanceTitle(publicCopy(title) ?? getSiteName(), absoluteTitle, publicCopy(description) ?? undefined);
  const safeDescription = publicCopy(description) ?? FALLBACK_DESCRIPTION;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: getSiteName() };
  return {
    title: { absolute: safeTitle },
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
