import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("terminos");

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/terminos",
  absoluteTitle: page.absoluteTitle,
});

export default function TerminosPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Términos", path: "/terminos" },
      ]}
    />
  );
}
