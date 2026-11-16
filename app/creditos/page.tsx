import { Crumbs } from "@/components/ui/crumbs";
import { PHOTOS } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Créditos fotográficos",
  description: "Autores y páginas de Pexels de las fotografías ilustrativas de Portal FIT.",
  path: "/creditos",
});

export default function CreditosPage() {
  const photos = Object.entries(PHOTOS);
  return (
    <article className="sec" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <Crumbs items={[{ name: "Inicio", path: "/" }, { name: "Créditos", path: "/creditos" }]} />
        <div className="page-hero">
          <div className="kicker">Imágenes</div>
          <h1 className="h1">Créditos fotográficos</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 760 }}>
            Todas las fotos salen de Pexels (licencia Pexels: uso libre, comercial incluido, sin atribución obligatoria; se acredita igual). No se usó ninguna foto de producto de marcas reales: los envases que aparecen no tienen marca y se rotulan como foto ilustrativa.
          </p>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="credits">
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Autor</th>
                <th>Página</th>
              </tr>
            </thead>
            <tbody>
              {photos.map(([file, photo]) => (
                <tr key={file}>
                  <td><code>{file}</code></td>
                  <td>{photo.author}</td>
                  <td>
                    <a href={photo.page} target="_blank" rel="noreferrer">
                      {photo.credit}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small" style={{ marginTop: 18 }}>
          Licencia: <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">pexels.com/license</a>. Fotos descargadas el 16/11/2026 (hora de Argentina). El detalle de uso en el boceto está en el archivo de redacción <code>creditos.md</code>.
        </p>
      </div>
    </article>
  );
}
