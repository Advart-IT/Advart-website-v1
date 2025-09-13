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
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
