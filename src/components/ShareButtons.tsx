import { useState } from 'react'
import {
  FacebookIcon,
  WhatsAppIcon,
  ViberIcon,
  EnvelopeIcon,
  CopyLinkIcon,
  TwitterIcon,
  ShareIcon
} from './icons/FeatureIcons'

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
  // Tip sadržaja za prilagođene poruke
  type?: 'memorial' | 'obituary' | 'condolence'
  // Da li prikazati kao kompaktne dugmad ili punu verziju
  compact?: boolean
  // Klasa za wrapper
  className?: string
}

export default function ShareButtons({
  url,
  title,
  description = '',
  type = 'memorial',
  compact = false,
  className = ''
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Osiguraj da URL ima pun path
  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`

  // Pripremi tekst za deljenje
  const getShareText = () => {
    switch (type) {
      case 'memorial':
        return `${title} - Memorijalna stranica\n\n${description}\n\n`
      case 'obituary':
        return `${title} - Umrlica\n\n${description}\n\n`
      case 'condolence':
        return `Čitulja za ${title}\n\n${description}\n\n`
      default:
        return `${title}\n\n${description}\n\n`
    }
  }

  const shareText = getShareText()
  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedText = encodeURIComponent(shareText)
  const encodedTitle = encodeURIComponent(title)

  // Share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}${encodedUrl}`,
    viber: `viber://forward?text=${encodedText}${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback za starije browsere
      const textArea = document.createElement('textarea')
      textArea.value = fullUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    const link = shareLinks[platform]

    // Za Viber, koristimo location jer je to custom protocol
    if (platform === 'viber') {
      window.location.href = link
    } else if (platform === 'email') {
      window.location.href = link
    } else {
      // Za Facebook, WhatsApp, Twitter - otvori u novom prozoru
      window.open(link, '_blank', 'width=600,height=400,noopener,noreferrer')
    }

    setShowDropdown(false)
  }

  // Native Web Share API (za mobilne uređaje)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: fullUrl,
        })
      } catch {
        // Korisnik je otkazao ili greška
        setShowDropdown(true)
      }
    } else {
      setShowDropdown(true)
    }
  }

  // Kompaktna verzija - samo ikona koja otvara dropdown
  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-3 bg-sand-light hover:bg-sand text-text-primary rounded-lg transition-colors"
          aria-label="Podeli"
        >
          <ShareIcon size={20} />
          <span className="text-base font-medium">Podeli</span>
        </button>

        {/* Dropdown meni */}
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-sand z-50 py-2 min-w-[200px]">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <WhatsAppIcon size={22} className="text-[#25D366]" />
                <span className="text-text-primary">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('viber')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <ViberIcon size={22} className="text-[#7360F2]" />
                <span className="text-text-primary">Viber</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <FacebookIcon size={22} className="text-[#1877F2]" />
                <span className="text-text-primary">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <TwitterIcon size={22} className="text-text-primary" />
                <span className="text-text-primary">Twitter / X</span>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <EnvelopeIcon size={22} className="text-text-secondary" />
                <span className="text-text-primary">Email</span>
              </button>
              <div className="border-t border-sand my-1" />
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-sand-light transition-colors text-left"
              >
                <CopyLinkIcon size={22} className="text-sky" />
                <span className="text-text-primary">
                  {copied ? 'Kopirano!' : 'Kopiraj link'}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  // Puna verzija - prikazuje sve dugmad
  return (
    <div className={`${className}`}>
      <p className="text-text-secondary text-sm mb-3">Podelite sa drugima:</p>

      <div className="flex flex-wrap gap-2">
        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-colors"
          aria-label="Podeli na WhatsApp"
        >
          <WhatsAppIcon size={20} />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>

        {/* Viber */}
        <button
          onClick={() => handleShare('viber')}
          className="flex items-center gap-2 px-4 py-3 bg-[#7360F2] hover:bg-[#6050E0] text-white rounded-lg transition-colors"
          aria-label="Podeli na Viber"
        >
          <ViberIcon size={20} />
          <span className="text-sm font-medium">Viber</span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-colors"
          aria-label="Podeli na Facebook"
        >
          <FacebookIcon size={20} />
          <span className="text-sm font-medium">Facebook</span>
        </button>

        {/* Email */}
        <button
          onClick={() => handleShare('email')}
          className="flex items-center gap-2 px-4 py-3 bg-sand hover:bg-sand-light text-text-primary rounded-lg transition-colors border border-border-light"
          aria-label="Pošalji emailom"
        >
          <EnvelopeIcon size={20} />
          <span className="text-sm font-medium">Email</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors border ${
            copied
              ? 'bg-sage text-white border-sage'
              : 'bg-white hover:bg-sand-light text-text-primary border-border-light'
          }`}
          aria-label="Kopiraj link"
        >
          <CopyLinkIcon size={20} />
          <span className="text-sm font-medium">
            {copied ? 'Kopirano!' : 'Kopiraj link'}
          </span>
        </button>
      </div>
    </div>
  )
}
