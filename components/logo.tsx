'use client'

import React from 'react'

interface LogoProps {
  className?: string
  size?: number
  variant?: 'full' | 'icon'
}

export function Logo({ className = '', size = 32, variant = 'full' }: LogoProps) {

  if (variant === 'icon') {
    // Just the icon mark
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Sunoff"
      >
        {/* Square with bottom-right corner cut */}
        <path
          d="M4 4 H28 V22 L22 28 H4 Z"
          fill="#66cc00"
        />
        {/* Subtle inner shadow on cut */}
        <path
          d="M22 28 L28 22 L22 22 Z"
          fill="#000000"
          fillOpacity="0.25"
        />
      </svg>
    )
  }

  // Full horizontal logo: icon + wordmark
  return (
    <svg
      width={Math.round(size * 4.5)}
      height={size}
      viewBox="0 0 144 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sunoff"
    >
      {/* ─── Icon mark ─── */}
      {/* Square with bottom-right corner cut */}
      <path
        d="M2 2 H22 V18 L16 24 H2 Z"
        fill="#66cc00"
      />
      {/* Corner triangle — slightly darker */}
      <path
        d="M16 24 L22 18 L16 18 Z"
        fill="#000000"
        fillOpacity="0.22"
      />

      {/* ─── Wordmark ─── */}
      {/* sunoff — white, light weight */}
      <text
        x="32"
        y="19"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="15"
        fontWeight="300"
        letterSpacing="0.8"
        fill="#ffffff"
      >sunoff</text>
      {/* garage — green, lighter */}
      <text
        x="32"
        y="30"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="300"
        letterSpacing="2"
        fill="#66cc00"
        fillOpacity="0.85"
      >garage</text>
    </svg>
  )
}
