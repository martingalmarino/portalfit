import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("herramientas");

export const metadata = pageMetadata({
  title: "Herramientas y calculadoras del sitio",
  description: page.description,
  path: "/herramientas",
  absoluteTitle: page.absoluteTitle,
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
