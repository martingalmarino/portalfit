import Link from "next/link";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Crumbs({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav className="crumbs" aria-label="Miga de pan">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <span key={item.path} style={{ display: "contents" }}>
              {index > 0 ? <span aria-hidden>/</span> : null}
              {last ? (
                <span className="cur">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
