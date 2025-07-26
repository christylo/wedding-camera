'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Camera, Upload, Heart, Sparkles } from 'lucide-react'
import CameraInterface from './components/CameraInterface'
import UploadInterface from './components/UploadInterface'
import ThankYouMessage from './components/ThankYouMessage'
import QRCodeDisplay from './components/QRCodeDisplay'

export default function WeddingCamera() {
  const [mode, setMode] = useState<'camera' | 'upload' | 'thankyou' | 'qr'>('camera')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handlePhotoCapture = useCallback((imageData: string) => {
    setCapturedImage(imageData)
    setMode('upload')
  }, [])

  const handleUploadSuccess = useCallback(() => {
    setIsUploading(false)
    setMode('thankyou')
    // Reset after showing thank you message
    setTimeout(() => {
      setMode('camera')
      setCapturedImage(null)
    }, 3000)
  }, [])

  const handleUploadError = useCallback((error: string) => {
    setIsUploading(false)
    alert(`Upload failed: ${error}`)
    setMode('camera')
  }, [])

  const handleUpload = useCallback(async (imageBlob: Blob) => {
    setIsUploading(true)
    try {
      // Get presigned URL from our API
      const response = await fetch('/api/get-presigned-url')
      if (!response.ok) {
        throw new Error('Failed to get upload URL')
      }
      
      const { url } = await response.json()
      
      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: imageBlob,
      })
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }
      
      handleUploadSuccess()
    } catch (error) {
      handleUploadError(error instanceof Error ? error.message : 'Unknown error')
    }
  }, [handleUploadSuccess, handleUploadError])

  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-peach to-wedding-beige">
      {/* Header */}
      <header className="text-center py-6 px-4">
        <h1 className="playfair text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
          Christy & Jimmy's Wedding
        </h1>
        <p className="text-wedding-coral font-medium">📸 Capture the Magic 📸</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {mode === 'qr' && (
          <QRCodeDisplay onBack={() => setMode('camera')} />
        )}
        
        {mode === 'camera' && (
          <CameraInterface 
            onPhotoCapture={handlePhotoCapture}
            onShowQR={() => setMode('qr')}
          />
        )}
        
        {mode === 'upload' && capturedImage && (
          <UploadInterface 
            imageData={capturedImage}
            onUpload={handleUpload}
            isUploading={isUploading}
            onRetake={() => setMode('camera')}
          />
        )}
        
        {mode === 'thankyou' && (
          <ThankYouMessage />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 px-4 border-t border-wedding-beige/30">
        <p className="text-sm text-wedding-coral mb-2">
          By using this app, you agree your photos may be shared in our wedding album 💕
        </p>
        <a 
          href="/admin" 
          className="text-xs text-wedding-coral/70 hover:text-wedding-coral transition-colors"
        >
          Admin (Testing)
        </a>
      </footer>
    </div>
  )
} 