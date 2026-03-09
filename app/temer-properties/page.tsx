import { Metadata } from 'next'
import { generateMetadata, SEOConfig } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight, Award, Building, Users, TrendingUp, Shield } from 'lucide-react'

export const metadata = generateMetadata({
  title: 'Temer Properties | Trusted Real Estate Company in Addis Ababa',
  description: 'Temer Properties is Addis Ababa\'s most trusted real estate company. Premium properties, expert service, and successful investments since 2015.',
  keywords: [
    'Temer Properties',
    'Temer Real Estate',
    'Temer Property Sales',
    'Temer Properties Sales',
    'Temer Realstate',
    'Temer Real Estate Addis Ababa',
    'Tamer Real Estate'
  ],
  canonical: 'https://temerproperties.com/temer-properties',
  openGraph: {
    title: 'Temer Properties | Trusted Real Estate Company in Addis Ababa',
    description: 'Temer Properties is Addis Ababa\'s most trusted real estate company. Premium properties, expert service, and successful investments since 2015.',
    type: 'website',
    images: [{
      url: '/images/Logo.jpg',
      width: 1200,
      height: 630,
      alt: 'Temer Properties - Trusted Real Estate Company'
    }]
  }
} as SEOConfig)

export default function TemerPropertiesPage() {
  const companyStats = [
    {
      number: '500+',
      label: 'Properties Sold',
      description: 'Successfully completed property transactions'
    },
    {
      number: '9+',
      label: 'Years Experience',
      description: 'Serving Addis Ababa real estate market since 2015'
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      description: 'Happy clients who recommend our services'
    },
    {
      number: '6',
      label: 'Prime Neighborhoods',
      description: 'Expert coverage of Addis Ababa\'s best areas'
    }
  ]

  const services = [
    {
      icon: Building,
      title: 'Property Sales',
      description: 'Buy and sell residential and commercial properties with expert guidance',
      features: ['Free Valuation', 'Market Analysis', 'Legal Support', 'Negotiation']
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Strategic real estate investment advice with high ROI opportunities',
      features: ['ROI Analysis', 'Market Trends', 'Portfolio Management', 'Risk Assessment']
    },
    {
      icon: Users,
      title: 'Property Management',
      description: 'Comprehensive property management services for landlords and investors',
      features: ['Tenant Screening', 'Rent Collection', 'Maintenance', 'Legal Compliance']
    }
  ]

  const neighborhoods = [
    'Bole', 'Ayat', 'CMC', 'Kazanchis', 'Old Airport', 'Summit'
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Knowledge',
      description: 'Deep understanding of Addis Ababa real estate market trends and property values'
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'Transparent processes, legal compliance, and ethical business practices'
    },
    {
      icon: Users,
      title: 'Client Focus',
      description: 'Personalized service tailored to each client\'s unique needs and goals'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Track record of successful transactions and satisfied clients'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Temer Properties
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Addis Ababa\'s most trusted real estate company since 2015. 
              Expert service, premium properties, and successful investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
                About Temer Properties
              </h2>
              <p className="text-lg text-muted-foreground">
                Your trusted partner in Addis Ababa real estate
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2015, Temer Properties has established itself as Addis Ababa's 
                most trusted real estate company. We specialize in premium residential and 
                commercial properties across the city's most sought-after neighborhoods.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team of experienced real estate professionals combines deep local market 
                knowledge with international standards of service, ensuring our clients receive 
                the best possible guidance for their property transactions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're buying your first home, investing in property, or selling 
                your real estate assets, Temer Properties is committed to delivering 
                exceptional results and building lasting relationships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Our Real Estate Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-card border border-border rounded-xl p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground">
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Why Choose Temer Properties?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The advantages of working with Addis Ababa's real estate experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Our Coverage Areas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Serving Addis Ababa's most prestigious neighborhoods
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="font-semibold text-foreground">
                    {neighborhood}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Work with Addis Ababa's Real Estate Experts
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the Temer Properties difference. Contact our team today to discuss 
              your real estate needs and discover how we can help you achieve your property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="mailto:info@temerpropertiessales.com"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Email Our Team
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
