import { useState, useRef } from 'react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'

interface QRCodeGeneratorProps {
  memorialId: string
  memorialName: string
  isUnlocked?: boolean // Da li je korisnik kupio QR
  onPurchase?: () => void
}

export default function QRCodeGenerator({
  memorialId,
  memorialName,
  isUnlocked = false,
  onPurchase
}: QRCodeGeneratorProps) {
  const [showModal, setShowModal] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // URL koji QR kod sadrži
  const memorialUrl = `${window.location.origin}/memorijal/${memorialId}`

  // Download kao PNG
  const downloadPNG = () => {
    setDownloading(true)
    const canvas = canvasRef.current?.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = `qr-memorijal-${memorialName.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    setDownloading(false)
  }

  // Download kao SVG
  const downloadSVG = () => {
    setDownloading(true)
    const svg = document.getElementById('qr-svg')
    if (svg) {
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svg)
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const link = document.createElement('a')
      link.download = `qr-memorijal-${memorialName.replace(/\s+/g, '-').toLowerCase()}.svg`
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    }
    setDownloading(false)
  }

  return (
    <>
      {/* Dugme za otvaranje modala */}
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-text-primary hover:bg-text-primary/90 text-white rounded-lg font-medium transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        QR kod za spomenik
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-sand px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold text-text-primary">QR kod za spomenik</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-sand-light rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* QR Preview */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white border-2 border-sand rounded-xl shadow-soft">
                  <QRCodeSVG
                    id="qr-svg"
                    value={memorialUrl}
                    size={180}
                    level="H"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#2F3A40"
                  />
                </div>
              </div>

              {/* Hidden canvas for PNG download */}
              <div ref={canvasRef} className="hidden">
                <QRCodeCanvas
                  value={memorialUrl}
                  size={400}
                  level="H"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#2F3A40"
                />
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <p className="text-text-primary font-medium mb-1">{memorialName}</p>
                <p className="text-text-secondary text-sm break-all">{memorialUrl}</p>
              </div>

              {isUnlocked ? (
                /* Otključano - prikaži download opcije */
                <div className="space-y-4">
                  <div className="bg-sage-light/30 border border-sage/30 rounded-lg p-4 text-center">
                    <svg className="w-8 h-8 text-sage mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sage-dark font-medium">QR kod je otključan</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={downloadPNG}
                      disabled={downloading}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-sky hover:bg-sky-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      PNG
                    </button>
                    <button
                      onClick={downloadSVG}
                      disabled={downloading}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-sky hover:bg-sky-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      SVG
                    </button>
                  </div>

                  {/* Uputstvo */}
                  <div className="mt-6 p-4 bg-sand-light rounded-lg">
                    <h3 className="font-medium text-text-primary mb-2">Kako koristiti QR kod?</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• <strong>PNG</strong> — za štampu na papiru, stickeru</li>
                      <li>• <strong>SVG</strong> — za gravuru, veći kvalitet</li>
                    </ul>
                    <p className="text-sm text-text-secondary mt-3">
                      Odnesite fajl u foto-radnju ili štampariju za izradu pločice.
                    </p>
                  </div>

                  {/* Upozorenje */}
                  <div className="p-4 bg-rose-light/30 border border-rose/30 rounded-lg">
                    <p className="text-sm text-rose-dark">
                      <strong>Važno:</strong> Ne preporučujemo gravuru direktno na kamen.
                      Koristite lepljive pločice (keramika, metal, sticker) koje se mogu zameniti.
                    </p>
                  </div>
                </div>
              ) : (
                /* Zaključano - prikaži opciju kupovine */
                <div className="space-y-4">
                  <div className="bg-sky-light/20 border-2 border-sky/30 rounded-lg p-5 text-center">
                    <svg className="w-10 h-10 text-sky mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Otključajte QR kod
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Preuzmite QR kod koji možete štampati na pločicu za spomenik.
                    </p>
                    <p className="text-2xl font-bold text-sky mb-4">5 EUR</p>
                    <button
                      onClick={onPurchase}
                      className="w-full py-3 bg-sky hover:bg-sky-dark text-white rounded-lg font-semibold transition-colors"
                    >
                      Kupi QR kod
                    </button>
                    <p className="text-xs text-text-muted mt-3">
                      Jednokratna kupovina • Lifetime pristup
                    </p>
                  </div>

                  {/* Šta dobijate */}
                  <div className="p-4 bg-sand-light rounded-lg">
                    <h3 className="font-medium text-text-primary mb-2">Šta dobijate?</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        QR kod u PNG i SVG formatu
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Uputstvo za štampu
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Lista preporučenih štamparija
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Trajni link na memorijal
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
