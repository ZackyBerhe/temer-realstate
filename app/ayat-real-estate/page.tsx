import { Metadata } from 'next'
import { generateMetadata, SEOConfig } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Home, Building, Trees, Car } from 'lucide-react'

export const metadata = generateMetadata({
  title: 'Ayat Real Estate | Luxury Homes & Properties for Sale',
  description: 'Discover premium properties in Ayat, Addis Ababa. Temer Properties offers luxury homes, villas, and investment opportunities in this prime residential area.',
  keywords: [
    'Ayat real estate',
    'Ayat properties',
    'homes for sale Ayat',
    'Ayat homes',
    'luxury homes Ayat',
    'villas Ayat Addis Ababa'
  ],
  canonical: 'https://temerproperties.com/ayat-real-estate',
  openGraph: {
    title: 'Ayat Real Estate | Luxury Homes & Properties for Sale',
    description: 'Discover premium properties in Ayat, Addis Ababa. Temer Properties offers luxury homes, villas, and investment opportunities in this prime residential area.',
    type: 'website',
    images: [{
      url: '/images/hero-2.jpg',
      width: 1200,
      height: 630,
      alt: 'Luxury homes in Ayat by Temer Properties'
    }]
  }
} as SEOConfig)

export default function AyatRealEstatePage() {
  const propertyFeatures = [
    {
      icon: Home,
      title: 'Luxury Villas',
      description: 'Spacious villas with modern amenities and beautiful architecture',
      features: ['4-6 Bedrooms', 'Private Garden', 'Swimming Pool', 'Garage for 2+ Cars']
    },
    {
      icon: Building,
      title: 'Modern Apartments',
      description: 'Contemporary apartments with premium facilities and city views',
      features: ['2-4 Bedrooms', 'Balcony/Terrace', '24/7 Security', 'Gym & Pool']
    },
    {
      icon: Trees,
      title: 'Green Living',
      description: 'Eco-friendly properties surrounded by green spaces and parks',
      features: ['Garden Spaces', 'Tree-lined Streets', 'Parks Nearby', 'Clean Air']
    }
  ]

  const ayatAdvantages = [
    {
      title: 'Prime Location',
      description: 'Strategically located with easy access to Bole, CMC, and city center',
      icon: MapPin
    },
    {
      title: 'Excellent Infrastructure',
      description: 'Well-developed roads, utilities, and public services',
      icon: Building
    },
    {
      title: 'Educational Hub',
      description: 'Near top international schools and universities',
      icon: Home
    },
    {
      title: 'Growing Value',
      description: 'Rapidly appreciating property values and high investment returns',
      icon: Car
    }
  ]

  const availableProperties = [
    {
      title: 'Luxury Villa in Ayat',
      price: '$450,000',
      bedrooms: 5,
      bathrooms: 4,
      area: '450 sqm',
      description: 'Stunning 5-bedroom villa with private pool and garden'
    },
    {
      title: 'Modern Family Home',
      price: '$380,000',
      bedrooms: 4,
      bathrooms: 3,
      area: '320 sqm',
      description: 'Beautiful family home with modern amenities'
    },
    {
      title: 'Premium Apartment',
      price: '$280,000',
      bedrooms: 3,
      bathrooms: 2,
      area: '180 sqm',
      description: 'Spacious apartment with great city views'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Ayat Real Estate
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover luxury homes and premium properties in Ayat, Addis Ababa's most 
              prestigious residential area. Experience elegant living with Temer Properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#properties"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Schedule Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ayat */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Why Choose Ayat for Your Dream Home?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ayat offers the perfect blend of luxury, convenience, and investment potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ayatAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section id="properties" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Premium Property Types in Ayat
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our exclusive collection of luxury properties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {propertyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground">
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Featured Properties in Ayat
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury properties currently available in Ayat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {availableProperties.map((property, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Home className="w-16 h-16 text-primary/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {property.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {property.price}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {property.description}
                  </p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Find Your Luxury Home in Ayat Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Ayat real estate experts are ready to help you find the perfect luxury property 
              that matches your lifestyle and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="mailto:info@temerpropertiessales.com"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Email Ayat Expert
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
  )
}
