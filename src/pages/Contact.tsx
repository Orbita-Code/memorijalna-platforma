import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  CheckIcon
} from '../components/icons/FeatureIcons'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory">
        <SEO
          title="Kontakt - Javite nam se"
          description="Kontaktirajte Memorial tim. Tu smo da odgovorimo na vaša pitanja i pomognemo vam da kreirate dostojanstven memorijal za vašu voljenu osobu."
        />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="card p-8">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon size={32} className="text-sage-dark" />
            </div>
            <h1 className="heading-2 mb-4">Poruka je poslata!</h1>
            <p className="text-text-secondary mb-6">
              Hvala vam na poruci. Odgovorićemo vam u najkraćem mogućem roku,
              obično u roku od 24 sata.
            </p>
            <Link to="/" className="btn-primary">
              Nazad na početnu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <SEO
        title="Kontakt - Javite nam se"
        description="Kontaktirajte Memorial tim. Tu smo da odgovorimo na vaša pitanja i pomognemo vam da kreirate dostojanstven memorijal za vašu voljenu osobu."
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-ivory py-16 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-text-primary mb-6">
            Kontaktirajte nas
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Imate pitanje ili vam je potrebna pomoć? Tu smo za vas.
            Pišite nam i odgovorićemo u najkraćem roku.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Kontakt informacije */}
          <div className="lg:col-span-1">
            <h2 className="heading-2 mb-6">Informacije</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center flex-shrink-0">
                  <EmailIcon size={20} className="text-sky-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                  <a href="mailto:info@memorijalna-platforma.rs" className="text-sky hover:text-sky-dark">
                    info@memorijalna-platforma.rs
                  </a>
                  <p className="text-text-muted text-sm mt-1">
                    Odgovaramo u roku od 24 sata
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <PhoneIcon size={20} className="text-sage" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Telefon</h3>
                  <a href="tel:+381111234567" className="text-sky hover:text-sky-dark">
                    +381 11 123 4567
                  </a>
                  <p className="text-text-muted text-sm mt-1">
                    Pon - Pet, 09:00 - 17:00
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center flex-shrink-0">
                  <LocationIcon size={20} className="text-rose" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Adresa</h3>
                  <p className="text-text-secondary">
                    Beograd, Srbija
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    Online platforma
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <ClockIcon size={20} className="text-text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Radno vreme podrške</h3>
                  <p className="text-text-secondary">
                    Ponedeljak - Petak: 09:00 - 17:00<br />
                    Subota: 10:00 - 14:00<br />
                    Nedelja: Zatvoreno
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-8 p-6 bg-sand-light rounded-xl">
              <h3 className="font-semibold text-text-primary mb-2">
                Često postavljana pitanja
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Možda ćete pronaći odgovor na svoje pitanje u našem FAQ odeljku.
              </p>
              <Link to="/faq" className="text-sky hover:text-sky-dark font-medium text-sm">
                Pogledaj FAQ →
              </Link>
            </div>
          </div>

          {/* Kontakt forma */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="heading-2 mb-6">Pošaljite nam poruku</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Ime i prezime *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Vaše ime"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email adresa *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="vas@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="label">Tema *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Izaberite temu</option>
                    <option value="opste">Opšte pitanje</option>
                    <option value="memorijal">Pomoć sa memorijalnom</option>
                    <option value="tehnicko">Tehnički problem</option>
                    <option value="partnerstvo">Partnerstvo / Oglašavanje</option>
                    <option value="mediji">Medijski upit</option>
                    <option value="drugo">Drugo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label">Poruka *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input resize-none"
                    placeholder="Opišite vaše pitanje ili poruku..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Slanje...
                    </>
                  ) : (
                    'Pošalji poruku'
                  )}
                </button>

                <p className="text-text-muted text-sm text-center">
                  Slanjem poruke prihvatate našu{' '}
                  <Link to="/privatnost" className="text-sky hover:text-sky-dark underline">
                    politiku privatnosti
                  </Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Dodatne opcije */}
      <section className="py-12 bg-sand-light border-t border-border-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="heading-2 mb-8">Druge opcije</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link to="/faq" className="card card-hover p-6 text-center group">
              <h3 className="font-semibold text-text-primary mb-2 group-hover:text-sky-dark transition-colors">
                FAQ
              </h3>
              <p className="text-text-secondary text-sm">
                Najčešća pitanja i odgovori
              </p>
            </Link>
            <Link to="/kako-funkcionise" className="card card-hover p-6 text-center group">
              <h3 className="font-semibold text-text-primary mb-2 group-hover:text-sky-dark transition-colors">
                Kako funkcioniše
              </h3>
              <p className="text-text-secondary text-sm">
                Vodič za kreiranje memorijala
              </p>
            </Link>
            <Link to="/postani-partner" className="card card-hover p-6 text-center group">
              <h3 className="font-semibold text-text-primary mb-2 group-hover:text-sky-dark transition-colors">
                Za partnere
              </h3>
              <p className="text-text-secondary text-sm">
                Registracija pogrebnih usluga
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
