'use client'

import React from 'react'
import { ArrowLeft, QrCode } from 'lucide-react'
import QRCode from 'qrcode.react'

interface QRCodeDisplayProps {
  onBack: () => void
}

export default function QRCodeDisplay({ onBack }: QRCodeDisplayProps) {
  // Get the current URL for the QR code
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="playfair text-2xl font-semibold text-gray-800 mb-2">
            Share the Camera
          </h2>
          <p className="text-gray-600">
            Scan this QR code to access the wedding camera on any device
          </p>
        </div>

        {/* QR Code */}
        <div className="camera-body p-6 mb-6">
          <div className="bg-white p-4 rounded-lg">
            <QRCode 
              value={currentUrl}
              size={200}
              level="M"
              includeMargin={true}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h3 className="playfair text-lg font-semibold text-gray-800 mb-3">
            How to Use
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Point your phone's camera at this QR code</p>
            <p>• Tap the notification that appears</p>
            <p>• Start taking photos instantly!</p>
          </div>
        </div>

        {/* URL Display */}
        <div className="mb-6 p-3 bg-wedding-beige/30 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Direct Link:</p>
          <p className="text-sm text-wedding-coral break-all font-mono">
            {currentUrl}
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-wedding-coral hover:text-wedding-coral/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Camera</span>
        </button>
      </div>
    </div>
  )
} 