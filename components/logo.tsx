'use client'

import React from 'react'

interface LogoProps {
  className?: string
  size?: number
  variant?: 'full' | 'icon'
}

export function Logo({ className = '', size = 40, variant = 'full' }: LogoProps) {

  if (variant === 'icon') {
    // Just the sun-over-pill icon mark
    const w = size
    const h = size
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="SunOff Garage"
      >
        <defs>
          <radialGradient id="icon-sun" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </radialGradient>
          <linearGradient id="icon-pill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <linearGradient id="icon-pill-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="icon-sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="icon-pill-clip">
            <rect x="4" y="22" width="32" height="14" rx="7" />
          </clipPath>
        </defs>
        {/* Pill bar */}
        <rect x="4" y="22" width="32" height="14" rx="7" fill="url(#icon-pill)" />
        {/* Pill shine */}
        <rect x="4" y="22" width="32" height="14" rx="7" fill="url(#icon-pill-shine)" />
        {/* Pill specular highlight top edge */}
        <rect x="8" y="23" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        {/* Sun circle — sits above pill, clipped at pill midline */}
        <circle cx="20" cy="22" r="11" fill="url(#icon-sun)" filter="url(#icon-sun-glow)" clipPath="url(#icon-pill-clip)" />
        <circle cx="20" cy="22" r="11" fill="url(#icon-sun)" filter="url(#icon-sun-glow)" style={{clipPath: 'inset(0 0 50% 0)'}} />
        {/* Sun drawn fully above pill */}
        <circle cx="20" cy="18" r="10" fill="url(#icon-sun)" filter="url(#icon-sun-glow)" />
      </svg>
    )
  }

  // Full logo — icon mark + SunOff text + Garage subtitle
  const iconH = size
  const iconW = size
  const textSize = Math.round(size * 0.52)
  const subSize = Math.round(size * 0.28)
  const gap = Math.round(size * 0.35)
  const totalW = iconW + gap + Math.round(size * 3.2)
  const totalH = iconH

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SunOff Garage"
    >
      <defs>
        <radialGradient id="logo-sun" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </radialGradient>
        <linearGradient id="logo-pill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id="logo-pill-shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="logo-sun-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ---- ICON MARK ---- */}
      {/* Pill */}
      <rect x="4" y={iconH * 0.54} width={iconW - 8} height={iconH * 0.36} rx={iconH * 0.18}
        fill="url(#logo-pill)" />
      <rect x="4" y={iconH * 0.54} width={iconW - 8} height={iconH * 0.36} rx={iconH * 0.18}
        fill="url(#logo-pill-shine)" />
      {/* Pill highlight */}
      <rect x="8" y={iconH * 0.56} width={iconW - 16} height={iconH * 0.08} rx={iconH * 0.04}
        fill="rgba(255,255,255,0.22)" />
      {/* Sun (above pill) */}
      <circle cx={iconW / 2} cy={iconH * 0.42} r={iconH * 0.27}
        fill="url(#logo-sun)" filter="url(#logo-sun-glow)" />

      {/* ---- TEXT ---- */}
      {/* "SunOff" */}
      <text
        x={iconW + gap}
        y={iconH * 0.62}
        fontFamily="'Plus Jakarta Sans','DM Sans',system-ui,sans-serif"
        fontSize={textSize}
        fontWeight="800"
        fill="white"
        letterSpacing="-0.5"
      >SunOff</text>

      {/* "Garage" subtitle */}
      <text
        x={iconW + gap + 1}
        y={iconH * 0.92}
        fontFamily="'DM Sans','Plus Jakarta Sans',system-ui,sans-serif"
        fontSize={subSize}
        fontWeight="400"
        fill="rgba(255,255,255,0.40)"
        letterSpacing="2.5"
      >GARAGE</text>
    </svg>
  )
}
