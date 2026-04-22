'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'

const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Запись', href: '#booking' },
  { label: 'Контакты', href: '#booking' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Logo size={30} variant="full" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#booking"
          className="hidden md:inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
        >
          Записаться
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-5">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-semibold text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-5 py-3 rounded-full"
            >
              Записаться
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
