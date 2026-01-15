import { useRef, useEffect } from 'react'

interface BiographyEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
}

export default function BiographyEditor({
  value,
  onChange,
  placeholder = 'Napisite biografiju ili zivotnu pricu...',
  maxLength = 10000,
  disabled = false,
}: BiographyEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(200, textarea.scrollHeight)}px`
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
  }

  const characterCount = value.length
  const isNearLimit = characterCount >= maxLength * 0.9
  const isAtLimit = characterCount >= maxLength

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full min-h-[200px] p-4
          border border-gray-300 rounded-lg
          font-serif text-gray-800 leading-relaxed
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent
          resize-none
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
        aria-label="Biografija"
      />

      {/* Character count */}
      <div className="flex justify-end">
        <span
          className={`text-sm ${
            isAtLimit
              ? 'text-red-600 font-medium'
              : isNearLimit
                ? 'text-amber-600'
                : 'text-gray-500'
          }`}
        >
          {characterCount.toLocaleString('sr-Latn-RS')} / {maxLength.toLocaleString('sr-Latn-RS')} karaktera
        </span>
      </div>
    </div>
  )
}
