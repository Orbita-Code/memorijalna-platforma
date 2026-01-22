/**
 * Religijski simboli - SVG ikone za sve velike svetske religije
 * Koriste se na memorijalima umesto emojija
 */

interface ReligiousSymbolProps {
  className?: string
  size?: number
}

// Pravoslavni krst (tri prečke)
export function OrthodoxCross({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Pravoslavni krst"
    >
      <path d="M12 2v2h3v2h-3v2h4v2h-4v12h-2V10H6V8h4V6H7V4h3V2h2z" />
      <path d="M7 18l2-2v4l-2-2zm8 0l2 2-2 2v-4z" opacity="0.8" />
    </svg>
  )
}

// Katolički krst (latinski krst)
export function CatholicCross({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Katolički krst"
    >
      <path d="M11 2h2v6h6v2h-6v12h-2V10H5V8h6V2z" />
    </svg>
  )
}

// Islamski polumesec sa zvezdom
export function IslamicCrescent({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Islamski polumesec"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.5 5-1.35-1.99-1.73-3.25-4.27-3.25-7.15s1.26-5.42 3.25-7.15C15.53 2.5 13.82 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c.34 0 .68.02 1.01.07C11.1 5.65 10 8.67 10 12s1.1 6.35 3.01 7.93c-.33.05-.67.07-1.01.07z" />
      <path d="M16.5 8l.72 2.22L19.5 11l-2.28.78L16.5 14l-.72-2.22L13.5 11l2.28-.78z" />
    </svg>
  )
}

// Davidova zvezda (heksagram)
export function StarOfDavid({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Davidova zvezda"
    >
      <path d="M12 2L4.5 15h15L12 2zm0 4.5L16.5 13h-9L12 6.5z" />
      <path d="M12 22l7.5-13h-15L12 22zm0-4.5L7.5 11h9L12 17.5z" />
    </svg>
  )
}

// Budistički Dharma točak
export function DharmaWheel({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Dharma točak"
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" />
      {/* 8 kraka */}
      <line x1="12" y1="3" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.64" y1="5.64" x2="9.88" y2="9.88" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14.12" y1="14.12" x2="18.36" y2="18.36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.64" y1="18.36" x2="9.88" y2="14.12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14.12" y1="9.88" x2="18.36" y2="5.64" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Hinduistički Om simbol
export function OmSymbol({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Om simbol"
    >
      <path d="M5 13c0-2.76 2.24-5 5-5 1.38 0 2.64.56 3.54 1.46L12 11l1.46-1.46c.34.34.54.82.54 1.46 0 1.1-.9 2-2 2s-2-.9-2-2c0-.28.06-.54.17-.78C9.45 10.08 8.78 10 8 10c-1.66 0-3 1.34-3 3 0 2.76 2.24 5 5 5h2v2h-2c-3.87 0-7-3.13-7-7z" />
      <path d="M16 7c1.66 0 3 1.34 3 3 0 1.1-.9 2-2 2v2c2.21 0 4-1.79 4-4 0-2.76-2.24-5-5-5v2z" />
      <circle cx="18" cy="5" r="1.5" />
      <path d="M14 17c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
    </svg>
  )
}

// Opšti neutralni simbol (večni plamen / sveća)
export function EternalFlame({ className = '', size = 24 }: ReligiousSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Večni plamen"
    >
      <path d="M12 2c-.55 2.5-2.5 4-2.5 6.5 0 2 1.5 3.5 2.5 3.5s2.5-1.5 2.5-3.5c0-2.5-1.95-4-2.5-6.5z" />
      <path d="M12 8c-.25 1.25-1.25 2-1.25 3.25 0 1 .75 1.75 1.25 1.75s1.25-.75 1.25-1.75c0-1.25-1-2-1.25-3.25z" fill="var(--rose, #D8B4A6)" />
      <rect x="10" y="13" width="4" height="9" rx="1" opacity="0.6" />
    </svg>
  )
}

// Komponenta koja prikazuje odgovarajući simbol na osnovu tipa
export type ReligionType = 'orthodox' | 'catholic' | 'islam' | 'judaism' | 'buddhism' | 'hinduism' | 'none' | null

interface ReligiousSymbolSelectorProps {
  religion: ReligionType
  className?: string
  size?: number
}

export function ReligiousSymbol({ religion, className = '', size = 24 }: ReligiousSymbolSelectorProps) {
  switch (religion) {
    case 'orthodox':
      return <OrthodoxCross className={className} size={size} />
    case 'catholic':
      return <CatholicCross className={className} size={size} />
    case 'islam':
      return <IslamicCrescent className={className} size={size} />
    case 'judaism':
      return <StarOfDavid className={className} size={size} />
    case 'buddhism':
      return <DharmaWheel className={className} size={size} />
    case 'hinduism':
      return <OmSymbol className={className} size={size} />
    case 'none':
    case null:
    default:
      return <EternalFlame className={className} size={size} />
  }
}

// Lista svih dostupnih religija za dropdown/selekciju
export const RELIGIONS = [
  { value: 'orthodox', label: 'Pravoslavlje', labelEn: 'Orthodox Christianity' },
  { value: 'catholic', label: 'Katoličanstvo', labelEn: 'Catholic Christianity' },
  { value: 'islam', label: 'Islam', labelEn: 'Islam' },
  { value: 'judaism', label: 'Judaizam', labelEn: 'Judaism' },
  { value: 'buddhism', label: 'Budizam', labelEn: 'Buddhism' },
  { value: 'hinduism', label: 'Hinduizam', labelEn: 'Hinduism' },
  { value: 'none', label: 'Bez simbola', labelEn: 'No symbol' },
] as const
