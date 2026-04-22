'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  { num: '01', name: 'Тонирование стёкол', price: 'от 50 BYN', desc: 'Боковые и задние стёкла. Защита от UV, снижение нагрева, приватность.' },
  { num: '02', name: 'Бронирование стёкол', price: 'от 350 BYN', desc: 'Антигравийная бронеплёнка — защита от сколов и трещин.' },
  { num: '03', name: 'Тонировка лобового', price: 'от 80 BYN', desc: 'Атермальная плёнка — снижает нагрев и блики, сохраняет прозрачность.' },
  { num: '04', name: 'Растонировка', price: 'от 50 BYN', desc: 'Удаление старой плёнки без следов клея и повреждения обогрева.' },
  { num: '05', name: 'Тонировка зданий', price: 'от 50 BYN', desc: 'Офисы, квартиры, коммерческие помещения. Защита от солнца и энергосбережение.' },
  { num: '06', name: 'Декоративная тонировка', price: 'от 70 BYN', desc: 'Цветная и зеркальная плёнка. Широкий выбор цветов, премиум бренды.' },
]

export function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="services" ref={ref} className="bg-black py-32 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Услуги</h2>
          <span className="text-white/30 text-sm hidden sm:block">Полный прайс-лист</span>
        </motion.div>

        {/* Services list */}
        <div className="divide-y divide-white/8">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-7 cursor-default hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded"
            >
              <span className="text-white/20 text-sm font-mono w-10 shrink-0">{s.num}</span>
              <h3 className="text-xl sm:text-2xl font-semibold sm:w-72 shrink-0 group-hover:text-primary transition-colors">{s.name}</h3>
              <p className="text-white/35 text-sm sm:flex-1 sm:px-8 leading-relaxed">{s.desc}</p>
              <span className="text-primary font-bold text-lg shrink-0">{s.price}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 border border-white/15 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:border-white/40 transition-colors"
          >
            Записаться на услугу
            <span className="text-white/30">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
