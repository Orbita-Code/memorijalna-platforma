import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { getRecentMemorials } from '../lib/memorials'
import type { Memorial } from '../types/memorial'
import MemorialCard from '../components/MemorialCard'

export default function Home() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [recentMemorials, setRecentMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecentMemorials()
  }, [])

  const loadRecentMemorials = async () => {
    const { data } = await getRecentMemorials(6)
    if (data) {
      setRecentMemorials(data)
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/kreiraj-memorijal"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('memorial.create')}
                </Link>
              ) : (
                <Link
                  to="/registracija"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {t('home.getStarted')}
                </Link>
              )}
              <Link
                to="/memorijali"
                className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t('memorial.viewAll')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          Zasto izabrati nas
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">&#128220;</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('home.features.memorials')}
            </h3>
            <p className="text-gray-600 text-sm">
              Kreirajte trajni digitalni memorijal za vase voljene
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">&#128240;</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('home.features.obituaries')}
            </h3>
            <p className="text-gray-600 text-sm">
              Objavite umrlicu sa svim detaljima sahrane
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">&#128150;</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('home.features.donations')}
            </h3>
            <p className="text-gray-600 text-sm">
              Prikupljajte donacije za dobrotvorne svrhe
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">&#128367;</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('home.features.gifts')}
            </h3>
            <p className="text-gray-600 text-sm">
              Posaljite virtuelne svece, cvece i vence
            </p>
          </div>
        </div>
      </div>

      {/* Recent Memorials Section */}
      {recentMemorials.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t('home.recentMemorials')}
              </h2>
              <Link
                to="/memorijali"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Pogledaj sve &rarr;
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentMemorials.map(memorial => (
                  <MemorialCard key={memorial.id} memorial={memorial} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Zapocnite danas
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Kreirajte dostojanstven memorijal za vase voljene i sacuvajte uspomene zauvek.
          </p>
          {user ? (
            <Link
              to="/kreiraj-memorijal"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Kreiraj memorijal
            </Link>
          ) : (
            <Link
              to="/registracija"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Besplatna registracija
            </Link>
          )}
        </div>
      </div>

      {/* Footer features */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">11</div>
            <div className="text-gray-600">Podrzanih jezika</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">&#8734;</div>
            <div className="text-gray-600">Trajno cuvanje</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Uvek dostupno</div>
          </div>
        </div>
      </div>
    </div>
  )
}
