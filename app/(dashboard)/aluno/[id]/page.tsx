'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STUDENTS } from '@/lib/mock-data'
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

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

export default function AlunoPage({ params }: { params: { id: string } }) {
  const student = STUDENTS.find(s => s.id === Number(params.id))
  if (!student) notFound()

  const last = student.history[student.history.length - 1]
  const [notes, setNotes] = useState('Aluno(a) comprometido(a), ótima evolução nas últimas semanas.')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }

  return (
    <div className="p-9">
      {/* Back */}
      <Link href="/" className="flex items-center gap-1.5 text-sm font-medium mb-6" style={{ color: '#1D9E75' }}>
        ← Dashboard
      </Link>

      {/* Header card */}
      <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
        <div style={{ fontSize: 52 }}>{student.emoji}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px' }}>{student.name}</h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 2 }}>Desde {student.start}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1D9E75' }}>R$ {student.plan}/mês</div>
          <div style={{ marginTop: 4 }}><Badge payment={student.payment} /></div>
        </div>
      </div>

      {/* 4 indicator cards */}
      <div className="grid grid-cols-4 gap-3.5 mb-4">
        {[
          { icon: '⚡', label: 'Energia',        val: last.energia,        sub: 'Média semanal',           suffix: '/5' },
          { icon: '💪', label: 'Desempenho',     val: last.desempenho,     sub: 'Performance nos treinos', suffix: '/5' },
          { icon: '🍽️', label: 'Refeições fora', val: last.refeicoesFora,  sub: 'Fora do plano',           suffix: '' },
          { icon: '💧', label: 'Hidratação',     val: last.hidratacao,     sub: 'Consumo de água',         suffix: '/5' },
        ].map((m, i) => (
          <div key={i} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 700 }}>
              {m.val}<span style={{ fontSize: 14, color: '#9ca3af' }}>{m.suffix}</span>
            </div>
            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Score card */}
      <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6 }}>Score Semanal</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#1D9E75', letterSpacing: '-1px' }}>
            {last.score.toFixed(1)}<span style={{ fontSize: 20, color: '#9ca3af' }}>/5</span>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', fontFamily: 'monospace', background: '#f3f4f6', padding: '8px 14px', borderRadius: 8 }}>
          (Energia + Desempenho + Hidratação) / 3
        </div>
      </div>

      {/* Dual-axis chart */}
      <div style={{ ...card, marginBottom: 18 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Evolução (8 semanas)</div>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={student.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="semana" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left"  domain={[0, 5]}        tick={{ fontSize: 12 }} label={{ value: 'Score',    angle: -90, position: 'insideLeft',  style: { fontSize: 11 } }} />
              <YAxis yAxisId="right" orientation="right"    tick={{ fontSize: 12 }} label={{ value: 'Peso (kg)', angle: 90, position: 'insideRight', style: { fontSize: 11 } }} />
              <Tooltip />
              <Legend />
              <Area yAxisId="left"  type="monotone" dataKey="score" name="Score"     stroke="#1D9E75" strokeWidth={3} fill="#1D9E75" fillOpacity={0.1} dot={{ r: 5, fill: '#1D9E75' }} />
              <Line  yAxisId="right" type="monotone" dataKey="peso"  name="Peso (kg)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History table */}
      <div style={{ ...card, padding: 0, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid #e5e7eb', fontWeight: 600, fontSize: 15 }}>
          Histórico de Check-ins
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {['Semana', 'Score', 'Peso', 'Observações'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {student.history.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '11px 16px', fontSize: 13 }}>{h.semana}</td>
                <td style={{ padding: '11px 16px', fontWeight: 700, color: h.score >= 4 ? '#22c55e' : h.score < 2.5 ? '#ef4444' : '#f59e0b' }}>
                  {h.score.toFixed(1)}
                </td>
                <td style={{ padding: '11px 16px', fontSize: 13, color: '#6b7280' }}>{h.peso} kg</td>
                <td style={{ padding: '11px 16px', fontSize: 13, color: '#6b7280' }}>{h.observacao || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div style={card}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Anotações</div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ width: '100%', minHeight: 100, border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'inherit', color: '#111' }}
        />
        <button
          onClick={handleSave}
          style={{ marginTop: 10, background: saved ? '#22c55e' : '#1D9E75', color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s', border: 'none' }}
        >
          {saved ? '✓ Salvo!' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
