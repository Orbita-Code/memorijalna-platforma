import { useState } from 'react'
import type { FormEvent } from 'react'
import { createObituaryCondolence } from '../lib/obituaryCondolences'
import type { CreateObituaryCondolenceInput } from '../types/obituaryCondolence'
import { HeartIcon, CheckIcon } from './icons/FeatureIcons'

interface ObituaryCondolenceFormProps {
  obituaryId: string
  deceasedName: string
  onSuccess?: () => void
}

export default function ObituaryCondolenceForm({
  obituaryId,
  deceasedName,
  onSuccess
}: ObituaryCondolenceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<CreateObituaryCondolenceInput>({
    obituary_id: obituaryId,
    sender_name: '',
    sender_email: '',
    sender_phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validacija
    if (!formData.sender_name.trim()) {
      setError('Molimo unesite vaše ime')
      return
    }
    if (!formData.message.trim()) {
      setError('Molimo unesite poruku saučešća')
      return
    }
    if (formData.message.trim().length < 10) {
      setError('Poruka mora imati najmanje 10 karaktera')
      return
    }

    setLoading(true)

    const input: CreateObituaryCondolenceInput = {
      obituary_id: obituaryId,
      sender_name: formData.sender_name.trim(),
      sender_email: formData.sender_email?.trim() || undefined,
      sender_phone: formData.sender_phone?.trim() || undefined,
      message: formData.message.trim(),
    }

    const { error: submitError } = await createObituaryCondolence(input)

    if (submitError) {
      setError('Greška pri slanju saučešća. Pokušajte ponovo.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Reset forme nakon 3 sekunde
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        obituary_id: obituaryId,
        sender_name: '',
        sender_email: '',
        sender_phone: '',
        message: '',
      })
      onSuccess?.()
    }, 3000)
  }

  if (success) {
    return (
      <div className="bg-sage-light/30 border-2 border-sage rounded-xl p-6 text-center">
        <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon size={28} className="text-sage-dark" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Saučešće je poslato
        </h3>
        <p className="text-text-secondary">
          Vaša poruka saučešća je prosleđena porodici. Hvala vam.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-rose-light rounded-full flex items-center justify-center">
          <HeartIcon size={24} className="text-rose" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            Izjavite saučešće porodici
          </h3>
          <p className="text-text-secondary text-sm">
            Vaša poruka će biti prosleđena porodici {deceasedName}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-light border-2 border-rose text-rose-dark px-4 py-3 rounded-lg mb-4 text-base">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ime pošiljaoca */}
        <div>
          <label htmlFor="sender_name" className="block text-base font-medium text-text-primary mb-2">
            Vaše ime <span className="text-rose">*</span>
          </label>
          <input
            type="text"
            id="sender_name"
            name="sender_name"
            value={formData.sender_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-base border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
            placeholder="npr. Marko i Ana Petrović"
          />
        </div>

        {/* Poruka */}
        <div>
          <label htmlFor="message" className="block text-base font-medium text-text-primary mb-2">
            Vaša poruka <span className="text-rose">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 text-base border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
            placeholder="Napišite vašu poruku saučešća..."
          />
          <p className="text-text-muted text-sm mt-1">
            Minimum 10 karaktera
          </p>
        </div>

        {/* Kontakt informacije (opciono) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sender_email" className="block text-base font-medium text-text-primary mb-2">
              Email <span className="text-text-muted font-normal">(opciono)</span>
            </label>
            <input
              type="email"
              id="sender_email"
              name="sender_email"
              value={formData.sender_email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
              placeholder="vas@email.com"
            />
          </div>
          <div>
            <label htmlFor="sender_phone" className="block text-base font-medium text-text-primary mb-2">
              Telefon <span className="text-text-muted font-normal">(opciono)</span>
            </label>
            <input
              type="tel"
              id="sender_phone"
              name="sender_phone"
              value={formData.sender_phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-base border-2 border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
              placeholder="063 123 456"
            />
          </div>
        </div>

        <p className="text-text-muted text-sm">
          Kontakt informacije su opcione i služe samo ako porodica želi da vam se zahvali.
        </p>

        {/* Dugme za slanje */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose hover:bg-rose-dark text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
              Slanje...
            </>
          ) : (
            <>
              <HeartIcon size={20} />
              Pošalji saučešće
            </>
          )}
        </button>

        <p className="text-center text-text-muted text-sm">
          Saučešće je besplatno i privatno - vidi ga samo porodica.
        </p>
      </form>
    </div>
  )
}
