import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingAllowed } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl("/sitemap.xml");
  if (!isIndexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" }, sitemap };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap };
}
