'use client'

import React, { useRef } from 'react'
import { Upload, RotateCcw, Check } from 'lucide-react'

interface UploadInterfaceProps {
  imageData: string
  onUpload: (imageBlob: Blob) => void
  isUploading: boolean
  onRetake: () => void
}

export default function UploadInterface({ 
  imageData, 
  onUpload, 
  isUploading, 
  onRetake 
}: UploadInterfaceProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    // Convert base64 to blob
    fetch(imageData)
      .then(res => res.blob())
      .then(blob => {
        onUpload(blob)
      })
      .catch(error => {
        console.error('Error converting image:', error)
        alert('Error processing image. Please try again.')
      })
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      {/* Photo Preview */}
      <div className="relative mb-6">
        <div className="camera-body p-4">
          <img 
            src={imageData} 
            alt="Captured photo" 
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Photo frame decoration */}
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-wedding-coral/30 rounded-lg pointer-events-none"></div>
      </div>

      {/* Upload Options */}
      <div className="w-full space-y-4">
        {/* Upload Captured Photo */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full bg-wedding-coral text-white py-4 px-6 rounded-full font-medium hover:bg-wedding-coral/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Upload This Photo</span>
            </>
          )}
        </button>

        {/* Upload from Gallery */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full bg-wedding-beige text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-wedding-beige/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
        >
          <Upload className="w-4 h-4" />
          <span>Upload from Gallery</span>
        </button>

        {/* Retake Photo */}
        <button
          onClick={onRetake}
          disabled={isUploading}
          className="w-full bg-gray-200 text-gray-600 py-3 px-6 rounded-full font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Photo</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Status */}
      {isUploading && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-wedding-coral">
            <div className="w-4 h-4 border-2 border-wedding-coral border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Saving to wedding album...</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Your photo will be automatically saved to our wedding album. 
          You can also upload a different photo from your gallery if you prefer!
        </p>
      </div>
    </div>
  )
} 