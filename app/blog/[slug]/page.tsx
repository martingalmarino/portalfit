import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/article-view";
import { JsonLd } from "@/components/ui/json-ld";
import { getPost, loadPosts } from "@/lib/content/load";
import { applyPlaceholders, hasPendingToken } from "@/lib/format";
import { photoByFile } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteName } from "@/lib/site";

export function generateStaticParams() {
  return loadPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    ogType: "article",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const photo = photoByFile(post.image);
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es-AR",
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    image: absoluteUrl(photo.src),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: getSiteName(), url: absoluteUrl("/") },
  };
  if (!hasPendingToken(post.reviewer)) {
    article.reviewedBy = { "@type": "Person", name: post.reviewer };
  }
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: applyPlaceholders(item.q),
      acceptedAnswer: { "@type": "Answer", text: applyPlaceholders(item.a) },
    })),
  };
  return (
    <>
      <JsonLd data={article} />
      {post.faq.length > 0 ? <JsonLd data={faq} /> : null}
      <ArticleView post={post} />
    </>
  );
}
