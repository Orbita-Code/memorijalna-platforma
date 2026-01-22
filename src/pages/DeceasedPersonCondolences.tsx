import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDeceasedPersonById } from '../lib/deceasedPersons'
import { getCondolencesByPersonId } from '../lib/condolences'
import type { DeceasedPerson } from '../types/deceasedPerson'
import type { Condolence } from '../types/condolence'
import SEO from '../components/SEO'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { PlusIcon } from '../components/icons/FeatureIcons'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return `${date.getDate()}.${date.getMonth() + 1}.`
}

export default function DeceasedPersonCondolences() {
  const { id } = useParams<{ id: string }>()
  const [person, setPerson] = useState<DeceasedPerson | null>(null)
  const [condolences, setCondolences] = useState<Condolence[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadData(id)
    }
  }, [id])

  const loadData = async (personId: string) => {
    setLoading(true)
    setError(null)

    const { data: personData, error: personError } = await getDeceasedPersonById(personId)
    if (personError || !personData) {
      setError('Osoba nije pronađena')
      setLoading(false)
      return
    }
    setPerson(personData)

    const { data: condolencesData } = await getCondolencesByPersonId(personId)
    setCondolences(condolencesData || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky"></div>
      </div>
    )
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <EternalFlame size={32} className="text-sand mx-auto mb-3" />
          <p className="text-text-secondary mb-2">{error || 'Osoba nije pronađena'}</p>
          <Link to="/citulje" className="text-sky hover:text-sky-dark text-sm font-medium">
            ← Nazad na sve čitulje
          </Link>
        </div>
      </div>
    )
  }

  const fullName = `${person.first_name} ${person.last_name}`

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title={`Čitulje za ${fullName}`}
        description={`Izrazi saučešća i sećanja na ${fullName}`}
      />

      {/* Compact Header with person info */}
      <div className="bg-text-primary py-4 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            to="/citulje"
            className="inline-flex items-center text-white/60 hover:text-white text-sm mb-3 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Sve čitulje
          </Link>

          {/* Person info - compact horizontal layout */}
          <div className="flex items-center gap-4">
            {person.photo_url ? (
              <img
                src={person.photo_url}
                alt=""
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                <EternalFlame size={24} className="text-rose" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-xl font-semibold text-white truncate">
                {fullName}
              </h1>
              <p className="text-white/70 text-sm">
                {person.date_of_birth && `${formatDate(person.date_of_birth)} - `}
                {formatDate(person.date_of_death)}
                {person.place_of_death && ` · ${person.place_of_death}`}
              </p>
            </div>
            <Link
              to="/citulja/nova"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors"
            >
              <PlusIcon size={14} />
              Ostavi čitulju
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-sand-light border-b border-sand py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-text-secondary text-sm">
            <span className="font-medium text-text-primary">{condolences.length}</span> čitulja
          </p>
          <Link
            to="/citulja/nova"
            className="sm:hidden inline-flex items-center gap-1 text-sky text-sm font-medium"
          >
            <PlusIcon size={14} />
            Ostavi čitulju
          </Link>
        </div>
      </div>

      {/* Grid of condolences */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {condolences.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-soft">
            <EternalFlame size={32} className="text-sand mx-auto mb-3" />
            <p className="text-text-secondary mb-3">Još nema čitulja za {person.first_name}.</p>
            <Link to="/citulja/nova" className="text-sky hover:text-sky-dark text-sm font-medium">
              Budite prvi →
            </Link>
          </div>
        ) : (
          <>
            {/* Compact Grid - responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {condolences.map((condolence) => (
                <article
                  key={condolence.id}
                  className="bg-white rounded-lg shadow-soft p-4"
                >
                  {/* Condolence text - compact */}
                  <p className="text-text-primary text-sm leading-relaxed line-clamp-4">
                    {condolence.content}
                  </p>

                  {/* Footer - signature and date */}
                  <div className="mt-3 pt-2 border-t border-sand/50 flex items-center justify-between">
                    <p className="text-text-primary text-xs font-medium truncate max-w-[60%]">
                      {condolence.from_name || (
                        <span className="text-text-muted italic">Anonimno</span>
                      )}
                    </p>
                    <p className="text-text-muted text-xs">
                      {formatShortDate(condolence.created_at)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Compact CTA */}
            <div className="mt-6 text-center">
              <Link
                to="/citulja/nova"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sand-light hover:bg-sand text-text-primary text-sm font-medium rounded-lg transition-colors"
              >
                <PlusIcon size={14} />
                Ostavi čitulju
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
