'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="bg-black py-36 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight"
        >
          <span className="text-white">Sunoff Garage —</span>{' '}
          <span className="text-white/25">это студия тонировки в Минске с опытом более 5 лет, сотнями постоянных клиентов и гарантией на каждую работу.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row gap-6 sm:gap-16 text-white/35 text-sm border-t border-white/8 pt-10"
        >
          <div>
            <p className="text-white text-base font-semibold mb-1">Плёнки</p>
            <p>Johnson Window Films, Llumar, Suntek, 3M — только мировые бренды</p>
          </div>
          <div>
            <p className="text-white text-base font-semibold mb-1">Расположение</p>
            <p>пер. Тепличный 26а, Минск<br />Пн–Сб: 9:00 — 20:00</p>
          </div>
          <div>
            <p className="text-white text-base font-semibold mb-1">Контакт</p>
            <a href="tel:+375298888955" className="hover:text-white transition-colors">+375 29 888-89-55</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
