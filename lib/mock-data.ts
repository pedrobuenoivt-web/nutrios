export interface CheckinWeek {
  week: number;
  energia: number;
  desempenho: number;
  refeicoesFora: number;
  hidratacao: number;
  peso: number;
  observacao: string;
}

export interface Student {
  id: number;
  name: string;
  token: string;
  score: number;
  weight: number;
  payment: 'pago' | 'pendente' | 'atrasado';
  daysLate: number;
  emoji: string;
  plan: string;
  startDate: string;
  history: CheckinWeek[];
}

export const students: Student[] = [
  {
    id: 1,
    name: 'Ana Paula Silva',
    token: '1',
    score: 4.7,
    weight: 68.5,
    payment: 'pago',
    daysLate: 0,
    emoji: '👩‍🦱',
    plan: 'R$ 350/mês',
    startDate: 'Mar 2024',
    history: [
      { week: 1, energia: 5, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 68.7, observacao: 'Semana boa, mantendo ritmo.' },
      { week: 2, energia: 5, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 68, observacao: 'Um pouco cansado(a), treinos intensos.' },
      { week: 3, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 5, peso: 68.2, observacao: '' },
      { week: 4, energia: 5, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 67.7, observacao: 'Viagem no fim de semana, alimentação fora.' },
      { week: 5, energia: 5, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 67.5, observacao: 'Ótima semana, bateu todas as metas.' },
      { week: 6, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 5, peso: 67, observacao: '' },
      { week: 7, energia: 5, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 66.8, observacao: 'Cansaço acumulado, mas não faltou treino.' },
      { week: 8, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 66.6, observacao: '' }
    ]
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    token: '2',
    score: 4.3,
    weight: 85.2,
    payment: 'pago',
    daysLate: 0,
    emoji: '🧔',
    plan: 'R$ 350/mês',
    startDate: 'Jan 2024',
    history: [
      { week: 1, energia: 4, desempenho: 5, refeicoesFora: 2, hidratacao: 4, peso: 86.5, observacao: 'Iniciando bem.' },
      { week: 2, energia: 5, desempenho: 4, refeicoesFora: 3, hidratacao: 5, peso: 86, observacao: '' },
      { week: 3, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 85.8, observacao: 'Mantendo consistência.' },
      { week: 4, energia: 4, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 85.5, observacao: '' },
      { week: 5, energia: 5, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 85.3, observacao: 'Boa evolução.' },
      { week: 6, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 4, peso: 85.1, observacao: '' },
      { week: 7, energia: 4, desempenho: 5, refeicoesFora: 2, hidratacao: 4, peso: 85, observacao: '' },
      { week: 8, energia: 5, desempenho: 4, refeicoesFora: 1, hidratacao: 5, peso: 85.2, observacao: 'Semana de recuperação.' }
    ]
  },
  {
    id: 3,
    name: 'Mariana Costa',
    token: '3',
    score: 3.3,
    weight: 62.8,
    payment: 'pendente',
    daysLate: 0,
    emoji: '👩',
    plan: 'R$ 350/mês',
    startDate: 'Fev 2024',
    history: [
      { week: 1, energia: 3, desempenho: 4, refeicoesFora: 4, hidratacao: 3, peso: 63.5, observacao: '' },
      { week: 2, energia: 4, desempenho: 3, refeicoesFora: 5, hidratacao: 3, peso: 63.3, observacao: 'Semana difícil no trabalho.' },
      { week: 3, energia: 3, desempenho: 3, refeicoesFora: 4, hidratacao: 4, peso: 63.1, observacao: '' },
      { week: 4, energia: 3, desempenho: 4, refeicoesFora: 3, hidratacao: 3, peso: 63, observacao: '' },
      { week: 5, energia: 4, desempenho: 3, refeicoesFora: 4, hidratacao: 3, peso: 62.9, observacao: '' },
      { week: 6, energia: 3, desempenho: 3, refeicoesFora: 5, hidratacao: 4, peso: 62.8, observacao: 'Faltou em 2 treinos.' },
      { week: 7, energia: 3, desempenho: 4, refeicoesFora: 4, hidratacao: 3, peso: 62.8, observacao: '' },
      { week: 8, energia: 4, desempenho: 3, refeicoesFora: 3, hidratacao: 3, peso: 62.8, observacao: '' }
    ]
  },
  {
    id: 4,
    name: 'Pedro Santos',
    token: '4',
    score: 1.7,
    weight: 92.1,
    payment: 'atrasado',
    daysLate: 17,
    emoji: '👨',
    plan: 'R$ 350/mês',
    startDate: 'Abr 2024',
    history: [
      { week: 1, energia: 2, desempenho: 2, refeicoesFora: 6, hidratacao: 1, peso: 93, observacao: 'Difícil adaptar rotina.' },
      { week: 2, energia: 1, desempenho: 2, refeicoesFora: 7, hidratacao: 2, peso: 92.8, observacao: '' },
      { week: 3, energia: 2, desempenho: 1, refeicoesFora: 6, hidratacao: 1, peso: 92.7, observacao: 'Faltou vários treinos.' },
      { week: 4, energia: 1, desempenho: 2, refeicoesFora: 7, hidratacao: 2, peso: 92.6, observacao: '' },
      { week: 5, energia: 2, desempenho: 2, refeicoesFora: 5, hidratacao: 1, peso: 92.4, observacao: '' },
      { week: 6, energia: 1, desempenho: 1, refeicoesFora: 7, hidratacao: 2, peso: 92.3, observacao: 'Sem motivação.' },
      { week: 7, energia: 2, desempenho: 2, refeicoesFora: 6, hidratacao: 1, peso: 92.2, observacao: '' },
      { week: 8, energia: 2, desempenho: 2, refeicoesFora: 5, hidratacao: 2, peso: 92.1, observacao: '' }
    ]
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    token: '5',
    score: 4.5,
    weight: 58.3,
    payment: 'pago',
    daysLate: 0,
    emoji: '👩‍🦰',
    plan: 'R$ 350/mês',
    startDate: 'Mar 2024',
    history: [
      { week: 1, energia: 5, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 59, observacao: '' },
      { week: 2, energia: 4, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 58.8, observacao: 'Excelente semana.' },
      { week: 3, energia: 5, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 58.6, observacao: '' },
      { week: 4, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 5, peso: 58.5, observacao: '' },
      { week: 5, energia: 5, desempenho: 5, refeicoesFora: 1, hidratacao: 4, peso: 58.4, observacao: '' },
      { week: 6, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 5, peso: 58.3, observacao: '' },
      { week: 7, energia: 5, desempenho: 4, refeicoesFora: 1, hidratacao: 5, peso: 58.3, observacao: 'Meta atingida!' },
      { week: 8, energia: 4, desempenho: 5, refeicoesFora: 2, hidratacao: 4, peso: 58.3, observacao: '' }
    ]
  },
  {
    id: 6,
    name: 'Ricardo Ferreira',
    token: '6',
    score: 3.0,
    weight: 78.9,
    payment: 'pago',
    daysLate: 0,
    emoji: '👨‍🦲',
    plan: 'R$ 350/mês',
    startDate: 'Jan 2024',
    history: [
      { week: 1, energia: 3, desempenho: 3, refeicoesFora: 4, hidratacao: 3, peso: 80, observacao: '' },
      { week: 2, energia: 3, desempenho: 3, refeicoesFora: 3, hidratacao: 3, peso: 79.8, observacao: '' },
      { week: 3, energia: 3, desempenho: 3, refeicoesFora: 4, hidratacao: 3, peso: 79.5, observacao: 'Melhorando aos poucos.' },
      { week: 4, energia: 3, desempenho: 3, refeicoesFora: 3, hidratacao: 3, peso: 79.3, observacao: '' },
      { week: 5, energia: 3, desempenho: 3, refeicoesFora: 4, hidratacao: 3, peso: 79.1, observacao: '' },
      { week: 6, energia: 3, desempenho: 3, refeicoesFora: 3, hidratacao: 3, peso: 79, observacao: '' },
      { week: 7, energia: 3, desempenho: 3, refeicoesFora: 4, hidratacao: 3, peso: 78.9, observacao: '' },
      { week: 8, energia: 3, desempenho: 3, refeicoesFora: 3, hidratacao: 3, peso: 78.9, observacao: 'Mantendo ritmo.' }
    ]
  },
  {
    id: 7,
    name: 'Julia Mendes',
    token: '7',
    score: 2.3,
    weight: 71.2,
    payment: 'atrasado',
    daysLate: 10,
    emoji: '👱‍♀️',
    plan: 'R$ 350/mês',
    startDate: 'Fev 2024',
    history: [
      { week: 1, energia: 2, desempenho: 3, refeicoesFora: 5, hidratacao: 2, peso: 72, observacao: '' },
      { week: 2, energia: 2, desempenho: 2, refeicoesFora: 6, hidratacao: 2, peso: 71.9, observacao: 'Pouco tempo para treinar.' },
      { week: 3, energia: 2, desempenho: 3, refeicoesFora: 5, hidratacao: 2, peso: 71.7, observacao: '' },
      { week: 4, energia: 3, desempenho: 2, refeicoesFora: 5, hidratacao: 2, peso: 71.6, observacao: '' },
      { week: 5, energia: 2, desempenho: 2, refeicoesFora: 6, hidratacao: 3, peso: 71.5, observacao: '' },
      { week: 6, energia: 2, desempenho: 3, refeicoesFora: 5, hidratacao: 2, peso: 71.4, observacao: '' },
      { week: 7, energia: 2, desempenho: 2, refeicoesFora: 6, hidratacao: 2, peso: 71.3, observacao: 'Sem energia.' },
      { week: 8, energia: 3, desempenho: 2, refeicoesFora: 5, hidratacao: 2, peso: 71.2, observacao: '' }
    ]
  },
  {
    id: 8,
    name: 'Bruno Alves',
    token: '8',
    score: 4.0,
    weight: 81.5,
    payment: 'pago',
    daysLate: 0,
    emoji: '🧑',
    plan: 'R$ 350/mês',
    startDate: 'Abr 2024',
    history: [
      { week: 1, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 4, peso: 82.5, observacao: '' },
      { week: 2, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 82.3, observacao: 'Boa evolução.' },
      { week: 3, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 4, peso: 82, observacao: '' },
      { week: 4, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 81.9, observacao: '' },
      { week: 5, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 4, peso: 81.7, observacao: '' },
      { week: 6, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 81.6, observacao: 'Consistente.' },
      { week: 7, energia: 4, desempenho: 4, refeicoesFora: 3, hidratacao: 4, peso: 81.5, observacao: '' },
      { week: 8, energia: 4, desempenho: 4, refeicoesFora: 2, hidratacao: 4, peso: 81.5, observacao: '' }
    ]
  }
];