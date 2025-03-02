import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://impostorgram.vercel.app/",
      lastModified: new Date().toISOString(),
    },
  ];
}
