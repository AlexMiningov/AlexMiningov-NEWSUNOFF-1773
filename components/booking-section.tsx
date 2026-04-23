'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Loader2, CheckCircle } from 'lucide-react'

const serviceTypes = [
  'Тонирование стёкол автомобиля',
  'Бронирование стёкол',
  'Растонировка',
  'Тонировка лобового стекла',
  'Тонировка стёкол зданий',
  'Декоративная тонировка',
]

// Formspree endpoint — замените YOUR_FORM_ID на ID из formspree.io
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'

export function BookingSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', serviceType: '', desiredDate: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.serviceType) {
      alert('Заполните обязательные поля')
      return
    }
    if (!agreed) {
      alert('Подтвердите согласие на обработку данных')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Имя: form.name,
          Телефон: form.phone,
          Email: form.email,
          Услуга: form.serviceType,
          'Желаемая дата': form.desiredDate,
          _subject: `Новая запись на тонировку от ${form.name}`,
        }),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', serviceType: '', desiredDate: '' })
        setAgreed(false)
      } else {
        alert('Ошибка отправки. Позвоните нам: +375 29 888-89-55')
      }
    } catch {
      alert('Ошибка сети. Позвоните нам: +375 29 888-89-55')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" ref={ref} className="bg-black py-32 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Записаться<br />
              <span className="grad-text">онлайн</span>
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-12 max-w-sm">
              Оставьте заявку — мы перезвоним и подберём удобное время.
            </p>

            <div className="space-y-5 text-white/40 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-white/20 text-xs uppercase tracking-widest">Телефон</span>
                <a href="tel:+375298888955" className="text-white text-base font-medium hover:grad-text transition-colors">+375 29 888-89-55</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20 text-xs uppercase tracking-widest">Email</span>
                <a href="mailto:i@sunoff.by" className="text-white text-base font-medium hover:grad-text transition-colors">i@sunoff.by</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20 text-xs uppercase tracking-widest">Адрес</span>
                <span className="text-white text-base font-medium">пер. Тепличный 26а, Минск</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20 text-xs uppercase tracking-widest">Режим работы</span>
                <span className="text-white text-base font-medium">Пн–Сб: 9:00 — 20:00</span>
              </div>
            </div>

            <div className="mt-10 rounded-xl overflow-hidden h-[200px] border border-white/8">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=27.645698,53.921049&z=16&pt=27.645698,53.921049,pm2rdm&lang=ru_RU"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Sunoff на Яндекс Картах"
              />
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {success ? (
              <div className="h-full flex flex-col items-start justify-center gap-6 py-16">
                {/* Gradient checkmark */}
                <div className="relative w-14 h-14">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <defs>
                      <linearGradient id="ck-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FBBF24"/>
                        <stop offset="50%" stopColor="#F97316"/>
                        <stop offset="100%" stopColor="#7C3AED"/>
                      </linearGradient>
                    </defs>
                    <circle cx="28" cy="28" r="26" stroke="url(#ck-grad)" strokeWidth="2" fill="none"/>
                    <path d="M17 28L24 35L39 20" stroke="url(#ck-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold">Заявка принята</h3>
                <p className="text-white/40 max-w-xs">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 border border-white/15 text-white text-sm font-semibold px-6 py-3 rounded-full hover:border-white/40 transition-colors"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Имя *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Ваше имя"
                    className="w-full bg-transparent border-b border-white/15 py-3 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-orange-400/60 transition-colors"
                    required />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Телефон *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+375 (__) ___-__-__"
                    className="w-full bg-transparent border-b border-white/15 py-3 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-orange-400/60 transition-colors"
                    required />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-white/15 py-3 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-orange-400/60 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Услуга *</label>
                  <select name="serviceType" value={form.serviceType} onChange={handleChange}
                    className="w-full bg-black border-b border-white/15 py-3 text-white text-base focus:outline-none focus:border-orange-400/60 transition-colors appearance-none"
                    required>
                    <option value="">Выберите услугу</option>
                    {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/30 text-xs uppercase tracking-widest mb-2">Желаемая дата</label>
                  <input type="date" name="desiredDate" value={form.desiredDate} onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/15 py-3 text-white text-base focus:outline-none focus:border-orange-400/60 transition-colors"
                    style={{ colorScheme: 'dark' }} />
                </div>

                <div className="pt-6 space-y-5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={agreed}
                      onClick={() => setAgreed(v => !v)}
                      className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        agreed
                          ? 'border-orange-400/80 bg-gradient-to-br from-orange-400 to-violet-600'
                          : 'bg-transparent border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {agreed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <span className="text-xs text-white/35 leading-relaxed">
                      Я согласен(а) на обработку персональных данных в соответствии с{' '}
                      <a href="#" className="text-white/60 underline underline-offset-2 hover:text-white transition-colors">
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>

                  <button
                    type="submit" disabled={loading || !agreed}
                    className="w-full grad-bg text-white font-semibold py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-30 flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</> : 'Записаться'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
