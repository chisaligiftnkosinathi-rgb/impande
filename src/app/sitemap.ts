import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iphande.co.za';

  const routes = [
    '',
    '/discover/what-is-axionyx',
    '/discover/programmes',
    '/discover/publications',
    '/discover/software',
    '/discover/data-evidence',
    '/trust/standards',
    '/trust/certification',
    '/trust/provenance',
    '/trust/verification',
    '/solutions/certified-products',
    '/solutions/licensed-technology',
    '/solutions/partnerships',
    '/participate/open-science',
    '/participate/communities',
    '/participate/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
