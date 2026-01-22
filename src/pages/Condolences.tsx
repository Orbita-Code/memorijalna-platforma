import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDeceasedPersonsWithCondolences } from '../lib/deceasedPersons'
import type { DeceasedPerson } from '../types/deceasedPerson'
import SEO from '../components/SEO'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { PlusIcon } from '../components/icons/FeatureIcons'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export default function Condolences() {
  const [persons, setPersons] = useState<DeceasedPerson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPersons()
  }, [])

  const loadPersons = async () => {
    setLoading(true)
    const { data } = await getDeceasedPersonsWithCondolences(100)
    if (data) {
      setPersons(data)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Čitulje - Izrazi saučešća"
        description="Pogledajte čitulje i izraze saučešća. Ostavite svoju čitulju u znak sećanja na voljene."
      />

      {/* Compact Header */}
      <div className="bg-text-primary py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <EternalFlame size={24} className="text-rose" />
            <h1 className="font-serif text-xl font-semibold text-white">
              Čitulje
            </h1>
          </div>
          <Link
            to="/citulja/nova"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            <PlusIcon size={16} />
            Objavi čitulju
          </Link>
        </div>
      </div>

      {/* Grid of deceased persons */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky mx-auto"></div>
          </div>
        ) : persons.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-soft">
            <EternalFlame size={32} className="text-sand mx-auto mb-3" />
            <p className="text-text-secondary mb-3">Trenutno nema objavljenih čitulja.</p>
            <Link to="/citulja/nova" className="text-sky hover:text-sky-dark text-sm font-medium">
              Budite prvi koji će ostaviti čitulju →
            </Link>
          </div>
        ) : (
          <>
            {/* Compact Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {persons.map((person) => (
                <Link
                  key={person.id}
                  to={`/citulje/${person.id}`}
                  className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-all p-3 text-center group"
                >
                  {/* Small photo */}
                  {person.photo_url ? (
                    <img
                      src={person.photo_url}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border border-sand"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-sand-light flex items-center justify-center mx-auto mb-2 border border-sand">
                      <EternalFlame size={20} className="text-rose" />
                    </div>
                  )}

                  {/* Name */}
                  <h2 className="font-serif text-sm font-semibold text-text-primary leading-tight group-hover:text-sky transition-colors">
                    {person.first_name} {person.last_name}
                  </h2>

                  {/* Dates - compact */}
                  <p className="text-text-muted text-xs mt-0.5">
                    {person.date_of_birth && `${formatDate(person.date_of_birth)} - `}
                    {formatDate(person.date_of_death)}
                  </p>

                  {/* Condolence count badge */}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-light/50 text-sky-dark rounded-full text-xs">
                      <EternalFlame size={10} />
                      {person.condolences_count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Compact CTA */}
            <div className="mt-6 text-center">
              <Link
                to="/citulja/nova"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-sand-light hover:bg-sand text-text-primary text-sm font-medium rounded-lg transition-colors"
              >
                <PlusIcon size={14} />
                Objavi čitulju za nekoga ko nije na listi
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
