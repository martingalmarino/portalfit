import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("contacto");

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: "/contacto",
  absoluteTitle: page.absoluteTitle,
});

export default function ContactoPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Contacto", path: "/contacto" },
      ]}
    />
  );
}
