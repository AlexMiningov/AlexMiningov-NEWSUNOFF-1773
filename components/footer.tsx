import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/8 py-10 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo size={26} variant="full" />
        <p className="text-white/20 text-xs text-center sm:text-right">
          © 2026 Sunoff Garage. Все права защищены.<br className="sm:hidden" />
          {' '}пер. Тепличный 26а, Минск
        </p>
      </div>
    </footer>
  )
}
