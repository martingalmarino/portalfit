import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/article-view";
import { JsonLd } from "@/components/ui/json-ld";
import { getPost, getPublishedPosts } from "@/lib/content/load";
import { applyPlaceholders } from "@/lib/format";
import { photoByFile } from "@/lib/photos";
import { faqJsonLd, pageMetadata, pickCompleteTitle } from "@/lib/seo";
import { absoluteUrl, getSiteName } from "@/lib/site";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

const POST_TITLES: Record<string, string> = {
  "suplementos-sistema-abcd-ais": "Sistema ABCD del AIS: evidencia de suplementos",
  "marcas-suplementos-argentinas": "Marcas argentinas: historia y fabricación",
};

function documentTitle(slug: string, metaTitle: string): string {
  const replaced = applyPlaceholders(metaTitle).replace(/\s+/g, " ").trim();
  return pickCompleteTitle([replaced, POST_TITLES[slug] ?? replaced]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: documentTitle(slug, post.metaTitle),
      description: post.description,
      path: `/blog/${slug}`,
      absoluteTitle: true,
      ogType: "article",
      image: post.cover
        ? {
            path: post.cover.og,
            width: post.cover.ogWidth,
            height: post.cover.ogHeight,
            alt: post.cover.alt,
          }
        : undefined,
    }),
    keywords: post.keyword,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.h1,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es-AR",
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: getSiteName(), url: absoluteUrl("/") },
  };
  if (post.cover) {
    article.image = {
      "@type": "ImageObject",
      url: absoluteUrl(post.cover.src),
      width: post.cover.width,
      height: post.cover.height,
      caption: post.cover.alt,
    };
  } else if (post.image) {
    article.image = absoluteUrl(photoByFile(post.image).src);
  }
  const faq = faqJsonLd(post.faq);
  return (
    <>
      <JsonLd data={article} />
      {post.faq.length > 0 ? <JsonLd data={faq} /> : null}
      <ArticleView post={post} />
    </>
  );
}
