/**
 * Komponenta za pronalaženje i odabir preminule osobe
 * Prikazuje se kad korisnik unese ime i datum smrti
 */

import { useState, useEffect } from 'react'
import { findDeceasedPersonMatches } from '../lib/deceasedPersons'
import type { DeceasedPerson, DeceasedPersonMatch } from '../types/deceasedPerson'
import { EternalFlame } from './icons/ReligiousSymbols'
import { CheckIcon, SearchIcon } from './icons/FeatureIcons'

interface DeceasedPersonMatcherProps {
  firstName: string
  lastName: string
  dateOfDeath: string
  onSelect: (person: DeceasedPerson | null) => void // null = nova osoba
  selectedPersonId?: string | null
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function DeceasedPersonMatcher({
  firstName,
  lastName,
  dateOfDeath,
  onSelect,
  selectedPersonId,
}: DeceasedPersonMatcherProps) {
  const [matches, setMatches] = useState<DeceasedPersonMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [createNew, setCreateNew] = useState(false)

  // Automatski pretraži kad se promene podaci
  useEffect(() => {
    // Reset kad se podaci promene
    setSearched(false)
    setMatches([])
    setCreateNew(false)
  }, [firstName, lastName, dateOfDeath])

  const handleSearch = async () => {
    if (!firstName.trim() || !lastName.trim() || !dateOfDeath) {
      return
    }

    setLoading(true)
    const { data } = await findDeceasedPersonMatches(firstName, lastName, dateOfDeath)
    setMatches(data || [])
    setSearched(true)
    setLoading(false)

    // Ako nema match-eva, automatski "kreiranje nove"
    if (!data || data.length === 0) {
      setCreateNew(true)
      onSelect(null)
    }
  }

  const handleSelectPerson = (person: DeceasedPerson) => {
    setCreateNew(false)
    onSelect(person)
  }

  const handleCreateNew = () => {
    setCreateNew(true)
    onSelect(null)
  }

  // Ne prikazuj ako nema dovoljno podataka
  if (!firstName.trim() || !lastName.trim() || !dateOfDeath) {
    return null
  }

  return (
    <div className="bg-sand-light rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">
          Pronađi postojeće čitulje
        </h3>
        {!searched && (
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <SearchIcon size={16} />
            {loading ? 'Tražim...' : 'Pretraži'}
          </button>
        )}
      </div>

      {!searched ? (
        <p className="text-text-secondary text-sm">
          Kliknite "Pretraži" da proverite da li već postoje čitulje za{' '}
          <strong>
            {firstName} {lastName}
          </strong>
          . Ako postoje, vaša čitulja će biti prikazana zajedno sa njima.
        </p>
      ) : loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky mx-auto"></div>
        </div>
      ) : matches.length > 0 ? (
        <div className="space-y-3">
          <p className="text-text-secondary text-sm mb-4">
            Pronašli smo sličan unos. Da li se vaša čitulja odnosi na ovu osobu?
          </p>

          {matches.map((match) => (
            <button
              key={match.person.id}
              type="button"
              onClick={() => handleSelectPerson(match.person)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedPersonId === match.person.id
                  ? 'border-sky bg-sky-light/30'
                  : 'border-border-light bg-white hover:border-sky/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {match.person.photo_url ? (
                  <img
                    src={match.person.photo_url}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                    <EternalFlame size={20} className="text-rose" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-text-primary">
                      {match.person.first_name} {match.person.last_name}
                    </p>
                    {selectedPersonId === match.person.id && (
                      <div className="w-6 h-6 bg-sky rounded-full flex items-center justify-center">
                        <CheckIcon size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">
                    {match.person.date_of_birth && formatDate(match.person.date_of_birth)}
                    {match.person.date_of_birth && ' – '}
                    {formatDate(match.person.date_of_death)}
                    {match.person.place_of_death && ` · ${match.person.place_of_death}`}
                  </p>
                  <p className="text-sky-dark text-sm mt-1">
                    {match.person.condolences_count}{' '}
                    {match.person.condolences_count === 1 ? 'čitulja' : 'čitulje'} već postavljeno
                  </p>
                  {match.confidence !== 'exact' && (
                    <p className="text-text-muted text-xs mt-1 italic">
                      {match.matchReason}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}

          {/* Opcija za kreiranje nove osobe */}
          <button
            type="button"
            onClick={handleCreateNew}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              createNew
                ? 'border-sage bg-sage-light/30'
                : 'border-border-light bg-white hover:border-sage/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">
                  Ovo je druga osoba
                </p>
                <p className="text-text-secondary text-sm">
                  Kreiraj novu čitulju koja nije povezana sa gore navedenim
                </p>
              </div>
              {createNew && (
                <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                  <CheckIcon size={14} className="text-white" />
                </div>
              )}
            </div>
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-3">
            <CheckIcon size={24} className="text-sage-dark" />
          </div>
          <p className="text-text-primary font-medium mb-1">
            Nema postojećih čitulja za ovu osobu
          </p>
          <p className="text-text-secondary text-sm">
            Vaša čitulja će biti prva za{' '}
            <strong>
              {firstName} {lastName}
            </strong>
          </p>
        </div>
      )}
    </div>
  )
}
