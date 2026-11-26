import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("herramientas");

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/herramientas",
  noindex: true,
});

export default function HerramientasPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Herramientas", path: "/herramientas" },
      ]}
    />
  );
}
