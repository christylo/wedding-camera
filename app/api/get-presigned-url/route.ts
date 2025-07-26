import { NextRequest, NextResponse } from 'next/server'

// Mock storage for testing (in production, this would be S3)
const mockStorage: { [key: string]: string } = {}

export async function GET(request: NextRequest) {
  try {
    // Generate a unique filename with timestamp
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const filename = `wedding-uploads/${timestamp}-${randomId}.jpg`

    // For testing, we'll create a mock presigned URL that simulates S3
    // In production, this would be a real S3 presigned URL
    const mockPresignedUrl = `/api/mock-upload?filename=${encodeURIComponent(filename)}`

    return NextResponse.json({ 
      url: mockPresignedUrl,
      filename: filename,
      isMock: true // Flag to indicate this is a mock upload
    })
  } catch (error) {
    console.error('Error generating mock upload URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
} 