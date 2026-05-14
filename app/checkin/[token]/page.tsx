'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { STUDENTS } from '@/lib/mock-data'
import { Leaf } from 'lucide-react'

interface FormState {
  peso: string
  energia: number | null
  desempenho: number | null
  refeicoes: string | null
  hidratacao: number | null
  msg: string
}

export default function CheckinPage({ params }: { params: { token: string } }) {
  const student = STUDENTS.find(s => s.token === params.token)
  if (!student) notFound()

  const firstName = student.name.split(' ')[0]
  const [form, setForm] = useState<FormState>({
    peso: '', energia: null, desempenho: null, refeicoes: null, hidratacao: null, msg: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = form.peso && (form.energia || form.desempenho || form.hidratacao)

  const selBtn = (active: boolean, activeColor = '#1D9E75') => ({
    width: 44, height: 44, borderRadius: 8, fontSize: 14, fontWeight: 600,
    background: active ? activeColor : '#fff',
    color: active ? '#fff' : '#6b7280',
    border: `1px solid ${active ? activeColor : '#e5e7eb'}`,
    cursor: 'pointer',
    transition: 'all 0.15s',
  } as React.CSSProperties)

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#F0FAF5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>✅</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Check-in enviado! 🎉</div>
        <div style={{ color: '#6b7280', fontSize: 14 }}>Obrigado, {firstName}! Seus dados foram registrados.</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0FAF5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 16px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
        <Leaf size={22} color="#0F5E45" />
        <span style={{ fontWeight: 700, fontSize: 18, color: '#0F5E45' }}>NutriOS</span>
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '28px 28px 24px' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Oi, {firstName}! 👋</h2>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Preencha seu check-in semanal abaixo</p>
        </div>

        {/* Peso */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>⚖️ Peso (kg)</div>
          <input
            type="number"
            placeholder="Ex: 68,5"
            step={0.1}
            value={form.peso}
            onChange={e => setForm({ ...form, peso: e.target.value })}
            style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Energia */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>⚡ Energia (1-5)</div>
          <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>1 = muito ruim · 5 = excelente</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setForm({ ...form, energia: n })} style={selBtn(form.energia === n)}>{n}</button>
            ))}
          </div>
        </div>

        {/* Desempenho */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>💪 Desempenho nos treinos (1-5)</div>
          <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>1 = muito ruim · 5 = excelente</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setForm({ ...form, desempenho: n })} style={selBtn(form.desempenho === n)}>{n}</button>
            ))}
          </div>
        </div>

        {/* Refeições fora */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>🍽️ Refeições fora do plano</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['0', '1-2', '3-4', '5-6', '7+'].map(n => (
              <button key={n} onClick={() => setForm({ ...form, refeicoes: n })}
                style={{ ...selBtn(form.refeicoes === n, '#ef4444'), width: 'auto', padding: '0 14px' }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Hidratação */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>💧 Hidratação (1-5)</div>
          <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>1 = muito ruim · 5 = excelente</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setForm({ ...form, hidratacao: n })} style={selBtn(form.hidratacao === n, '#3b82f6')}>{n}</button>
            ))}
          </div>
        </div>

        {/* Mensagem */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>💬 Mensagem (opcional)</div>
          <textarea
            placeholder="Conte como foi sua semana..."
            value={form.msg}
            onChange={e => setForm({ ...form, msg: e.target.value })}
            style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', fontSize: 14, minHeight: 80, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {!canSubmit && (
          <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 10 }}>Preencha o peso e pelo menos um indicador</p>
        )}

        <button
          onClick={() => canSubmit && setSubmitted(true)}
          style={{
            width: '100%',
            background: canSubmit ? '#1D9E75' : '#d1d5db',
            color: '#fff',
            padding: '13px',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: canSubmit ? 'pointer' : 'default',
            transition: 'background 0.2s',
            border: 'none',
          }}
        >
          Enviar Check-in
        </button>
      </div>
    </div>
  )
}
