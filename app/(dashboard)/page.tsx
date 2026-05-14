'use client'

import { useState } from 'react'
import Link from 'next/link'
import { students } from '@/lib/mock-data'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight } from 'lucide-react'

function semColor(score: number): string {
  if (score >= 4.5) return '🟢'
  if (score >= 3.5) return '🟡'
  return '🔴'
}

export default function DashboardPage() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const metrics = [
    { label: 'Alunos Ativos',         value: '8',         icon: '👥', red: false },
    { label: 'Score Médio',           value: '3.5',       icon: '⭐', red: false },
    { label: 'Pagamentos Atrasados',  value: '2',         icon: '💰', red: true  },
    { label: 'Taxa de Adesão',        value: '87%',       icon: '📊', red: false },
  ]

  const alerts = [
    '⚠️ 3 alunos com energia ≤ 2 essa semana',
    '🔔 2 alunos sem check-in há +10 dias',
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Visão geral dos seus alunos e métricas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  <div className={`text-2xl font-bold ${metric.red ? 'text-red-600' : 'text-gray-900'}`}>
                    {metric.value}
                  </div>
                </div>
                <div className="text-3xl">{metric.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="font-medium text-yellow-800 mb-2">Alertas</div>
          {alerts.map((alert, i) => (
            <div key={i} className="text-sm text-yellow-700">{alert}</div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontWeight: 600, fontSize: 16 }}>Alunos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="w-8"></th>
                  <th className="text-left py-3 px-4">Nome</th>
                  <th className="text-center py-3 px-4">Score</th>
                  <th className="text-center py-3 px-4">Peso (kg)</th>
                  <th className="text-center py-3 px-4">Pagamento</th>
                  <th className="text-center py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const isExpanded = expandedRows.has(student.id)
                  const lastWeek = student.history[student.history.length - 1]
                  const prevWeek = student.history[student.history.length - 2]
                  const weightDiff = lastWeek.peso - prevWeek.peso

                  return (
                    <React.Fragment key={student.id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <button
                            onClick={() => toggleRow(student.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                              {student.emoji}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl">{semColor(student.score)}</span>
                            <span className="font-semibold">{student.score.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-semibold">{student.weight}</span>
                            {weightDiff !== 0 && (
                              <span className={`text-sm ${weightDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {weightDiff > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              student.payment === 'pago'
                                ? 'bg-green-100 text-green-700'
                                : student.payment === 'pendente'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {student.payment === 'pago' && '✓ Pago'}
                            {student.payment === 'pendente' && '⏳ Pendente'}
                            {student.payment === 'atrasado' && `❌ ${student.daysLate}d`}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Link
                            href={`/aluno/${student.id}`}
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Ver perfil
                          </Link>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-gray-50 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold mb-3">Evolução do Score (8 semanas)</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                  <LineChart data={student.history}>
                                    <XAxis 
                                      dataKey="week" 
                                      tickFormatter={(w) => `S${w}`}
                                    />
                                    <YAxis domain={[0, 5]} />
                                    <Tooltip 
                                      labelFormatter={(w) => `Semana ${w}`}
                                      formatter={(value: number) => value.toFixed(1)}
                                    />
                                    <Line 
                                      type="monotone" 
                                      dataKey={(w) => ((w.energia + w.desempenho + w.hidratacao + (7 - w.refeicoesFora)) / 20) * 5}
                                      stroke="#10b981" 
                                      strokeWidth={2}
                                      name="Score"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>

                              <div>
                                <h3 className="font-semibold mb-3">Evolução do Peso (8 semanas)</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                  <LineChart data={student.history}>
                                    <XAxis 
                                      dataKey="week" 
                                      tickFormatter={(w) => `S${w}`}
                                    />
                                    <YAxis />
                                    <Tooltip 
                                      labelFormatter={(w) => `Semana ${w}`}
                                      formatter={(value: number) => `${value} kg`}
                                    />
                                    <Line 
                                      type="monotone" 
                                      dataKey="peso" 
                                      stroke="#3b82f6" 
                                      strokeWidth={2}
                                      name="Peso"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'