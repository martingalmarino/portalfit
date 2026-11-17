import { TextPage } from "@/components/content/text-page";
import { loadTextPage } from "@/lib/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = loadTextPage("privacidad");

export const metadata = pageMetadata({
  title: "Política de privacidad de este sitio",
  description: page.description,
  path: "/privacidad",
  absoluteTitle: page.absoluteTitle,
});

export default function PrivacidadPage() {
  return (
    <TextPage
      page={page}
      crumbs={[
        { name: "Inicio", path: "/" },
        { name: "Privacidad", path: "/privacidad" },
      ]}
    />
  );
}
