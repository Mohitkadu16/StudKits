import Script from 'next/script';
import { organizationSchema, websiteSchema, productCategoriesSchema } from '@/lib/schema';

interface PageSchemaProps {
  faqSchema?: any;
  howToSchema?: any;
}

export function PageSchema({ faqSchema, howToSchema }: PageSchemaProps) {
  return (
    <>
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>
      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </Script>
      <Script id="products-schema" type="application/ld+json">
        {JSON.stringify(productCategoriesSchema)}
      </Script>
      
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>
      )}
      
      {howToSchema && (
        <Script id="howto-schema" type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </Script>
      )}
    </>
  );
}
