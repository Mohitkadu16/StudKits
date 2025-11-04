import Script from 'next/script';
import { organizationSchema, websiteSchema, productCategoriesSchema, faqSchema } from '@/lib/schema';

export default function HomeSchemaData() {
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
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </>
  );
}