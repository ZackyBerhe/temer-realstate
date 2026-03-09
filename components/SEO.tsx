'use client'

import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
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
    type?: string
  }
  structuredData?: Record<string, any>
}

/**
 * Client-side SEO component for dynamic meta updates
 * Note: Most SEO should be handled server-side via metadata API
 * This component is for dynamic client-side updates when needed
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  openGraph,
  structuredData
}: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
    
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    if (keywords && keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords.join(', '))
    }

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', canonical)
    }

    // Update Open Graph meta tags
    if (openGraph) {
      const ogTitle = openGraph.title || title
      const ogDesc = openGraph.description || description
      
      if (ogTitle) {
        updateMetaTag('og:title', ogTitle, 'property')
      }
      if (ogDesc) {
        updateMetaTag('og:description', ogDesc, 'property')
      }
      if (openGraph.type) {
        updateMetaTag('og:type', openGraph.type, 'property')
      }
      if (openGraph.images && openGraph.images.length > 0) {
        updateMetaTag('og:image', openGraph.images[0].url, 'property')
        if (openGraph.images[0].alt) {
          updateMetaTag('og:image:alt', openGraph.images[0].alt, 'property')
        }
      }
    }

    // Add structured data
    if (structuredData) {
      let structuredDataScript = document.querySelector('#structured-data')
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script')
        structuredDataScript.setAttribute('type', 'application/ld+json')
        structuredDataScript.setAttribute('id', 'structured-data')
        document.head.appendChild(structuredDataScript)
      }
      structuredDataScript.textContent = JSON.stringify(structuredData)
    }
  }, [title, description, keywords, canonical, openGraph, structuredData])

  function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  return null // This component doesn't render anything
}
