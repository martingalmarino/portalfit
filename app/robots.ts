import type { MetadataRoute } from "next";
import { allowsIndexing, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowsIndexing()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
