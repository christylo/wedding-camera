import { NextRequest, NextResponse } from 'next/server'

// Mock storage for testing (in production, this would be S3)
const mockStorage: { [key: string]: { data: string, timestamp: number } } = {}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const filename = url.searchParams.get('filename')
    
    console.log(`📤 Mock upload request received for: ${filename}`)
    
    if (!filename) {
      console.log('❌ No filename provided')
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Get the image data from the request body
    const imageData = await request.arrayBuffer()
    console.log(`📦 Received image data: ${imageData.byteLength} bytes`)
    
    // Convert to base64 for storage (in production, this would go to S3)
    const base64Data = Buffer.from(imageData).toString('base64')
    const dataUrl = `data:image/jpeg;base64,${base64Data}`
    
    // Store in mock storage
    mockStorage[filename] = {
      data: dataUrl,
      timestamp: Date.now()
    }

    console.log(`✅ Mock upload successful: ${filename}`)
    console.log(`📊 Total mock uploads: ${Object.keys(mockStorage).length}`)
    console.log(`📋 Current mock storage keys:`, Object.keys(mockStorage))

    return NextResponse.json({ 
      success: true,
      filename: filename,
      message: 'Photo uploaded successfully (mock mode)'
    })
  } catch (error) {
    console.error('Mock upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    )
  }
}

// Endpoint to view mock uploads (for testing)
export async function GET(request: NextRequest) {
  try {
    console.log(`📥 GET request for mock uploads`)
    console.log(`📋 Current mock storage keys:`, Object.keys(mockStorage))
    console.log(`📊 Total items in mock storage: ${Object.keys(mockStorage).length}`)
    
    const uploads = Object.entries(mockStorage).map(([filename, data]) => ({
      filename,
      timestamp: data.timestamp,
      date: new Date(data.timestamp).toLocaleString(),
      size: Math.round(data.data.length / 1024) // Approximate size in KB
    }))

    console.log(`📤 Returning ${uploads.length} uploads:`, uploads.map(u => u.filename))

    return NextResponse.json({
      uploads,
      total: uploads.length,
      message: 'Mock uploads retrieved successfully'
    })
  } catch (error) {
    console.error('Error retrieving mock uploads:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve uploads' },
      { status: 500 }
    )
  }
} 