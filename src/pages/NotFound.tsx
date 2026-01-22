import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Stranica nije pronađena (404)"
        description="Stranica koju tražite ne postoji ili je premeštena. Vratite se na početnu stranicu Memorijalne platforme."
      />
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Stranica nije pronađena
      </h2>
      <p className="text-gray-600 mb-8">
        Stranica koju tražite ne postoji.
      </p>
      <Link
        to="/"
        className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Nazad na početnu
      </Link>
      </div>
    </>
  )
}
