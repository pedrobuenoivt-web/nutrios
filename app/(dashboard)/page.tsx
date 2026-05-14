'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STUDENTS, semColor } from '@/lib/mock-data'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

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

export default function DashboardPage() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const statCards = [
    { label: 'MRR Atual',             value: 'R$ 3.100', icon: '💰', red: false },
    { label: 'Alunos Ativos',         value: '8',         icon: '👥', red: false },
    { label: 'Check-ins essa semana', value: '6',         icon: '📋', red: false },
    { label: 'Inadimplentes',         value: '2',         icon: '⚠️', red: true  },
  ]

  return (
    <div className="p-9">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Visão geral dos seus alunos e métricas</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        {statCards.map((c, i) => (
          <div
            key={i}
            style={{ background: c.red ? '#fff5f5' : '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xl">{c.icon}</span>
              <span className="text-gray-500 text-sm">{c.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: c.red ? '#ef4444' : '#111' }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Alert pills */}
      <div className="flex gap-2.5 mb-6">
        <div style={{ background: '#fee2e2', color: '#991b1b', fontSize: 13, padding: '8px 14px', borderRadius: 20, fontWeight: 500 }}>
          ⚠️ 3 alunos com energia ≤ 2 essa semana
        </div>
        <div style={{ background: '#fef3c7', color: '#92400e', fontSize: 13, padding: '8px 14px', borderRadius: 20, fontWeight: 500 }}>
          🕐 2 alunos sem check-in há +10 dias
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #e5e7eb' }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Alunos</span>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['', '', 'Nome', 'Score', 'Peso Atual', 'Pagamento'].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map(s => {
              const last = s.history[s.history.length - 1]
              const isOpen = expanded === s.id
              const miniData = s.history.slice(-5)

              return (
                <>
                  <tr
                    key={s.id}
                    onClick={() => setExpanded(isOpen ? null : s.id)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: '1px solid #e5e7eb' }}
                  >
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: semColor(s) }} />
                    </td>
                    <td style={{ padding: '13px 8px', fontSize: 22 }}>{s.emoji}</td>
                    <td style={{ padding: '13px 16px', fontWeight: 500, fontSize: 14 }}>{s.name}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{
                        fontWeight: 700, fontSize: 15,
                        color: s.score >= 4 ? '#22c55e' : s.score < 2.5 ? '#ef4444' : '#f59e0b',
                      }}>
                        {s.score.toFixed(1)}
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: 12 }}>/5</span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 14, color: '#6b7280' }}>{s.weight} kg</td>
                    <td style={{ padding: '13px 16px' }}><Badge payment={s.payment} /></td>
                  </tr>

                  {isOpen && (
                    <tr key={`${s.id}-exp`} style={{ background: '#F0FAF5' }}>
                      <td colSpan={6} style={{ padding: '18px 22px' }}>
                        {/* Mini indicator cards */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          {[
                            { icon: '⚡', label: 'Energia',        val: last.energia },
                            { icon: '💪', label: 'Desempenho',     val: last.desempenho },
                            { icon: '🍽️', label: 'Refeições fora', val: last.refeicoesFora },
                            { icon: '💧', label: 'Hidratação',     val: last.hidratacao },
                          ].map((m, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '12px 14px' }}>
                              <div style={{ fontSize: 18, marginBottom: 4 }}>{m.icon}</div>
                              <div style={{ fontSize: 11, color: '#6b7280' }}>{m.label}</div>
                              <div style={{ fontSize: 20, fontWeight: 700 }}>{m.val}</div>
                            </div>
                          ))}
                        </div>

                        {/* Mini chart */}
                        <div style={{ height: 110, marginBottom: 14 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={miniData}>
                              <XAxis dataKey="semana" tick={{ fontSize: 11 }} />
                              <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                              <Tooltip />
                              <Line type="monotone" dataKey="score" stroke="#1D9E75" strokeWidth={2.5} dot={{ r: 4 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        <Link
                          href={`/aluno/${s.id}`}
                          style={{ background: '#1D9E75', color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, display: 'inline-block' }}
                        >
                          Ver perfil completo →
                        </Link>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
