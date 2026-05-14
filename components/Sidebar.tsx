'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CreditCard, Leaf } from 'lucide-react'

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/financeiro', label: 'Financeiro', icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{ background: '#0F5E45' }}
      className="w-[220px] min-w-[220px] flex flex-col h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="px-5 pt-7 pb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <Leaf size={22} color="#fff" />
          <span className="text-white font-semibold text-lg tracking-tight">NutriOS</span>
        </div>
        <p className="text-[12px] pl-8" style={{ color: '#86b5a1' }}>
          para Personal Trainers
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl mb-1 text-sm transition-all"
              style={{
                background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: active ? '#fff' : '#a8d5c4',
                fontWeight: active ? 500 : 400,
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div
        className="p-5 flex items-center gap-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          👩‍⚕️
        </div>
        <div>
          <p className="text-white text-[13px] font-medium">Dr. Maria Santos</p>
          <p className="text-[11px]" style={{ color: '#86b5a1' }}>Personal Trainer</p>
        </div>
      </div>
    </aside>
  )
}
