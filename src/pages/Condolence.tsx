import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCondolenceById } from '../lib/condolences'
import type { Condolence as CondolenceType } from '../types/condolence'
import SEO from '../components/SEO'
import ShareButtons from '../components/ShareButtons'
import { EternalFlame } from '../components/icons/ReligiousSymbols'
import { ArrowRightIcon } from '../components/icons/FeatureIcons'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Condolence() {
  const { id } = useParams<{ id: string }>()
  const [condolence, setCondolence] = useState<CondolenceType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadCondolence()
    }
  }, [id])

  const loadCondolence = async () => {
    if (!id) return
    setLoading(true)
    const { data, error: fetchError } = await getCondolenceById(id)
    if (fetchError) {
      setError('Čitulja nije pronađena')
    } else {
      setCondolence(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky"></div>
      </div>
    )
  }

  if (error || !condolence) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-rose-light border-2 border-rose text-rose-dark px-6 py-4 rounded-lg text-center text-lg">
            {error || 'Čitulja nije pronađena'}
          </div>
          <div className="text-center mt-6">
            <Link to="/citulje" className="text-sky hover:text-sky-dark font-medium">
              ← Nazad na sve čitulje
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory py-8">
      <SEO
        title={`Čitulja za ${condolence.deceased_first_name} ${condolence.deceased_last_name}`}
        description={condolence.content.substring(0, 160)}
      />

      <div className="max-w-2xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/citulje" className="text-text-secondary hover:text-sky transition-colors">
            ← Sve čitulje
          </Link>
        </div>

        {/* Kartica čitulje */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          {/* Header */}
          <div className="bg-text-primary p-8 text-center">
            <EternalFlame size={40} className="text-rose mx-auto mb-4" />

            {condolence.photo_url && (
              <div className="mb-4">
                <img
                  src={condolence.photo_url}
                  alt={`${condolence.deceased_first_name} ${condolence.deceased_last_name}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white mx-auto"
                />
              </div>
            )}

            <h1 className="font-serif text-3xl font-semibold text-white mb-2">
              {condolence.deceased_first_name} {condolence.deceased_last_name}
            </h1>

            {(condolence.date_of_birth || condolence.date_of_death) && (
              <p className="text-white/80 text-lg">
                {condolence.date_of_birth && formatDate(condolence.date_of_birth)}
                {condolence.date_of_birth && condolence.date_of_death && ' – '}
                {condolence.date_of_death && formatDate(condolence.date_of_death)}
              </p>
            )}
          </div>

          {/* Tekst čitulje */}
          <div className="p-8">
            <p className="text-text-primary text-lg leading-relaxed whitespace-pre-wrap">
              {condolence.content}
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-sand-light border-t border-sand">
            <div className="flex items-center justify-between">
              <div>
                {condolence.from_name ? (
                  <p className="text-text-primary font-medium">
                    Od: {condolence.from_name}
                  </p>
                ) : (
                  <p className="text-text-secondary italic">
                    Anonimna čitulja
                  </p>
                )}
              </div>
              <p className="text-text-muted text-sm">
                {formatDate(condolence.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-6 bg-white rounded-xl shadow-soft p-6">
          <ShareButtons
            url={`/citulja/${condolence.id}`}
            title={`${condolence.deceased_first_name} ${condolence.deceased_last_name}`}
            description={condolence.content.substring(0, 150)}
            type="condolence"
          />
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary mb-4">
            Želite i vi da ostavite čitulju?
          </p>
          <Link
            to="/citulja/nova"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky hover:bg-sky-dark text-white text-lg font-semibold rounded-lg transition-colors"
          >
            Objavi čitulju
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
