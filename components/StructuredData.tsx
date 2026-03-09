export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Temer Properties",
    description:
      "Premium real estate developer in Addis Ababa, Ethiopia. Trusted by 10,000+ residents for luxury apartments, villas, and condos.",
    url: "https://temerproperties.com",
    telephone: "+251-911-123-456",
    email: "info@temerpropertiessales.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bole Road, Atlas Area",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.0192",
      longitude: "38.7525",
    },
    areaServed: {
      "@type": "City",
      name: "Addis Ababa",
    },
    foundingDate: "2015",
    numberOfEmployees: "50+",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "320",
      bestRating: "5",
    },
    sameAs: [
      "https://facebook.com/temerproperties",
      "https://instagram.com/temerproperties",
      "https://t.me/temerproperties",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Temer Properties",
    url: "https://temerproperties.com",
    description:
      "Find luxury apartments, villas, and condos in Addis Ababa, Ethiopia.",
    publisher: {
      "@type": "Organization",
      name: "Temer Properties",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
    </>
  );
}
