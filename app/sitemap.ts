import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://impostorgram.my.id",
      lastModified: new Date().toISOString(),
    },
  ];
}
