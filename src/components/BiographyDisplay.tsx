interface BiographyDisplayProps {
  biography: string | null
}

export default function BiographyDisplay({ biography }: BiographyDisplayProps) {
  if (!biography || biography.trim() === '') {
    return (
      <div className="text-center py-8">
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500">Biografija jos nije napisana</p>
      </div>
    )
  }

  // Split by double newlines for paragraphs, preserve single newlines within paragraphs
  const paragraphs = biography.split(/\n\n+/).filter((p) => p.trim())

  return (
    <div className="prose prose-stone max-w-none">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-serif text-gray-800 leading-relaxed mb-4 last:mb-0 whitespace-pre-line"
        >
          {paragraph.trim()}
        </p>
      ))}
    </div>
  )
}
