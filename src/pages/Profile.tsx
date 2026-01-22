import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserMemorials } from '../lib/memorials'
import { getUserObituaries } from '../lib/obituaries'
import type { Memorial } from '../types/memorial'
import type { Obituary } from '../types/obituary'
import SEO from '../components/SEO'
import { UserIcon, MemorialIcon, QuillIcon, PlusIcon } from '../components/icons/FeatureIcons'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [obituaries, setObituaries] = useState<Obituary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadUserData()
    }
  }, [user?.id])

  const loadUserData = async () => {
    if (!user?.id) return
    setLoading(true)

    const [memorialsResult, obituariesResult] = await Promise.all([
      getUserMemorials(user.id),
      getUserObituaries(user.id)
    ])

    if (memorialsResult.data) {
      setMemorials(memorialsResult.data)
    }
    if (obituariesResult.data) {
      setObituaries(obituariesResult.data)
    }

    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Nepoznato'
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="tag-sage">Objavljeno</span>
      case 'draft':
        return <span className="tag-sky">Nacrt</span>
      case 'archived':
        return <span className="tag-rose">Arhivirano</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Moj profil"
        description="Upravljajte svojim profilom, memorijalima i umrlicama na Memorial platformi."
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl font-medium text-text-primary mb-8">Moj profil</h1>

        {/* Korisnički podaci */}
        <section className="card p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center">
              <UserIcon size={24} className="text-sky-dark" />
            </div>
            <div>
              <h2 className="font-semibold text-text-primary">Podaci o nalogu</h2>
              <p className="text-text-secondary text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">Email</label>
              <p className="text-text-primary">{user?.email}</p>
            </div>
            <div>
              <label className="label">Nalog kreiran</label>
              <p className="text-text-primary">{formatDate(user?.created_at)}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn-secondary text-rose hover:text-rose-dark hover:border-rose"
          >
            Odjavi se
          </button>
        </section>

        {/* Moji memorijali */}
        <section className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center">
                <MemorialIcon size={20} className="text-sage" />
              </div>
              <h2 className="font-semibold text-text-primary">Moji memorijali</h2>
            </div>
            <Link to="/kreiraj-memorijal" className="btn-primary flex items-center gap-2">
              <PlusIcon size={16} />
              <span className="hidden sm:inline">Novi memorijal</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-text-secondary">Učitavanje...</div>
          ) : memorials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">Još nemate kreiranih memorijala.</p>
              <Link to="/kreiraj-memorijal" className="text-sky hover:text-sky-dark font-medium">
                Kreirajte prvi memorijal →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {memorials.map(memorial => (
                <Link
                  key={memorial.id}
                  to={`/memorijal/${memorial.id}`}
                  className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {memorial.first_name} {memorial.last_name}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {memorial.birth_date} — {memorial.death_date}
                    </p>
                  </div>
                  <span className="text-sky-dark">→</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Moje umrlice */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
                <QuillIcon size={20} className="text-rose" />
              </div>
              <h2 className="font-semibold text-text-primary">Moje umrlice</h2>
            </div>
            <Link to="/umrlica/nova" className="btn-primary flex items-center gap-2">
              <PlusIcon size={16} />
              <span className="hidden sm:inline">Nova umrlica</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-text-secondary">Učitavanje...</div>
          ) : obituaries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">Još nemate kreiranih umrlica.</p>
              <Link to="/umrlica/nova" className="text-sky hover:text-sky-dark font-medium">
                Kreirajte prvu umrlicu →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {obituaries.map(obituary => (
                <Link
                  key={obituary.id}
                  to={`/umrlica/${obituary.id}`}
                  className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-text-primary">
                        {obituary.first_name} {obituary.last_name}
                      </h3>
                      {getStatusBadge(obituary.status)}
                    </div>
                    <p className="text-text-secondary text-sm">
                      {obituary.date_of_death ? formatDate(obituary.date_of_death) : 'Datum nije naveden'}
                      {obituary.funeral_location && ` • ${obituary.funeral_location}`}
                    </p>
                  </div>
                  <span className="text-sky-dark">→</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
