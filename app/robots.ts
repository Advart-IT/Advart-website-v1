import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "https://advartit.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      "https://www.advartit.in/sitemap.xml",
      "https://www.advartit.in/advartgen/sitemap.xml",
    ],
    host: domain,
  };
}
