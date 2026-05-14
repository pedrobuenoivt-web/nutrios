export type Payment = 'pago' | 'pendente' | 'atrasado'

export interface CheckinWeek {
  semana: string
  energia: number
  desempenho: number
  hidratacao: number
  refeicoesFora: number
  peso: number
  observacao: string
  score: number
}

export interface Student {
  id: number
  name: string
  token: string
  score: number
  weight: number
  payment: Payment
  daysLate: number
  emoji: string
  plan: number
  start: string
  history: CheckinWeek[]
}

function makeHistory(baseScore: number, weightStart: number): CheckinWeek[] {
  const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
  const obs = [
    'Semana boa, mantendo ritmo.',
    'Um pouco cansado(a), treinos intensos.',
    '',
    'Viagem no fim de semana, alimentação fora.',
    'Ótima semana, bateu todas as metas.',
    '',
    'Cansaço acumulado, mas não faltou treino.',
    '',
  ]
  return weeks.map((semana, i) => {
    const energia = Math.min(5, Math.max(1, Math.round(baseScore + (Math.random() - 0.5) * 2)))
    const desempenho = Math.min(5, Math.max(1, Math.round(baseScore + (Math.random() - 0.5) * 2)))
    const hidratacao = Math.min(5, Math.max(1, Math.round(baseScore + (Math.random() - 0.5) * 2)))
    const score = parseFloat(((energia + desempenho + hidratacao) / 3).toFixed(1))
    return {
      semana,
      energia,
      desempenho,
      hidratacao,
      refeicoesFora: Math.floor(Math.random() * 4),
      peso: parseFloat((weightStart - i * 0.3 + (Math.random() - 0.5) * 0.6).toFixed(1)),
      observacao: obs[i],
      score,
    }
  })
}

export const STUDENTS: Student[] = [
  { id: 1, name: 'Ana Paula Silva',   token: '1', score: 4.7, weight: 68.5, payment: 'pago',     daysLate: 0,  emoji: '👩',    plan: 350, start: 'Mar 2024' },
  { id: 2, name: 'Carlos Oliveira',   token: '2', score: 4.3, weight: 85.2, payment: 'pago',     daysLate: 0,  emoji: '👨',    plan: 350, start: 'Jan 2024' },
  { id: 3, name: 'Mariana Costa',     token: '3', score: 3.3, weight: 62.8, payment: 'pendente', daysLate: 0,  emoji: '👩‍🦱', plan: 350, start: 'Fev 2024' },
  { id: 4, name: 'Pedro Santos',      token: '4', score: 1.7, weight: 92.1, payment: 'atrasado', daysLate: 17, emoji: '🧔',    plan: 350, start: 'Dez 2023' },
  { id: 5, name: 'Fernanda Lima',     token: '5', score: 4.5, weight: 58.3, payment: 'pago',     daysLate: 0,  emoji: '👩‍🦰', plan: 350, start: 'Abr 2024' },
  { id: 6, name: 'Ricardo Ferreira',  token: '6', score: 3.0, weight: 78.9, payment: 'pago',     daysLate: 0,  emoji: '👨‍🦲', plan: 350, start: 'Nov 2023' },
  { id: 7, name: 'Julia Mendes',      token: '7', score: 2.0, weight: 55.6, payment: 'atrasado', daysLate: 10, emoji: '👱‍♀️', plan: 350, start: 'Mai 2024' },
  { id: 8, name: 'Bruno Almeida',     token: '8', score: 4.8, weight: 88.4, payment: 'pago',     daysLate: 0,  emoji: '👨‍🦱', plan: 350, start: 'Out 2023' },
].map(s => ({ ...s, history: makeHistory(s.score, s.weight) }))

export function semColor(s: Student): string {
  if (s.score >= 4 && s.payment === 'pago') return '#22c55e'
  if (s.score < 2.5 || s.payment === 'atrasado') return '#ef4444'
  return '#f59e0b'
}
