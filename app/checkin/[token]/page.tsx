'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { students } from '@/lib/mock-data'
import { Leaf } from 'lucide-react'

interface PageProps {
  params: {
    token: string
  }
}

export default function CheckinPage({ params }: PageProps) {
  const aluno = students.find(s => s.token === params.token)
  
  if (!aluno) {
    notFound()
  }

  const [formData, setFormData] = useState({
    energia: 3,
    desempenho: 3,
    refeicoesFora: 3,
    hidratacao: 3,
    peso: aluno.weight,
    observacao: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Check-in enviado:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check-in Enviado! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Obrigado, {aluno.name}! Seus dados foram registrados com sucesso.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Fazer outro check-in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Check-in Semanal</h1>
              <p className="text-gray-600">Olá, {aluno.name}! 👋</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Como está sua ENERGIA esta semana? (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, energia: val })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      formData.energia === val
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Como está seu DESEMPENHO nos treinos? (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, desempenho: val })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      formData.desempenho === val
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantas REFEIÇÕES FORA da dieta você fez?
              </label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, refeicoesFora: val })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      formData.refeicoesFora === val
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Como está sua HIDRATAÇÃO? (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, hidratacao: val })}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      formData.hidratacao === val
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Qual seu PESO atual? (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.peso}
                onChange={(e) => setFormData({ ...formData, peso: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Observações (opcional)
              </label>
              <textarea
                value={formData.observacao}
                onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                rows={3}
                placeholder="Como foi sua semana? Alguma dificuldade?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              Enviar Check-in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}