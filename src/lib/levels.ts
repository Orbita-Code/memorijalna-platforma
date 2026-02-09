export interface Level {
  level: number
  name: string
  emoji: string
  xpRequired: number
  power: string
  image?: string
}

export const LEVELS: Level[] = [
  { level: 1,  name: "Aprenent d'Heroi",  emoji: '🦸', xpRequired: 0,     power: 'Coratge',         image: '/illustrations/heroi-1.webp' },
  { level: 2,  name: 'Superfort',          emoji: '💪', xpRequired: 100,   power: 'Superforça',      image: '/illustrations/heroi-2.webp' },
  { level: 3,  name: 'Superràpid',         emoji: '💨', xpRequired: 300,   power: 'Supervelocitat',  image: '/illustrations/heroi-3.webp' },
  { level: 4,  name: 'Volador',            emoji: '🦅', xpRequired: 600,   power: 'Vol',             image: '/illustrations/heroi-4.webp' },
  { level: 5,  name: 'Invisible',          emoji: '👻', xpRequired: 1000,  power: 'Invisibilitat',   image: '/illustrations/heroi-5.webp' },
  { level: 6,  name: 'Llampec',            emoji: '⚡', xpRequired: 1500,  power: 'Llamps',          image: '/illustrations/heroi-6.webp' },
  { level: 7,  name: 'Flamarada',          emoji: '🔥', xpRequired: 2200,  power: 'Foc',             image: '/illustrations/heroi-7.webp' },
  { level: 8,  name: 'Glacial',            emoji: '❄️', xpRequired: 3000,  power: 'Gel',             image: '/illustrations/heroi-8.webp' },
  { level: 9,  name: 'Mag',                emoji: '🔮', xpRequired: 4000,  power: 'Màgia',           image: '/illustrations/heroi-9.webp' },
  { level: 10, name: 'Guardià',            emoji: '🛡️', xpRequired: 5500,  power: 'Protecció',       image: '/illustrations/heroi-10.webp' },
  { level: 11, name: 'Capità Estrella',    emoji: '⭐', xpRequired: 7500,  power: 'Lideratge',       image: '/illustrations/heroi-11.webp' },
  { level: 12, name: 'Superheroi Suprem',  emoji: '🌟', xpRequired: 10000, power: 'Tots els poders', image: '/illustrations/heroi-12.webp' },
]

export function getLevelForXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i]
    }
  }
  return LEVELS[0]
}

export function getNextLevel(currentLevel: Level): Level | null {
  const idx = LEVELS.findIndex(l => l.level === currentLevel.level)
  if (idx < LEVELS.length - 1) {
    return LEVELS[idx + 1]
  }
  return null
}

export function getXPProgress(xp: number): { current: number; needed: number; percentage: number } {
  const level = getLevelForXP(xp)
  const next = getNextLevel(level)
  if (!next) {
    return { current: xp - level.xpRequired, needed: 0, percentage: 100 }
  }
  const currentLevelXP = xp - level.xpRequired
  const neededXP = next.xpRequired - level.xpRequired
  return {
    current: currentLevelXP,
    needed: neededXP,
    percentage: Math.min(100, Math.round((currentLevelXP / neededXP) * 100)),
  }
}
