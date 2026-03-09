import { Metadata } from 'next'

// Base configuration
const SITE_URL = 'https://temerproperties.com'
const SITE_NAME = 'Temer Properties'
const DEFAULT_LOCALE = 'en_ET'

// Primary keywords for Addis Ababa real estate
const PRIMARY_KEYWORDS = [
  'Addis Ababa Real Estate',
  'Real Estate in Addis Ababa', 
  'Ayat Real Estate',
  'Temer Real Estate',
  'Temer Properties',
  'Temer Property',
  'Temer Property Sales',
  'Temer Properties Sales',
  'Temer Realstate',
  'Temer Real Estate Addis Ababa',
  'Tamer Real Estate'
]

// Secondary keywords
const SECONDARY_KEYWORDS = [
  'Property for sale in Addis Ababa',
  'Houses for sale Addis Ababa',
  'Apartments in Addis Ababa',
  'Real estate company Addis Ababa',
  'Real estate developers Ethiopia',
  'Property investment Addis Ababa',
  'Luxury homes Addis Ababa',
  'Ayat homes for sale'
]

// Location-based keywords
const LOCATION_KEYWORDS = [
  'Bole real estate',
  'CMC properties',
  'Kazanchis real estate',
  'Old Airport homes',
  'Summit properties',
  'Ayat real estate'
]

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    type?: 'website' | 'article' | 'book' | 'profile'
    locale?: string
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    title?: string
    description?: string
    images?: string[]
  }
  alternates?: {
    canonical?: string
  }
  robots?: {
    index?: boolean
    follow?: boolean
    googleBot?: {
      index?: boolean
      follow?: boolean
      'max-video-preview'?: number
      'max-image-preview'?: 'standard' | 'large' | 'none'
      'max-snippet'?: number
    }
  }
}

/**
 * Generate optimized metadata for pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph,
    twitter,
    alternates,
    robots
  } = config

  // Combine keywords with primary keywords
  const allKeywords = [...PRIMARY_KEYWORDS, ...keywords, ...SECONDARY_KEYWORDS]

  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`
    },
    description,
    keywords: allKeywords.join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || alternates?.canonical
    },
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: canonical,
      siteName: SITE_NAME,
      locale: openGraph?.locale || DEFAULT_LOCALE,
      type: openGraph?.type || 'website',
      images: openGraph?.images || [{
        url: '/images/Logo.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Addis Ababa Real Estate Experts`
      }]
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: twitter?.images || ['/images/Logo.jpg']
    },
    robots: robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: 'your-google-verification-code', // Add your Google verification code
      yandex: 'your-yandex-verification-code' // Add if needed
    }
  }
}

/**
 * Generate SEO-optimized title
 */
export function generateTitle(keyword: string, includeBrand = true): string {
  const cleanKeyword = keyword.trim()
  if (includeBrand) {
    return cleanKeyword.length > 50 
      ? `${cleanKeyword} | ${SITE_NAME}` 
      : `${cleanKeyword} | ${SITE_NAME}`
  }
  return cleanKeyword
}

/**
 * Generate SEO-optimized description
 */
export function generateDescription(
  location: string = 'Addis Ababa',
  propertyType: string = 'properties',
  customDescription?: string
): string {
  if (customDescription) {
    return customDescription.length <= 160 
      ? customDescription 
      : customDescription.substring(0, 157) + '...'
  }

  const descriptions = [
    `Discover premium ${propertyType} for sale in ${location} with Temer Properties. Trusted real estate experts offering luxury homes, apartments, and investment opportunities.`,
    `Temer Properties offers exceptional ${propertyType} in ${location}. Find your dream home or investment property with Ethiopia's leading real estate developers.`,
    `Browse exclusive ${propertyType} in ${location} with Temer Real Estate. Premium homes, apartments, and investment opportunities in prime locations.`
  ]

  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

/**
 * Location-specific SEO configurations
 */
export const LOCATION_SEO = {
  addisAbaba: {
    title: 'Addis Ababa Real Estate | Premium Properties & Homes',
    description: 'Find exceptional real estate in Addis Ababa with Temer Properties. Luxury homes, apartments, and investment properties in Ethiopia\'s capital city.',
    keywords: ['Addis Ababa real estate', 'properties Addis Ababa', 'homes for sale Addis Ababa']
  },
  ayat: {
    title: 'Ayat Real Estate | Luxury Homes & Properties for Sale',
    description: 'Discover premium properties in Ayat, Addis Ababa. Temer Properties offers luxury homes, villas, and investment opportunities in this prime residential area.',
    keywords: ['Ayat real estate', 'Ayat properties', 'homes for sale Ayat', 'Ayat homes']
  },
  bole: {
    title: 'Bole Real Estate | Premium Properties in Addis Ababa',
    description: 'Find exclusive properties in Bole, Addis Ababa\'s business district. Temer Properties offers luxury apartments, offices, and investment opportunities.',
    keywords: ['Bole real estate', 'Bole properties', 'apartments Bole', 'real estate Bole']
  }
}

/**
 * Property type SEO configurations
 */
export const PROPERTY_TYPE_SEO = {
  apartments: {
    title: 'Apartments for Sale in Addis Ababa | Luxury Living',
    description: 'Browse premium apartments for sale in Addis Ababa with Temer Properties. Modern luxury living in prime locations across the city.',
    keywords: ['apartments Addis Ababa', 'luxury apartments', 'flats for sale Addis Ababa']
  },
  villas: {
    title: 'Luxury Villas for Sale in Addis Ababa | Premium Homes',
    description: 'Discover exclusive villas and luxury homes in Addis Ababa with Temer Properties. Premium residential properties in prime locations.',
    keywords: ['luxury villas Addis Ababa', 'premium homes', 'villas for sale Ethiopia']
  },
  investment: {
    title: 'Real Estate Investment Addis Ababa | High ROI Properties',
    description: 'Invest in Addis Ababa real estate with Temer Properties. High ROI properties, rental opportunities, and premium investment options.',
    keywords: ['real estate investment Addis Ababa', 'property investment Ethiopia', 'ROI properties']
  }
}

export default {
  generateMetadata,
  generateTitle,
  generateDescription,
  LOCATION_SEO,
  PROPERTY_TYPE_SEO,
  PRIMARY_KEYWORDS,
  SECONDARY_KEYWORDS,
  LOCATION_KEYWORDS
}
