// Basic profanity filter for MVP
// Can be enhanced with AI moderation in future phases

// Common offensive words - keep minimal and focused
// Serbian profanity (latinica) and English basics
const blockedPatterns = [
  // Serbian common profanity
  /\bku+r(a|e|u|ac|ci)?\b/i,
  /\bpi+zd(a|e|u|o)?\b/i,
  /\bje+b(a|e|i|o|em|es|ala|ati)?\b/i,
  /\bsra+nj(e|a)?\b/i,
  /\bgov+n(o|a|u)?\b/i,
  /\bmr+s(i|o)?\b/i,
  // English common profanity
  /\bfu+ck\b/i,
  /\bshi+t\b/i,
  /\bass+\b/i,
  /\bbi+tch\b/i,
  /\bcu+nt\b/i,
  // Hate speech patterns
  /\bnazi\b/i,
  /\bfascist\b/i,
]

// Spam patterns
const spamPatterns = [
  // URLs (not allowed in comments)
  /https?:\/\/[^\s]+/i,
  /www\.[^\s]+/i,
  // Excessive repetition (more than 5 of same char)
  /(.)\1{5,}/,
  // All caps (more than 50% of 20+ char text is caps)
]

export interface ModerationResult {
  isClean: boolean
  issues: string[]
  autoReject: boolean
}

export function checkContent(text: string): ModerationResult {
  const issues: string[] = []
  let autoReject = false

  // Check for profanity
  for (const pattern of blockedPatterns) {
    if (pattern.test(text)) {
      issues.push('Sadrzi neprikladne reci')
      autoReject = true
      break
    }
  }

  // Check for spam patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(text)) {
      issues.push('Sadrzi linkove ili spam')
      autoReject = true
      break
    }
  }

  // Check for excessive caps
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length > 20) {
    const capsCount = (text.match(/[A-Z]/g) || []).length
    if (capsCount / letters.length > 0.5) {
      issues.push('Previse velikih slova')
    }
  }

  // Check minimum content
  const cleanText = text.trim()
  if (cleanText.length < 3) {
    issues.push('Komentar je prekratak')
  }

  return {
    isClean: issues.length === 0,
    issues,
    autoReject,
  }
}
