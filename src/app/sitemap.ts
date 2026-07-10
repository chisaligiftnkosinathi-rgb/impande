import type { MetadataRoute } from "next";

const baseUrl = "https://axionyx.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/about",
        "/research",
        "/research/enrm",
        "/research/chemist",
        "/research/ecoist",
        "/research/future-programmes",
        "/publications",
        "/software",
        "/open-science",
        "/partners",
        "/news",
        "/contact",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route.startsWith("/research") ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
    }));
}
