export function generateProjectStructuredData(project: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.title,
    description: project.longDescription,
    image: project.image,
    category: project.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      url: `https://studkits.shop/projects/${project.id}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'StudKits',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'StudKits',
      url: 'https://studkits.shop',
    },
    additionalProperty: project.features.map((feature: string) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
  };
}