import { Metadata } from "next";
import { generateMetadata, SEOConfig } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Home, Building, TrendingUp } from "lucide-react";

export const metadata = generateMetadata({
  title: "Addis Ababa Real Estate | Premium Properties & Homes",
  description:
    "Find exceptional real estate in Addis Ababa with Temer Properties. Luxury homes, apartments, and investment properties in Ethiopia's capital city.",
  keywords: [
    "Addis Ababa real estate",
    "real estate Addis Ababa",
    "properties Addis Ababa",
    "homes for sale Addis Ababa",
    "apartments Addis Ababa",
    "real estate company Addis Ababa",
  ],
  canonical: "https://temerproperties.com/addis-ababa-real-estate",
  openGraph: {
    title: "Addis Ababa Real Estate | Premium Properties & Homes",
    description:
      "Find exceptional real estate in Addis Ababa with Temer Properties. Luxury homes, apartments, and investment properties in Ethiopia's capital city.",
    type: "website",
    images: [
      {
        url: "/images/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Addis Ababa real estate properties by Temer Properties",
      },
    ],
  },
} as SEOConfig);

export default function AddisAbabaRealEstatePage() {
  const neighborhoods = [
    {
      name: "Bole",
      description:
        "Premium business district with modern apartments and commercial properties",
      properties: 45,
      avgPrice: "$250,000",
    },
    {
      name: "Ayat",
      description:
        "Upscale residential area with luxury villas and family homes",
      properties: 32,
      avgPrice: "$380,000",
    },
    {
      name: "CMC",
      description:
        "Growing neighborhood with affordable housing and investment opportunities",
      properties: 28,
      avgPrice: "$180,000",
    },
    {
      name: "Kazanchis",
      description:
        "Historic area with renovated properties and cultural significance",
      properties: 19,
      avgPrice: "$220,000",
    },
    {
      name: "Old Airport",
      description:
        "Prime location with modern developments and excellent infrastructure",
      properties: 36,
      avgPrice: "$320,000",
    },
    {
      name: "Summit",
      description:
        "Exclusive area with luxury properties and panoramic city views",
      properties: 24,
      avgPrice: "$450,000",
    },
  ];

  const propertyTypes = [
    {
      icon: Building,
      title: "Luxury Apartments",
      description:
        "Modern apartments in prime locations with premium amenities",
      features: ["City Views", "Gym & Pool", "24/7 Security", "Parking"],
    },
    {
      icon: Home,
      title: "Family Homes",
      description:
        "Spacious homes perfect for families in residential neighborhoods",
      features: ["Garden", "Multiple Bedrooms", "Garage", "Schools Nearby"],
    },
    {
      icon: TrendingUp,
      title: "Investment Properties",
      description:
        "High ROI properties for both rental income and appreciation",
      features: [
        "High Yield",
        "Prime Location",
        "Growing Demand",
        "Easy Financing",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <header className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Addis Ababa Real Estate
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover premium properties in Ethiopia's vibrant capital. From
              luxury apartments in Bole to family homes in Ayat, find your
              perfect property with Temer Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#properties"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Contact Experts
              </Link>
            </div>
          </header>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section id="properties" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Prime Neighborhoods in Addis Ababa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the most sought-after neighborhoods for real estate
              investment and living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {neighborhood.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {neighborhood.description}
                    </p>
                  </div>
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Properties</p>
                    <p className="font-semibold">{neighborhood.properties}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Avg Price</p>
                    <p className="font-semibold">{neighborhood.avgPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Property Types in Addis Ababa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of property types tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-sm text-muted-foreground"
                      >
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Ready to Find Your Dream Property in Addis Ababa?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our expert real estate agents are here to help you find the
              perfect property that meets your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:info@temerpropertiessales.com"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Email Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="tel:+251913455624"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Call +251 913 455 624
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
