import Link from 'next/link'
import { notFound } from 'next/navigation'
import { students } from '@/lib/mock-data'
import { 
  ArrowLeft, Calendar, CreditCard, TrendingUp, 
  TrendingDown, Activity, Droplet, Utensils, Zap 
} from 'lucide-react'

interface PageProps {
  params: {
    id: string
  }
}

export default function AlunoPage({ params }: PageProps) {
  const aluno = students.find(s => s.id === parseInt(params.id))
  
  if (!aluno) {
    notFound()
  }

  const lastWeek = aluno.history[aluno.history.length - 1]
  const previousWeek = aluno.history[aluno.history.length - 2]
  
  const weightChange = lastWeek.peso - previousWeek.peso
  const scoreChange = (
    ((lastWeek.energia + lastWeek.desempenho + lastWeek.hidratacao + (7 - lastWeek.refeicoesFora)) / 20) * 5 -
    ((previousWeek.energia + previousWeek.desempenho + previousWeek.hidratacao + (7 - previousWeek.refeicoesFora)) / 20) * 5
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                {aluno.emoji}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{aluno.name}</h1>
                <p className="text-gray-500">Aluno desde {aluno.startDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-3xl font-bold text-green-600">{aluno.score.toFixed(1)}</div>
              <div className={`text-sm ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scoreChange >= 0 ? '↑' : '↓'} {Math.abs(scoreChange).toFixed(1)} vs semana anterior
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Energia</span>
            </div>
            <div className="text-2xl font-bold">{lastWeek.energia}/5</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Desempenho</span>
            </div>
            <div className="text-2xl font-bold">{lastWeek.desempenho}/5</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Refeições Fora</span>
            </div>
            <div className="text-2xl font-bold">{lastWeek.refeicoesFora}</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-5 h-5 text-cyan-600" />
              <span className="text-sm text-gray-600">Hidratação</span>
            </div>
            <div className="text-2xl font-bold">{lastWeek.hidratacao}/5</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Peso Atual</h2>
            <div className="flex items-end gap-2">
              <div className="text-4xl font-bold">{aluno.weight} kg</div>
              <div className={`flex items-center gap-1 mb-2 ${weightChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {weightChange <= 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                <span className="font-semibold">{Math.abs(weightChange).toFixed(1)} kg</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Pagamento</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  aluno.payment === 'pago' ? 'bg-green-100 text-green-700' :
                  aluno.payment === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {aluno.payment === 'pago' ? 'Em dia' : 
                   aluno.payment === 'pendente' ? 'Pendente' : 
                   `Atrasado ${aluno.daysLate} dias`}
                </div>
                <div className="text-2xl font-bold mt-2">{aluno.plan}</div>
              </div>
              <CreditCard className="w-12 h-12 text-gray-300" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Histórico de Check-ins (8 semanas)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Semana</th>
                  <th className="text-center py-3 px-4">Energia</th>
                  <th className="text-center py-3 px-4">Desempenho</th>
                  <th className="text-center py-3 px-4">Refeições Fora</th>
                  <th className="text-center py-3 px-4">Hidratação</th>
                  <th className="text-center py-3 px-4">Peso (kg)</th>
                  <th className="text-left py-3 px-4">Observação</th>
                </tr>
              </thead>
              <tbody>
                {aluno.history.map((week) => (
                  <tr key={week.week} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Semana {week.week}</td>
                    <td className="text-center py-3 px-4">{week.energia}/5</td>
                    <td className="text-center py-3 px-4">{week.desempenho}/5</td>
                    <td className="text-center py-3 px-4">{week.refeicoesFora}</td>
                    <td className="text-center py-3 px-4">{week.hidratacao}/5</td>
                    <td className="text-center py-3 px-4">{week.peso}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{week.observacao || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}