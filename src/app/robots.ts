import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = absoluteUrl("");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/play/", // Protect private user-generated quizzes from indexing
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
