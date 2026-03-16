export default function StructuredData() {
  // Organization/Real Estate Agent Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Temer Properties",
    description:
      "Premium real estate developer in Addis Ababa, Ethiopia. Trusted by 10,000+ residents for luxury apartments, villas, and condos.",
    url: "https://temerproperties.com",
    telephone: "+251-913-455-624",
    email: "info@temerpropertiessales.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bole Road, Atlas Area",
      addressLocality: "Addis Ababa",
      addressRegion: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.0192",
      longitude: "38.7525",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Addis Ababa",
        description: "Capital city of Ethiopia",
      },
      {
        "@type": "Place",
        name: "Ayat",
        description: "Premium residential area in Addis Ababa",
      },
      {
        "@type": "Place",
        name: "Bole",
        description: "Business district in Addis Ababa",
      },
      {
        "@type": "Place",
        name: "CMC",
        description: "Growing residential area in Addis Ababa",
      },
      {
        "@type": "Place",
        name: "Kazanchis",
        description: "Historic area in Addis Ababa",
      },
      {
        "@type": "Place",
        name: "Old Airport",
        description: "Prime location in Addis Ababa",
      },
      {
        "@type": "Place",
        name: "Summit",
        description: "Exclusive area in Addis Ababa",
      },
    ],
    foundingDate: "2015",
    numberOfEmployees: "50+",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "320",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://facebook.com/temerproperties",
      "https://instagram.com/temerproperties",
      "https://t.me/benimak7",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "RealEstateListing",
          name: "Luxury Properties in Addis Ababa",
          description: "Premium residential and commercial properties",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Addis Ababa",
            addressCountry: "ET",
          },
        },
      },
    ],
  };

  // WebSite Schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Temer Properties",
    alternateName: "Temer Real Estate",
    url: "https://temerproperties.com",
    description:
      "Find luxury apartments, villas, and condos in Addis Ababa, Ethiopia. Premium real estate services.",
    publisher: {
      "@type": "Organization",
      name: "Temer Properties",
      url: "https://temerproperties.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://temerproperties.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Real Estate Properties",
      description: "Available properties in Addis Ababa",
      numberOfItems: "500+",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Luxury Villas in Ayat",
          description: "Premium villas with modern amenities",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Modern Apartments in Bole",
          description: "Contemporary apartments in prime location",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Family Homes in CMC",
          description: "Spacious homes for families",
        },
      ],
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://temerproperties.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Real Estate",
        item: "https://temerproperties.com/addis-ababa-real-estate",
      },
    ],
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Temer Properties",
    description:
      "Real estate agency specializing in luxury properties in Addis Ababa",
    url: "https://temerproperties.com",
    telephone: "+251-913-455-624",
    email: "info@temerpropertiessales.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bole Road, Atlas Area",
      addressLocality: "Addis Ababa",
      addressRegion: "Addis Ababa",
      postalCode: "1000",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.0192",
      longitude: "38.7525",
    },
    openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-17:00",
    priceRange: "$$$$",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    currenciesAccepted: "ETB",
    areaServed: "Addis Ababa, Ethiopia",
  };

  // RealEstateListing Schema
  const realEstateListingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "Premium Properties in Addis Ababa",
    description:
      "Luxury real estate listings including apartments, villas, and homes in Addis Ababa",
    url: "https://temerproperties.com",
    datePosted: "2024-01-01",
    listingType: "ForSale",
    provider: {
      "@type": "RealEstateAgent",
      name: "Temer Properties",
      telephone: "+251-913-455-624",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    numberOfAvailableListings: "500+",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "150000",
      highPrice: "2000000",
      priceCurrency: "USD",
      offerCount: "500+",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateListingSchema),
        }}
      />
    </>
  );
}
