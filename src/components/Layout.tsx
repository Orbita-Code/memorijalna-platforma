import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'
import Footer from './Footer'
import { MenuIcon, CloseIcon, UserIcon, MemorialIcon, QuillIcon, DocumentIcon, LoginIcon, LogoutIcon, PlusIcon, BookIcon, HomeIcon } from './icons/FeatureIcons'

export default function Layout() {
  const { user, loading, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* Header - Pojednostavljen za starije korisnike */}
      <header className="bg-white border-b-2 border-sand sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo - Veći i jasniji */}
            <Link
              to="/"
              className="font-serif text-2xl lg:text-3xl font-semibold text-text-primary hover:text-sky-dark transition-colors"
            >
              Memorial
            </Link>

            {/* Desktop Navigation - Jednostavna, veća dugmad */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                to="/"
                className={`px-5 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-sky text-white'
                    : 'text-text-primary hover:bg-sand-light'
                }`}
              >
                Početna
              </Link>
              <Link
                to="/memorijali"
                className={`px-5 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive('/memorijali')
                    ? 'bg-sky text-white'
                    : 'text-text-primary hover:bg-sand-light'
                }`}
              >
                Memorijali
              </Link>
              <Link
                to="/citulje"
                className={`px-5 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive('/citulje')
                    ? 'bg-sky text-white'
                    : 'text-text-primary hover:bg-sand-light'
                }`}
              >
                Čitulje
              </Link>
              <Link
                to="/umrlice"
                className={`px-5 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive('/umrlice')
                    ? 'bg-sky text-white'
                    : 'text-text-primary hover:bg-sand-light'
                }`}
              >
                Umrlice
              </Link>
              <Link
                to="/tvoja-prica"
                className={`px-5 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive('/tvoja-prica')
                    ? 'bg-sage text-white'
                    : 'text-sage-dark hover:bg-sage-light/50'
                }`}
              >
                Tvoja Priča
              </Link>
            </nav>

            {/* Right Side - Pojednostavljeno, bez dropdown-a */}
            <div className="hidden lg:flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link
                        to="/profil"
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                          isActive('/profil')
                            ? 'bg-sky text-white'
                            : 'text-text-primary hover:bg-sand-light'
                        }`}
                      >
                        <UserIcon size={22} />
                        <span>Moj nalog</span>
                      </Link>
                      <button
                        onClick={signOut}
                        className="px-4 py-3 rounded-lg text-lg font-medium text-text-secondary hover:bg-rose-light hover:text-rose transition-colors"
                      >
                        Odjava
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/prijava"
                      className="px-5 py-3 rounded-lg text-lg font-medium text-text-primary hover:bg-sand-light transition-colors border-2 border-sand"
                    >
                      Prijava
                    </Link>
                  )}

                  <Link
                    to="/kreiraj-memorijal"
                    className="px-6 py-3 bg-sky hover:bg-sky-dark text-white text-lg font-semibold rounded-lg transition-colors"
                  >
                    + Kreiraj memorijal
                  </Link>
                </>
              )}

              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button - Veće */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 text-text-primary hover:bg-sand-light rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              {mobileMenuOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Veće stavke, jasnije, bez emojija */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-sand bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              <Link
                to="/"
                className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-sky text-white'
                    : 'text-text-primary bg-sand-light hover:bg-sand'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HomeIcon size={24} />
                Početna
              </Link>
              <Link
                to="/memorijali"
                className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors ${
                  isActive('/memorijali')
                    ? 'bg-sky text-white'
                    : 'text-text-primary bg-sand-light hover:bg-sand'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MemorialIcon size={24} />
                Memorijali
              </Link>
              <Link
                to="/citulje"
                className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors ${
                  isActive('/citulje')
                    ? 'bg-sky text-white'
                    : 'text-text-primary bg-sand-light hover:bg-sand'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <QuillIcon size={24} />
                Čitulje
              </Link>
              <Link
                to="/umrlice"
                className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors ${
                  isActive('/umrlice')
                    ? 'bg-sky text-white'
                    : 'text-text-primary bg-sand-light hover:bg-sand'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <DocumentIcon size={24} />
                Umrlice
              </Link>
              <Link
                to="/tvoja-prica"
                className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors ${
                  isActive('/tvoja-prica')
                    ? 'bg-sage text-white'
                    : 'text-sage-dark bg-sage-light/30 hover:bg-sage-light/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookIcon size={24} />
                Tvoja Priča
              </Link>

              <div className="border-t-2 border-sand my-4 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Link
                          to="/profil"
                          className={`flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium transition-colors mb-3 ${
                            isActive('/profil')
                              ? 'bg-sky text-white'
                              : 'text-text-primary bg-sand-light hover:bg-sand'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserIcon size={24} />
                          Moj nalog
                        </Link>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false)
                            signOut()
                          }}
                          className="w-full flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium text-rose bg-rose-light hover:bg-rose hover:text-white transition-colors mb-3"
                        >
                          <LogoutIcon size={24} />
                          Odjava
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/prijava"
                        className="flex items-center gap-3 px-5 py-4 rounded-lg text-xl font-medium text-text-primary bg-sand-light hover:bg-sand transition-colors mb-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LoginIcon size={24} />
                        Prijava
                      </Link>
                    )}

                    <Link
                      to="/kreiraj-memorijal"
                      className="flex items-center justify-center gap-2 px-5 py-4 bg-sky hover:bg-sky-dark text-white text-xl font-semibold rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusIcon size={24} />
                      Kreiraj memorijal
                    </Link>
                  </>
                )}
              </div>

              <div className="pt-4 border-t-2 border-sand">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
