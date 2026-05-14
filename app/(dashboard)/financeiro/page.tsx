'use client'

import { useState } from 'react'
import { students } from '@/lib/mock-data'
import { CreditCard, Search, Filter } from 'lucide-react'

type PaymentFilter = 'all' | 'pago' | 'pendente' | 'atrasado'

export default function FinanceiroPage() {
  const [filter, setFilter] = useState<PaymentFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.payment === filter
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: students.length * 350,
    paid: students.filter(s => s.payment === 'pago').length * 350,
    pending: students.filter(s => s.payment === 'pendente').length * 350,
    overdue: students.filter(s => s.payment === 'atrasado').length * 350,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-sm text-gray-500 mt-1">Controle de pagamentos dos alunos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Faturamento Total</div>
            <div className="text-2xl font-bold text-gray-900">R$ {stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Pagos</div>
            <div className="text-2xl font-bold text-green-600">R$ {stats.paid}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Pendentes</div>
            <div className="text-2xl font-bold text-yellow-600">R$ {stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Atrasados</div>
            <div className="text-2xl font-bold text-red-600">R$ {stats.overdue}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('pago')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pago'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pagos
              </button>
              <button
                onClick={() => setFilter('pendente')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pendente'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setFilter('atrasado')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'atrasado'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Atrasados
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Aluno</th>
                  <th className="text-left py-3 px-4">Plano</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Dias Atraso</th>
                  <th className="text-right py-3 px-4">Valor</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          {student.emoji}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.plan}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            student.payment === 'pago'
                              ? 'bg-green-100 text-green-700'
                              : student.payment === 'pendente'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {student.payment === 'pago' && 'Pago'}
                          {student.payment === 'pendente' && 'Pendente'}
                          {student.payment === 'atrasado' && 'Atrasado'}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      {student.payment === 'atrasado' ? (
                        <span className="text-red-600 font-semibold">{student.daysLate}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">R$ 350</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum aluno encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}