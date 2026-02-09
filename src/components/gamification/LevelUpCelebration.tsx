import { useState, useEffect } from 'react'
import type { Level } from '../../lib/levels'

interface LevelUpCelebrationProps {
  level: Level
  onClose: () => void
}

const ENCOURAGEMENT_MESSAGES: Record<number, string> = {
  2:  'Tens superforça! Pots amb tot!',
  3:  'Ets superràpid! Ningú et pot atrapar!',
  4:  'Pots volar! El cel és teu!',
  5:  'Pots fer-te invisible! Quin superpoder!',
  6:  'Tens el poder del llamp!',
  7:  'Controls el foc! Quina força!',
  8:  'Controls el gel! Tot es congela!',
  9:  'Ets un mag! La màgia és teva!',
  10: 'Ets el guardià! Protegeixes tothom!',
  11: 'Ets el capità dels herois!',
  12: 'SUPERHEROI SUPREM! Tens tots els poders!',
}

const FLOATING_EMOJIS = ['⚡', '💥', '🌟', '💪']

export default function LevelUpCelebration({ level, onClose }: LevelUpCelebrationProps) {
  const [visible, setVisible] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const message = ENCOURAGEMENT_MESSAGES[level.level] || ''

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Floating decorations */}
      {FLOATING_EMOJIS.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-3xl pointer-events-none animate-bounce"
          style={{
            top: `${15 + i * 20}%`,
            left: `${10 + i * 25}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${1.5 + i * 0.3}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-8 text-center transition-transform duration-300 ${
          visible ? 'scale-100' : 'scale-90'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Level illustration or emoji */}
        <div className="mb-6">
          {level.image && !imgError ? (
            <img
              src={level.image}
              alt={level.name}
              className="w-32 h-32 mx-auto rounded-xl object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-7xl block">{level.emoji}</span>
          )}
        </div>

        {/* Level up text */}
        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">
          Nou nivell!
        </p>
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-1">
          Nivell {level.level}: {level.name}
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Poder: {level.power}
        </p>

        {/* Encouragement message */}
        {message && (
          <p className="text-lg font-medium mb-6" style={{ color: '#6E5A7A' }}>
            {message}
          </p>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:translate-y-[-2px]"
          style={{
            background: 'linear-gradient(135deg, #6E5A7A 0%, #9A87AD 50%, #C9BED6 100%)',
            boxShadow: '0 4px 12px rgba(110, 90, 122, 0.3)',
          }}
        >
          Continuar!
        </button>
      </div>
    </div>
  )
}
