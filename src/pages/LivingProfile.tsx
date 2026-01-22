import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserLivingProfile, updateLivingProfile, publishLivingProfile } from '../lib/livingProfiles'
import type { LivingProfile as LivingProfileType, UpdateLivingProfileInput } from '../types/livingProfile'
import FamilyMemberList from '../components/FamilyMemberList'
import SEO from '../components/SEO'

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function LivingProfile() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<LivingProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<UpdateLivingProfileInput>({})

  useEffect(() => {
    if (session?.user?.id) {
      loadProfile()
    }
  }, [session?.user?.id])

  const loadProfile = async () => {
    if (!session?.user?.id) return

    const { data, error: fetchError } = await getUserLivingProfile(session.user.id)

    if (fetchError || !data) {
      navigate('/moj-profil/kreiraj')
      return
    }

    setProfile(data)
    setFormData({
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      place_of_birth: data.place_of_birth,
      father_name: data.father_name,
      mother_name: data.mother_name,
      biography: data.biography,
    })
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!profile || !session?.user?.id) return

    setSaving(true)
    setError(null)

    const { data, error: updateError } = await updateLivingProfile(
      profile.id,
      formData,
      session.user.id
    )

    if (updateError) {
      setError(updateError.message)
    } else if (data) {
      setProfile(data)
      setEditing(false)
    }

    setSaving(false)
  }

  const handlePublish = async () => {
    if (!profile || !session?.user?.id) return

    setSaving(true)
    const { data, error: publishError } = await publishLivingProfile(profile.id, session.user.id)

    if (publishError) {
      setError(publishError.message)
    } else if (data) {
      setProfile(data)
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  if (profile.status === 'converted') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">&#10004;</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Profil je aktiviran</h1>
          <p className="text-gray-600 mb-4">
            Vas zivotni profil je konvertovan u memorijal.
          </p>
          {profile.converted_memorial_id && (
            <Link
              to={`/memorijal/${profile.converted_memorial_id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Pogledaj memorijal
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title="Moj Životni Profil"
        description="Upravljajte vašim životnim profilom. Pripremite memorijal dok ste još živi i kontrolišite kako želite da vas pamte."
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Moj zivotni profil
              </h1>
            <p className="text-gray-600">
              {profile.status === 'draft' ? 'Nacrt - nije vidljiv drugima' : 'Aktivan profil'}
            </p>
          </div>
          <div className="flex gap-2">
            {profile.status === 'draft' && (
              <button
                onClick={handlePublish}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Objavi
              </button>
            )}
            <button
              onClick={() => setEditing(!editing)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              {editing ? 'Otkazi' : 'Izmeni'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {profile.status === 'active' ? 'Aktivan' : 'Nacrt'}
          </span>
          <span className="text-sm text-gray-500">
            Azurirano: {formatDate(profile.updated_at)}
          </span>
        </div>

        {editing ? (
          /* Edit Mode */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ime</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezime</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Datum rodjenja</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mesto rodjenja</label>
                <input
                  type="text"
                  name="place_of_birth"
                  value={formData.place_of_birth || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biografija</label>
              <textarea
                name="biography"
                value={formData.biography || ''}
                onChange={handleChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Cuvanje...' : 'Sacuvaj izmene'}
            </button>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Ime i prezime</span>
                <p className="font-medium">{profile.first_name} {profile.last_name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Datum rodjenja</span>
                <p className="font-medium">{formatDate(profile.date_of_birth)}</p>
              </div>
              {profile.place_of_birth && (
                <div>
                  <span className="text-sm text-gray-500">Mesto rodjenja</span>
                  <p className="font-medium">{profile.place_of_birth}</p>
                </div>
              )}
              {profile.father_name && (
                <div>
                  <span className="text-sm text-gray-500">Ime oca</span>
                  <p className="font-medium">{profile.father_name}</p>
                </div>
              )}
            </div>

            {profile.biography && (
              <div>
                <span className="text-sm text-gray-500">Biografija</span>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{profile.biography}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Family Members */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Clanovi porodice</h2>
        <p className="text-sm text-gray-600 mb-4">
          Ovi clanovi porodice mogu aktivirati vas memorijal kada dodje vreme.
        </p>
        <FamilyMemberList
          profileId={profile.id}
          members={profile.family_members || []}
          onUpdate={loadProfile}
        />
      </div>

      {/* Activation Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Kako aktivacija funkcionise
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>&#8226; Kada dodje vreme, porodica ce moci da aktivira vas memorijal</li>
          <li>&#8226; Moraju uneti tajnu frazu koju ste podesili</li>
          <li>&#8226; Vas profil ce se automatski konvertovati u memorijal</li>
          <li>&#8226; Svi podaci i biografija ce biti sacuvani</li>
        </ul>

        {profile.activation_settings?.secret_phrase && (
          <div className="mt-4 p-3 bg-white rounded border">
            <span className="text-sm text-gray-500">Vasa tajna fraza:</span>
            <p className="font-mono text-gray-800">{profile.activation_settings.secret_phrase}</p>
          </div>
        )}
        </div>
      </div>
    </>
  )
}
