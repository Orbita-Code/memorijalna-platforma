import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SEO from '../components/SEO'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      setError('Došlo je do greške. Proverite da li je email adresa ispravna.')
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <SEO
          title="Email poslat - Resetovanje lozinke"
          description="Link za resetovanje lozinke je poslat na vašu email adresu."
        />
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Proverite email
              </h2>
              <p className="text-gray-600 mb-6">
                Poslali smo link za resetovanje lozinke na adresu <strong>{email}</strong>.
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sky-800 text-sm">
                  <strong>Šta dalje?</strong>
                </p>
                <ol className="text-sky-700 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>Otvorite vaš email (proverite i spam folder)</li>
                  <li>Kliknite na link u emailu</li>
                  <li>Unesite novu lozinku</li>
                </ol>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Niste dobili email? Proverite spam folder ili
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                pokušajte ponovo
              </button>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/prijava"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Nazad na prijavu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Zaboravljena lozinka - Resetujte lozinku"
        description="Resetujte lozinku za vaš Memorial nalog. Unesite email adresu i poslaćemo vam link za kreiranje nove lozinke."
      />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Zaboravili ste lozinku?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Unesite email adresu i poslaćemo vam link za resetovanje lozinke.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email adresa
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="vas@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Slanje...' : 'Pošalji link za resetovanje'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Setili ste se lozinke?{' '}
              <Link to="/prijava" className="text-blue-600 hover:text-blue-700 font-medium">
                Prijavite se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
