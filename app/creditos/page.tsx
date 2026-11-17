import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("creditos");

export const metadata = pageMetadata({
  title: "Créditos fotográficos de las imágenes",
  description: page.description,
  path: "/creditos",
  absoluteTitle: page.absoluteTitle,
});

export default function CreditosPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Créditos", path: "/creditos" },
      ]}
    />
  );
}
