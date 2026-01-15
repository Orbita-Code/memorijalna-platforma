import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Nepoznato'
    return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Moj profil</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Email
          </label>
          <p className="text-lg text-gray-900">{user?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Nalog kreiran
          </label>
          <p className="text-lg text-gray-900">
            {formatDate(user?.created_at)}
          </p>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  )
}
