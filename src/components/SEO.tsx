import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
  }
  person?: {
    name: string
    birthDate?: string
    deathDate?: string
    birthPlace?: string
    deathPlace?: string
    image?: string
  }
  localBusiness?: {
    name: string
    type: 'FuneralHome' | 'Cemetery' | 'LocalBusiness'
    address: string
    city: string
    phone?: string
    email?: string
    url?: string
  }
  noindex?: boolean
}

const DEFAULT_TITLE = 'Memorial - Digitalni memorijali'
const DEFAULT_DESCRIPTION = 'Kreirajte trajne digitalne memorijale za vaše voljene. Čuvajte uspomene, priče i ljubav - zauvek.'
const SITE_URL = 'https://memorials.orbitacode.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  article,
  person,
  localBusiness,
  noindex = false
}: SEOProps) {
  const location = useLocation()
  const fullUrl = `${SITE_URL}${location.pathname}`
  const pageTitle = title ? `${title} | Memorial` : DEFAULT_TITLE

  useEffect(() => {
    // Set document title
    document.title = pageTitle

    // Helper to set/update meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Basic meta tags
    setMeta('description', description)
    if (noindex) {
      setMeta('robots', 'noindex, nofollow')
    } else {
      setMeta('robots', 'index, follow')
    }

    // Open Graph
    setMeta('og:title', pageTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:image', image, true)
    setMeta('og:url', fullUrl, true)
    setMeta('og:type', type, true)
    setMeta('og:site_name', 'Memorial', true)
    setMeta('og:locale', 'sr_RS', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', pageTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)

    // Article specific
    if (article) {
      if (article.publishedTime) {
        setMeta('article:published_time', article.publishedTime, true)
      }
      if (article.modifiedTime) {
        setMeta('article:modified_time', article.modifiedTime, true)
      }
      if (article.author) {
        setMeta('article:author', article.author, true)
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)

    // Structured Data (JSON-LD)
    const existingScript = document.querySelector('script[data-seo-jsonld]')
    if (existingScript) {
      existingScript.remove()
    }

    const structuredData: Record<string, unknown>[] = []

    // Organization schema (always present)
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Memorial',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: DEFAULT_DESCRIPTION,
      sameAs: [
        'https://facebook.com/memorijalna-platforma',
        'https://instagram.com/memorijalna-platforma'
      ]
    })

    // Person schema (for memorial pages)
    if (person) {
      const personSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name
      }
      if (person.birthDate) personSchema.birthDate = person.birthDate
      if (person.deathDate) personSchema.deathDate = person.deathDate
      if (person.birthPlace) personSchema.birthPlace = person.birthPlace
      if (person.deathPlace) personSchema.deathPlace = person.deathPlace
      if (person.image) personSchema.image = person.image
      structuredData.push(personSchema)
    }

    // LocalBusiness schema (for partner pages)
    if (localBusiness) {
      const businessSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': localBusiness.type,
        name: localBusiness.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: localBusiness.address,
          addressLocality: localBusiness.city,
          addressCountry: 'RS'
        }
      }
      if (localBusiness.phone) businessSchema.telephone = localBusiness.phone
      if (localBusiness.email) businessSchema.email = localBusiness.email
      if (localBusiness.url) businessSchema.url = localBusiness.url
      structuredData.push(businessSchema)
    }

    // WebPage schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description: description,
      url: fullUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Memorial',
        url: SITE_URL
      }
    })

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Reset to defaults when component unmounts
      document.title = DEFAULT_TITLE
    }
  }, [pageTitle, description, image, type, fullUrl, article, person, localBusiness, noindex])

  return null
}

// Pre-defined SEO configurations for common pages
export const SEO_CONFIGS = {
  home: {
    title: 'Digitalni memorijali - Sačuvajte uspomene zauvek',
    description: 'Kreirajte besplatni digitalni memorijal za vaše voljene. Čuvajte fotografije, priče i uspomene na jednom mestu. Posetite nas i sačuvajte sećanja.'
  },
  memorials: {
    title: 'Memorijali - Pretraga digitalnih memorijala',
    description: 'Pronađite i posetite digitalne memorijale preminulih. Ostavite cveće, sveću ili poruku sećanja. Besplatna pretraga memorijala.'
  },
  obituaries: {
    title: 'Čitulje - Objave o smrti i sahranama',
    description: 'Pročitajte čitulje i umrlice. Informacije o sahranama, komemoracijama i načinima da izrazite saučešće porodici.'
  },
  funeralHomes: {
    title: 'Pogrebna preduzeća - Pronađite pogrebne usluge',
    description: 'Lista pogrebnih preduzeća u Srbiji. Pronađite pogrebne usluge u vašem gradu - kontakt podaci, radno vreme i usluge.'
  },
  cemeteries: {
    title: 'Groblja - Informacije o grobljima u Srbiji',
    description: 'Informacije o grobljima u Srbiji - lokacije, kontakt, radno vreme i cene grobnih mesta. Pronađite groblje u vašem gradu.'
  },
  stoneMasons: {
    title: 'Kamenorezačke radnje - Izrada nadgrobnih spomenika',
    description: 'Kamenorezačke radnje za izradu i postavljanje nadgrobnih spomenika. Pronađite majstore u vašem gradu.'
  },
  becomePartner: {
    title: 'Postanite partner - Oglašavanje za pogrebne usluge',
    description: 'Pridružite se Memorial platformi kao partner. Oglašavanje za pogrebna preduzeća, kamenorezačke radnje i groblja.'
  },
  login: {
    title: 'Prijava',
    description: 'Prijavite se na Memorial da biste upravljali svojim memorijalima i profilom.'
  },
  register: {
    title: 'Registracija',
    description: 'Registrujte se besplatno na Memorial platformi i kreirajte digitalne memorijale za vaše voljene.'
  }
}
