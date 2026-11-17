import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("transparencia-afiliados");

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/transparencia-afiliados",
  absoluteTitle: page.absoluteTitle,
});

export default function TransparenciaPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Links de afiliado", path: "/transparencia-afiliados" },
      ]}
    />
  );
}
