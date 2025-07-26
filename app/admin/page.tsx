'use client'

import React, { useState, useEffect } from 'react'
import { RefreshCw, Download, Trash2, Camera } from 'lucide-react'

interface MockUpload {
  filename: string
  timestamp: number
  date: string
  size: number
}

export default function AdminPage() {
  const [uploads, setUploads] = useState<MockUpload[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUploads = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/mock-upload')
      if (!response.ok) {
        throw new Error('Failed to fetch uploads')
      }
      
      const data = await response.json()
      setUploads(data.uploads || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUploads()
  }, [])

  const clearUploads = async () => {
    if (!confirm('Are you sure you want to clear all mock uploads?')) {
      return
    }
    
    // In a real app, you'd have a DELETE endpoint
    // For now, we'll just refresh the page to simulate clearing
    setUploads([])
  }

  return (
    <div className="min-h-screen bg-wedding-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="playfair text-3xl font-semibold text-gray-800">
              📸 Wedding Camera Admin
            </h1>
            <div className="flex gap-3">
              <button
                onClick={fetchUploads}
                disabled={loading}
                className="bg-wedding-coral text-white px-4 py-2 rounded-lg font-medium hover:bg-wedding-coral/90 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={clearUploads}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6 p-4 bg-wedding-beige/30 rounded-lg">
            <div className="flex items-center gap-4">
              <Camera className="w-6 h-6 text-wedding-coral" />
              <div>
                <h3 className="font-semibold text-gray-800">Mock Upload Mode</h3>
                <p className="text-sm text-gray-600">
                  Photos are being stored locally for testing. In production, they would be uploaded to S3.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Uploads List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Uploaded Photos ({uploads.length})
              </h2>
              {uploads.length > 0 && (
                <p className="text-sm text-gray-600">
                  Total size: {uploads.reduce((sum, upload) => sum + upload.size, 0)} KB
                </p>
              )}
            </div>

            {uploads.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No photos uploaded yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Upload some photos from the main app to see them here
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {uploads.map((upload, index) => (
                  <div key={upload.filename} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-800 truncate">
                        Photo {index + 1}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {upload.size} KB
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {upload.date}
                    </p>
                    <p className="text-xs text-gray-500 font-mono truncate">
                      {upload.filename}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Testing Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Go to the main app: <a href="/" className="underline">Wedding Camera</a></li>
              <li>Upload a photo (either via camera or gallery)</li>
              <li>Come back here and click "Refresh" to see the upload</li>
              <li>Photos are stored locally for testing</li>
            </ol>
          </div>

          {/* Navigation */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-block bg-wedding-coral text-white px-6 py-3 rounded-full font-medium hover:bg-wedding-coral/90 transition-colors"
            >
              ← Back to Wedding Camera
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 