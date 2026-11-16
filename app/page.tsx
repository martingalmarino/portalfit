import { HomeView } from "@/components/home/home-view";
import { JsonLd } from "@/components/ui/json-ld";
import { loadHome } from "@/lib/content/load";
import { applyPlaceholders } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const home = loadHome();
  return pageMetadata({
    title: applyPlaceholders(home.meta.title),
    description: applyPlaceholders(home.meta.description),
    path: "/",
    absoluteTitle: true,
  });
}

export default function HomePage() {
  const home = loadHome();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: home.faq.map((item) => ({
      "@type": "Question",
      name: applyPlaceholders(item.q),
      acceptedAnswer: { "@type": "Answer", text: applyPlaceholders(item.a) },
    })),
  };
  return (
    <>
      <JsonLd data={faq} />
      <HomeView />
    </>
  );
}
