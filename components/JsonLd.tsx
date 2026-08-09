import { company } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    alternateName: company.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}${company.logo}`,
    image: `${SITE_URL}/images/banner-01.png`,
    description: company.description,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["Dubai", "Abu Dhabi", "UAE", "GCC"],
    sameAs: [company.whatsapp],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

type ProductJsonLdProps = {
  name: string;
  description: string;
  image: string;
  url: string;
};

export function ProductJsonLd({ name, description, image, url }: ProductJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: company.name,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
