'use client'

import { useState } from 'react'
import { STUDENTS } from '@/lib/mock-data'

type FilterKey = 'todos' | 'pago' | 'pendente' | 'atrasado'

function Badge({ payment }: { payment: string }) {
  const cfg: Record<string, [string, string]> = {
    pago:     ['#dcfce7', '#166534'],
    pendente: ['#fef9c3', '#854d0e'],
    atrasado: ['#fee2e2', '#991b1b'],
  }
  const [bg, color] = cfg[payment] ?? ['#f3f4f6', '#374151']
  return (
    <span style={{ background: bg, color, fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20 }}>
      {payment.charAt(0).toUpperCase() + payment.slice(1)}
    </span>
  )
}

const tabs: { id: FilterKey; label: string }[] = [
  { id: 'todos',    label: 'Todos' },
  { id: 'pago',     label: 'Pagos' },
  { id: 'pendente', label: 'Pendentes' },
  { id: 'atrasado', label: 'Atrasados' },
]

export default function FinanceiroPage() {
  const [filter, setFilter] = useState<FilterKey>('todos')

  const rows = STUDENTS.map(s => ({ ...s, valor: 350, vencimento: '15/06/2024' }))
  const filtered = filter === 'todos' ? rows : rows.filter(r => r.payment === filter)

  const card = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 14,
    padding: '20px 22px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  }

  return (
    <div className="p-9">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Financeiro</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de pagamentos e receita</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3.5 mb-6">
        {[
          { label: 'MRR',               value: 'R$ 3.100', icon: '📈', red: false },
          { label: 'Recebido este mês', value: 'R$ 1.950', icon: '✅', red: false },
          { label: 'Em atraso',         value: 'R$ 800',   icon: '🚨', red: true  },
        ].map((c, i) => (
          <div key={i} style={{ ...card, background: c.red ? '#fff5f5' : '#fff' }}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">{c.icon}</span>
              <span className="text-gray-500 text-sm">{c.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.red ? '#ef4444' : '#111' }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 mb-6" style={{ borderBottom: '2px solid #e5e7eb' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              color: filter === t.id ? '#1D9E75' : '#6b7280',
              fontWeight: filter === t.id ? 600 : 400,
              borderBottom: filter === t.id ? '2px solid #1D9E75' : '2px solid transparent',
              marginBottom: -2,
              background: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Aluno', 'Valor', 'Vencimento', 'Status', 'Dias em atraso'].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 12, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '13px 16px' }}>
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: 20 }}>{p.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 14, fontWeight: 600 }}>R$ {p.valor}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: '#6b7280' }}>{p.vencimento}</td>
                <td style={{ padding: '13px 16px' }}><Badge payment={p.payment} /></td>
                <td style={{ padding: '13px 16px', fontSize: 14, color: p.daysLate > 0 ? '#ef4444' : '#6b7280', fontWeight: p.daysLate > 0 ? 600 : 400 }}>
                  {p.daysLate > 0 ? `${p.daysLate} dias` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
