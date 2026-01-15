interface ImageCropperProps {
  imageUrl: string
  aspectRatio: number // e.g., 1 for square, 16/9 for cover
  className?: string
}

export default function ImageCropper({ imageUrl, aspectRatio, className }: ImageCropperProps) {
  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      style={{ aspectRatio }}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}
