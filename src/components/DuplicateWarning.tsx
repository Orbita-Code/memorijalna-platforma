import { Link } from 'react-router-dom'
import { getSimilarityLabel, getSimilarityColor } from '../lib/duplicateDetection'
import type { DuplicateMatch } from '../lib/duplicateDetection'

interface DuplicateWarningProps {
  matches: DuplicateMatch[]
  onProceed: () => void
  onCancel: () => void
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function DuplicateWarning({ matches, onProceed, onCancel }: DuplicateWarningProps) {
  if (matches.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">&#9888;</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Moguce dupliranje
              </h2>
              <p className="text-sm text-gray-600">
                Pronadjeni su memorijali koji mogu biti ista osoba
              </p>
            </div>
          </div>
        </div>

        {/* Matches list */}
        <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">
            Pre nego sto nastavite, proverite da li memorijal za ovu osobu vec postoji:
          </p>

          <ul className="space-y-3">
            {matches.map(match => (
              <li
                key={match.memorial.id}
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Link
                      to={`/memorijal/${match.memorial.id}`}
                      target="_blank"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {match.memorial.first_name} {match.memorial.last_name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {match.memorial.date_of_birth && formatDate(match.memorial.date_of_birth)}
                      {match.memorial.date_of_birth && ' - '}
                      {formatDate(match.memorial.date_of_death)}
                    </p>
                    {match.memorial.place_of_death && (
                      <p className="text-sm text-gray-500">
                        {match.memorial.place_of_death}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {match.matchedFields.map(field => (
                        <span
                          key={field}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${getSimilarityColor(match.score)}`}>
                      {match.score}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {getSimilarityLabel(match.score)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Otkazi
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Kreiraj ipak
          </button>
        </div>
      </div>
    </div>
  )
}
