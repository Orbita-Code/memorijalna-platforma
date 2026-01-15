import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Layout() {
  const { user, loading, signOut } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
            Memorijalna Platforma
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {!loading && (
              <nav className="flex items-center gap-4">
                <Link
                  to="/memorijali"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {t('nav.memorials')}
                </Link>
                <Link
                  to="/umrlice"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {t('nav.obituaries')}
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/moj-profil"
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      {t('nav.myProfile')}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/prijava"
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/registracija"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      {t('nav.register')}
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © 2024 Memorijalna Platforma
        </div>
      </footer>
    </div>
  )
}
