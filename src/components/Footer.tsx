import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon } from './icons/FeatureIcons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sand border-t border-border-light">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-8">

          {/* Logo & Description */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="inline-block font-serif text-2xl font-semibold text-text-primary hover:text-sky-dark transition-colors"
            >
              Memorial
            </Link>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-sm">
              Digitalni memorijali koji čuvaju uspomene, priče i ljubav - zauvek.
              Mesto za trajno sećanje na one koje volimo.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-sky-dark transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-sky-dark transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={22} />
              </a>
            </div>
          </div>

          {/* Usluge */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Usluge</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/memorijali" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Memorijali
                </Link>
              </li>
              <li>
                <Link to="/citulje" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Čitulje
                </Link>
              </li>
              <li>
                <Link to="/umrlice" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Umrlice
                </Link>
              </li>
              <li>
                <Link to="/kreiraj-memorijal" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kreiraj memorijal
                </Link>
              </li>
            </ul>
          </div>

          {/* Informacije */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Informacije</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/o-nama" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  O platformi
                </Link>
              </li>
              <li>
                <Link to="/kako-funkcionise" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kako funkcioniše
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Često postavljana pitanja
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Podrška porodicama */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Podrška porodicama</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/kako-napisati-citulju" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kako napisati čitulju
                </Link>
              </li>
              <li>
                <Link to="/kako-ostaviti-posvetu" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kako ostaviti posvetu
                </Link>
              </li>
              <li>
                <Link to="/kako-se-nositi-sa-gubitkom" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kako se nositi sa gubitkom
                </Link>
              </li>
              <li>
                <Link to="/kako-sacuvati-uspomene" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kako sačuvati uspomene
                </Link>
              </li>
              <li>
                <Link to="/dobrotvorne-organizacije" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Dobrotvorne organizacije
                </Link>
              </li>
            </ul>
          </div>

          {/* Partneri */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Partneri</h3>
            <ul className="space-y-3 mb-4">
              <li>
                <Link to="/pogrebna-preduzeca" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Pogrebna preduzeća
                </Link>
              </li>
              <li>
                <Link to="/kamenorezacke-radnje" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Kamenorezačke radnje
                </Link>
              </li>
              <li>
                <Link to="/groblja" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Groblja
                </Link>
              </li>
              <li>
                <Link to="/qr-partneri" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  QR pločice za spomenike
                </Link>
              </li>
            </ul>
            <Link
              to="/postani-partner"
              className="inline-block bg-sky/10 text-sky-dark hover:bg-sky/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Postani partner
            </Link>
          </div>

          {/* Pravno */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Pravno</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/uslovi-koriscenja" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Uslovi korišćenja
                </Link>
              </li>
              <li>
                <Link to="/privatnost" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link to="/bezbednost" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Bezbednost podataka
                </Link>
              </li>
              <li>
                <Link to="/prijava-sadrzaja" className="text-text-secondary hover:text-sky-dark transition-colors text-sm">
                  Prijava sadržaja
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} Memorial. Sva prava zadržana. Powered by <a href="https://orbitacode.com" target="_blank" rel="noopener noreferrer" className="text-sky hover:text-sky-dark transition-colors">OrbitaCode</a>
            </p>
                      </div>
        </div>
      </div>
    </footer>
  )
}
