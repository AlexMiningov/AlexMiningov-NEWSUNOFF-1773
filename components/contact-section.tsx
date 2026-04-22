'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...(prev ?? {}), [e?.target?.name ?? '']: e?.target?.value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    if (!form?.name || !form?.phone || !form?.message) {
      toast.error('Пожалуйста, заполните обязательные поля')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res?.json()
      if (data?.success) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', message: '' })
        toast.success('Сообщение отправлено!')
      } else {
        toast.error(data?.message ?? 'Ошибка отправки')
      }
    } catch (err: any) {
      console.error('Contact error:', err)
      toast.error('Произошла ошибка. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: MapPin, label: 'Адрес', value: 'пер. Тепличный 26а, Минск' },
    { icon: Phone, label: 'Телефон', value: '+375 29 888-89-55', href: 'tel:+375298888955' },
    { icon: Mail, label: 'Email', value: 'i@sunoff.by', href: 'mailto:i@sunoff.by' },
    { icon: Clock, label: 'Режим работы', value: 'Пн-Сб: 9:00 — 20:00' },
  ]

  return (
    <section id="contacts" className="py-20 sm:py-28 bg-card/50">
      <div ref={ref} className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Контакты
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Свяжитесь <span className="text-primary">с нами</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Остались вопросы? Напишите нам или позвоните — мы всегда на связи.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo?.map((item: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item?.label}</p>
                  {item?.href ? (
                    <a href={item?.href} className="text-foreground font-medium hover:text-primary transition-colors">
                      {item?.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{item?.value}</p>
                  )}
                </div>
              </div>
            )) ?? []}

            {/* Map placeholder */}
            <div className="mt-8 rounded-xl overflow-hidden border border-border h-[250px] bg-secondary flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.5!2d27.5!3d53.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDU0JzAwLjAiTiAyN8KwMzAnMDAuMCJF!5e0!3m2!1sru!2sby!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Расположение Sunoff на карте"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {success ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">Сообщение отправлено!</h3>
                <p className="text-muted-foreground mb-6">Мы ответим вам в ближайшее время.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all"
                >
                  Написать ещё
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Имя *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={form?.name ?? ''}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={form?.phone ?? ''}
                      onChange={handleChange}
                      placeholder="+375 (__) ___-__-__"
                      className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={form?.email ?? ''}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Сообщение *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <textarea
                      name="message"
                      value={form?.message ?? ''}
                      onChange={handleChange}
                      placeholder="Опишите ваш вопрос или пожелание"
                      rows={4}
                      className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Отправить сообщение</>
                  )}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Отправляя форму, вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
