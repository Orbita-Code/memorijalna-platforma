import { useState } from 'react'
import { getLevelForXP, getNextLevel, getXPProgress } from '../../lib/levels'

interface XPProgressHeaderProps {
  xp: number
}

export default function XPProgressHeader({ xp }: XPProgressHeaderProps) {
  const [imgError, setImgError] = useState(false)
  const level = getLevelForXP(xp)
  const nextLevel = getNextLevel(level)
  const progress = getXPProgress(xp)
  const isMaxLevel = !nextLevel

  return (
    <div className="bg-white rounded-xl border border-border-light p-4 sm:p-5">
      <div className="flex items-center gap-4">
        {/* Level icon */}
        <div className="shrink-0">
          {level.image && !imgError ? (
            <img
              src={level.image}
              alt={level.name}
              className="w-14 h-14 rounded-lg object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-sand-light flex items-center justify-center">
              <span className="text-3xl">{level.emoji}</span>
            </div>
          )}
        </div>

        {/* Level info and progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="font-semibold text-text-primary truncate">
              Niv. {level.level}: {level.name}
            </h3>
            <span className="text-xs text-text-muted whitespace-nowrap">
              {xp.toLocaleString()} XP
            </span>
          </div>

          {/* Power label */}
          <p className="text-xs text-text-secondary mb-2">
            Poder: {level.power}
          </p>

          {/* Progress bar */}
          {isMaxLevel ? (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#EDE7DD' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #6E5A7A, #C9BED6)',
                  }}
                />
              </div>
              <span className="text-xs font-medium" style={{ color: '#6E5A7A' }}>MAX</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#EDE7DD' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.percentage}%`,
                    background: 'linear-gradient(90deg, #6E5A7A, #9A87AD)',
                  }}
                />
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap">
                {progress.current}/{progress.needed}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
