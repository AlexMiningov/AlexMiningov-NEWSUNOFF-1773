'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const tagline = 'Тонировка, которая'
const headingWords = ['защищает', 'стилизует', 'выделяет.']

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-between pt-32 pb-16 px-6 sm:px-10 max-w-[1400px] mx-auto">

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-white/40 text-sm tracking-widest uppercase"
      >
        Студия тонировки — Минск
      </motion.p>

      {/* Giant headline */}
      <div className="mt-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/40 text-base sm:text-lg mb-4 font-light"
        >
          {tagline}
        </motion.p>
        <h1 className="font-display font-bold leading-[0.92] tracking-tight">
          {headingWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.12 }}
              className={`block text-[13vw] sm:text-[11vw] lg:text-[9.5vw] ${i < headingWords.length - 1 ? 'text-white/25' : 'text-white'}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-20"
      >
        <div className="flex items-center gap-4">
          <a
            href="#booking"
            className="bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Записаться
          </a>
          <a
            href="#services"
            className="border border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-white/40 transition-colors"
          >
            Услуги и цены
          </a>
        </div>

        <div className="flex gap-10 text-white/35 text-sm">
          <div>
            <span className="block text-2xl font-bold text-white">5+</span>
            лет на рынке
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">1200+</span>
            авто в год
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">5 лет</span>
            гарантия
          </div>
        </div>
      </motion.div>
    </section>
  )
}
