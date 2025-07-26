'use client'

import React from 'react'
import { Heart, Sparkles, Camera } from 'lucide-react'

export default function ThankYouMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center max-w-md">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-wedding-coral to-wedding-pink rounded-full flex items-center justify-center animate-bounce-soft">
            <Heart className="w-16 h-16 text-white animate-pulse-soft" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2 animate-pulse-soft">
            <Sparkles className="w-6 h-6 text-wedding-mint" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-5 h-5 text-wedding-lavender" />
          </div>
          <div className="absolute top-1/2 -right-4 animate-pulse-soft" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-4 h-4 text-wedding-coral" />
          </div>
        </div>

        {/* Thank You Message */}
        <h2 className="playfair text-3xl font-semibold text-gray-800 mb-4">
          Thank You! 💕
        </h2>
        
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Your photo has been saved to our wedding album. 
          We can't wait to see all the beautiful memories you've captured!
        </p>

        {/* Camera Icon */}
        <div className="inline-flex items-center gap-2 text-wedding-coral mb-6">
          <Camera className="w-5 h-5" />
          <span className="text-sm font-medium">Photo Saved Successfully</span>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-2 h-2 bg-wedding-coral rounded-full animate-pulse-soft"></div>
          <div className="w-2 h-2 bg-wedding-pink rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-wedding-mint rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-2 h-2 bg-wedding-lavender rounded-full animate-pulse-soft" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Return Message */}
        <p className="text-sm text-gray-500">
          Returning to camera in a few seconds...
        </p>
      </div>
    </div>
  )
} 