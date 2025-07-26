'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Camera, QrCode, RotateCcw, Upload } from 'lucide-react'

interface CameraInterfaceProps {
  onPhotoCapture: (imageData: string) => void
  onShowQR: () => void
}

export default function CameraInterface({ onPhotoCapture, onShowQR }: CameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // First check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera access is not supported in this browser.')
        setIsLoading(false)
        return
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        }
      })
      
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        
        // Set up event listeners
        videoRef.current.onloadedmetadata = () => {
          setIsCameraActive(true)
          setIsLoading(false)
        }
        
        videoRef.current.oncanplay = () => {
          setIsCameraActive(true)
          setIsLoading(false)
        }
        
        videoRef.current.onerror = (e) => {
          setError('Failed to load camera stream.')
          setIsLoading(false)
        }
        
        // Force play the video
        try {
          await videoRef.current.play()
        } catch (playError) {
          // Don't show error, just continue
        }
        
        // Fallback: if video doesn't load within 5 seconds, show error
        setTimeout(() => {
          if (isLoading) {
            // Check if video is actually working
            if (videoRef.current && videoRef.current.readyState >= 2) {
              setIsCameraActive(true)
              setIsLoading(false)
            } else {
              setError('Camera stream failed to load. Please try uploading from gallery instead.')
              setIsLoading(false)
            }
          }
        }, 5000)
      }
    } catch (err) {
      console.error('Camera error:', err)
      setIsLoading(false)
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Camera access denied. Please allow camera permissions and refresh the page.')
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.')
        } else if (err.name === 'NotSupportedError') {
          setError('Camera is not supported in this browser.')
        } else {
          setError(`Camera error: ${err.message}`)
        }
      } else {
        setError('Camera access failed. Please try again.')
      }
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return

    setIsCapturing(true)
    
    // Flash effect
    const flash = document.createElement('div')
    flash.className = 'camera-flash'
    document.body.appendChild(flash)
    
    setTimeout(() => {
      document.body.removeChild(flash)
    }, 500)

    // Capture the photo
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    if (context) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8)
      onPhotoCapture(imageData)
    }
    
    setIsCapturing(false)
  }

  const retakePhoto = () => {
    // Clean up existing stream
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
      })
      setStream(null)
    }
    
    // Reset state
    setIsCameraActive(false)
    setIsLoading(false)
    setError(null)
    
    // Small delay to ensure cleanup is complete
    setTimeout(() => {
      startCamera()
    }, 100)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-wedding-coral/20 rounded-full flex items-center justify-center">
            <Camera className="w-12 h-12 text-wedding-coral" />
          </div>
          <h3 className="playfair text-xl font-semibold text-gray-800 mb-3">
            Camera Not Available
          </h3>
          <p className="text-gray-600 mb-6">
            No worries! You can still share photos from your gallery.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                // Create a temporary file input to upload from gallery
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const result = e.target?.result as string
                      if (result) {
                        onPhotoCapture(result)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }
                input.click()
              }}
              className="w-full bg-wedding-coral text-white py-4 px-6 rounded-full font-medium hover:bg-wedding-coral/90 transition-colors flex items-center justify-center gap-3"
            >
              <Upload className="w-5 h-5" />
              Upload from Gallery
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Select photos from your device to share with the happy couple!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Camera Body */}
      <div className="camera-body p-6 max-w-sm w-full">
        {/* Camera Lens */}
        <div className="relative mb-6">
          <div className="camera-lens w-64 h-64 mx-auto rounded-full flex items-center justify-center overflow-hidden relative">
            {/* Always render video element, but hide when not active */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
            />
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center">
                <div className="w-16 h-16 mx-auto mb-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm opacity-70">Starting camera...</p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsLoading(false)
                      setError('Camera stream failed to load. Please try uploading from gallery instead.')
                    }}
                    className="mt-1 text-xs text-white/50 hover:text-white transition-colors"
                  >
                    Skip camera
                  </button>
                </div>
              </div>
            )}
            
            {/* Inactive state overlay */}
            {!isLoading && !isCameraActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center">
                <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-70">Camera not available</p>
              </div>
            )}
          </div>
          
          {/* Viewfinder */}
          <div className="absolute inset-0 border-2 border-white/30 rounded-full pointer-events-none">
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/50"></div>
          </div>
        </div>

        {/* Shutter Button */}
        <div className="text-center">
          <button
            onClick={capturePhoto}
            disabled={!isCameraActive || isCapturing}
            className="shutter-button w-20 h-20 bg-wedding-coral rounded-full border-4 border-white shadow-lg hover:bg-wedding-coral/90 disabled:opacity-50 disabled:cursor-not-allowed mx-auto mb-4"
          >
            <div className="w-12 h-12 bg-white rounded-full mx-auto mt-1"></div>
          </button>
          
          <p className="text-sm text-gray-600 mb-4">
            {isCapturing ? 'Capturing...' : 'Tap to capture'}
          </p>
        </div>

        {/* QR Code Button */}
        <div className="text-center">
          <button
            onClick={onShowQR}
            className="inline-flex items-center gap-2 text-wedding-coral hover:text-wedding-coral/80 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span className="text-sm">Show QR Code</span>
          </button>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Instructions */}
      <div className="mt-8 text-center max-w-md">
        <h3 className="playfair text-lg font-semibold text-gray-800 mb-2">
          How to Use
        </h3>
        <p className="text-sm text-gray-600">
          If your camera is available, point it at the moment you want to capture and tap the shutter button. 
          Otherwise, you can upload photos from your gallery. All photos will be saved to our wedding album!
        </p>
      </div>


    </div>
  )
} 