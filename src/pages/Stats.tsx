import { useState } from 'react'
import { LEVELS, getLevelForXP, getXPProgress } from '../lib/levels'
import type { Level } from '../lib/levels'
import XPProgressHeader from '../components/gamification/XPProgressHeader'
import SEO from '../components/SEO'

// TODO: Replace with real XP from user context/API
const DEMO_XP = 1800

function LevelCard({ levelDef, currentLevel }: { levelDef: Level; currentLevel: Level }) {
  const [imgError, setImgError] = useState(false)
  const isUnlocked = currentLevel.level >= levelDef.level
  const isCurrent = currentLevel.level === levelDef.level

  return (
    <div
      className={`relative rounded-xl border p-4 transition-all duration-200 ${
        isCurrent
          ? 'border-2 bg-white shadow-md'
          : isUnlocked
            ? 'border-border-light bg-white'
            : 'border-border-light bg-sand-light/50'
      }`}
      style={isCurrent ? { borderColor: '#9A87AD' } : undefined}
    >
      {/* Current level badge */}
      {isCurrent && (
        <span
          className="absolute -top-2.5 left-4 px-2 py-0.5 text-xs font-semibold text-white rounded-full"
          style={{ background: 'linear-gradient(135deg, #6E5A7A, #9A87AD)' }}
        >
          Ara!
        </span>
      )}

      <div className="flex items-center gap-3">
        {/* Illustration or emoji */}
        <div className="shrink-0">
          {levelDef.image && !imgError ? (
            <img
              src={levelDef.image}
              alt={levelDef.name}
              className={`w-12 h-12 rounded-lg object-cover ${!isUnlocked ? 'opacity-40 grayscale' : ''}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                !isUnlocked ? 'opacity-40 grayscale' : ''
              }`}
              style={{ backgroundColor: isUnlocked ? '#F1ECE5' : '#EDE7DD' }}
            >
              <span className="text-2xl">{levelDef.emoji}</span>
            </div>
          )}
        </div>

        {/* Level info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-text-muted">Niv. {levelDef.level}</span>
            {!isUnlocked && (
              <span className="text-xs text-text-muted">
                {levelDef.xpRequired.toLocaleString()} XP
              </span>
            )}
          </div>
          <p className={`font-semibold truncate ${isUnlocked ? 'text-text-primary' : 'text-text-muted'}`}>
            {levelDef.name}
          </p>
          <p className={`text-xs ${isUnlocked ? 'text-text-secondary' : 'text-text-muted'}`}>
            {levelDef.power}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Stats() {
  const xp = DEMO_XP
  const currentLevel = getLevelForXP(xp)
  const progress = getXPProgress(xp)

  return (
    <div className="bg-ivory min-h-screen">
      <SEO
        title="Estadístiques"
        description="Mira el teu progrés i nivells de superheroi"
      />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Page header */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text-primary mb-6">
          El teu progrés
        </h1>

        {/* Current level overview */}
        <div className="mb-8">
          <XPProgressHeader xp={xp} />
        </div>

        {/* XP summary card */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-border-light p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#6E5A7A' }}>
              {xp.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted mt-1">XP total</p>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#6E5A7A' }}>
              {currentLevel.level}
            </p>
            <p className="text-xs text-text-muted mt-1">Nivell</p>
          </div>
          <div className="bg-white rounded-xl border border-border-light p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: '#6E5A7A' }}>
              {progress.percentage}%
            </p>
            <p className="text-xs text-text-muted mt-1">Progrés</p>
          </div>
        </div>

        {/* All levels list */}
        <h2 className="font-semibold text-text-primary text-lg mb-4">
          Tots els nivells
        </h2>
        <div className="space-y-3">
          {LEVELS.map(levelDef => (
            <LevelCard
              key={levelDef.level}
              levelDef={levelDef}
              currentLevel={currentLevel}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
