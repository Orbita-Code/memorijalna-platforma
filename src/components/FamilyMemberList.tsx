import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { addFamilyMember, removeFamilyMember } from '../lib/livingProfiles'
import type { FamilyMember, AddFamilyMemberInput } from '../types/livingProfile'

interface FamilyMemberListProps {
  profileId: string
  members: FamilyMember[]
  onUpdate: () => void
}

const relationshipLabels: Record<FamilyMember['relationship'], string> = {
  spouse: 'Suprug/a',
  child: 'Dete',
  sibling: 'Brat/sestra',
  parent: 'Roditelj',
  other: 'Drugo',
}

export default function FamilyMemberList({ profileId, members, onUpdate }: FamilyMemberListProps) {
  const { session } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<AddFamilyMemberInput>({
    email: '',
    name: '',
    relationship: 'spouse',
    can_activate: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAdd = async () => {
    if (!session?.user?.id) return

    if (!formData.email.trim() || !formData.name.trim()) {
      setError('Ime i email su obavezni')
      return
    }

    setLoading(true)
    setError(null)

    const { error: addError } = await addFamilyMember(profileId, formData, session.user.id)

    if (addError) {
      setError(addError.message)
    } else {
      setFormData({ email: '', name: '', relationship: 'spouse', can_activate: true })
      setShowForm(false)
      onUpdate()
    }

    setLoading(false)
  }

  const handleRemove = async (memberId: string) => {
    if (!session?.user?.id) return

    if (!confirm('Da li ste sigurni da zelite da uklonite ovog clana?')) return

    setLoading(true)
    await removeFamilyMember(profileId, memberId, session.user.id)
    onUpdate()
    setLoading(false)
  }

  return (
    <div>
      {members.length === 0 ? (
        <p className="text-gray-500 text-sm mb-4">
          Nema dodanih clanova porodice
        </p>
      ) : (
        <ul className="space-y-3 mb-4">
          {members.map(member => (
            <li key={member.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">{member.email}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {relationshipLabels[member.relationship]}
                  </span>
                  {member.can_activate && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Moze aktivirati
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemove(member.id)}
                disabled={loading}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Ukloni
              </button>
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <div className="bg-gray-50 p-4 rounded-md">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ime</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Ime i prezime"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="email@primer.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Odnos</label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="spouse">Suprug/a</option>
                <option value="child">Dete</option>
                <option value="sibling">Brat/sestra</option>
                <option value="parent">Roditelj</option>
                <option value="other">Drugo</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="can_activate"
                  checked={formData.can_activate}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Moze aktivirati memorijal</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Dodavanje...' : 'Dodaj'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
            >
              Otkazi
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Dodaj clana porodice
        </button>
      )}
    </div>
  )
}
