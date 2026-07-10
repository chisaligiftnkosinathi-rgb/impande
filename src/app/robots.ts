import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://axionyx.co.za/sitemap.xml",
        host: "https://axionyx.co.za",
    };
}
