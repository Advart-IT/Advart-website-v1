import type { MetadataRoute } from "next";
import { SITE_URL as DOMAIN } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/aboutus`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/careers`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/contactus`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${DOMAIN}/terms-conditions`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${DOMAIN}/dot`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/works/beelittle`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${DOMAIN}/advartgen`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
