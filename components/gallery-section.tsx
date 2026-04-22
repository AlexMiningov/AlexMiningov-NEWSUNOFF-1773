'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const galleryImages = [
  { src: '/gallery-1.jpg', label: 'Тёмный седан', tag: 'Тонировка стёкол' },
  { src: '/gallery-2.jpg', label: 'Лобовое стекло', tag: 'Атермальная плёнка' },
  { src: '/gallery-3.jpg', label: 'Степени тонировки', tag: '5% — 75% ГОСТ' },
  { src: 'https://i0.wp.com/bonvivantautocare.com.au/wp-content/uploads/2024/08/Audi_A5-2.jpg?resize=1200%2C675&ssl=1', label: 'Audi A5', tag: 'Тонировка стёкол' },
  { src: 'https://flexfilmstore.com/cdn/shop/articles/understanding-window-tint-shades-197521.jpg?v=1722338113', label: 'Заднее стекло', tag: 'Крупный план' },
  { src: 'https://sunstoppers.com/wp-content/uploads/2021/09/2021-Tesla-4.jpg', label: 'Tesla Model 3', tag: 'Полная тонировка' },
]

export function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const goNext = () => selectedIdx !== null && setSelectedIdx((selectedIdx + 1) % galleryImages.length)
  const goPrev = () => selectedIdx !== null && setSelectedIdx((selectedIdx - 1 + galleryImages.length) % galleryImages.length)

  return (
    <section id="gallery" ref={ref} className="bg-black py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Наши работы</h2>
          <span className="text-white/30 text-sm hidden sm:block">{galleryImages.length} проектов</span>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="scroll-x-container pl-6 sm:pl-10">
        <div className="flex gap-4 w-max pr-6 sm:pr-10">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative w-[340px] sm:w-[440px] aspect-video rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
              onClick={() => setSelectedIdx(i)}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white/50 text-xs tracking-widest uppercase mb-1">{img.tag}</p>
                <p className="text-white font-semibold">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white z-10" onClick={() => setSelectedIdx(null)}>
              <X className="w-7 h-7" />
            </button>
            <button className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10" onClick={e => { e.stopPropagation(); goPrev() }}>
              <ChevronLeft className="w-9 h-9" />
            </button>
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10" onClick={e => { e.stopPropagation(); goNext() }}>
              <ChevronRight className="w-9 h-9" />
            </button>
            <div className="relative w-full max-w-5xl aspect-video" onClick={e => e.stopPropagation()}>
              <Image src={galleryImages[selectedIdx].src} alt={galleryImages[selectedIdx].label} fill className="object-contain rounded-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
