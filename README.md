# NutriOS — Sistema de Gestão para Personal Trainers

## Estrutura do projeto

```
nutrios/
├── app/
│   ├── layout.tsx                        ← Root layout (sem sidebar)
│   ├── globals.css
│   ├── (dashboard)/
│   │   ├── layout.tsx                    ← Layout com sidebar
│   │   ├── page.tsx                      ← Dashboard principal
│   │   ├── financeiro/
│   │   │   └── page.tsx                  ← Financeiro
│   │   └── aluno/
│   │       └── [id]/
│   │           └── page.tsx              ← Perfil do aluno
│   └── checkin/
│       └── [token]/
│           └── page.tsx                  ← Check-in público (sem sidebar)
├── components/
│   └── Sidebar.tsx
└── lib/
    └── mock-data.ts                      ← Dados dos 8 alunos
```

## Instalação e uso

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000          → Dashboard
# http://localhost:3000/financeiro
# http://localhost:3000/aluno/1  → Perfil da Ana Paula
# http://localhost:3000/checkin/1 → Check-in público da Ana Paula
```

## Deploy na Vercel

```bash
# 1. Subir no GitHub
git init && git add . && git commit -m "init nutrios"
git remote add origin https://github.com/SEU-USER/nutrios
git push -u origin main

# 2. Acessar vercel.com → Add New Project → conectar repo → Deploy
```

## URLs de check-in por aluno

Cada aluno tem um token único para acessar a página de check-in:

| Aluno           | URL de Check-in              |
|-----------------|------------------------------|
| Ana Paula Silva | /checkin/1                   |
| Carlos Oliveira | /checkin/2                   |
| Mariana Costa   | /checkin/3                   |
| Pedro Santos    | /checkin/4                   |
| Fernanda Lima   | /checkin/5                   |
| Ricardo Ferreira| /checkin/6                   |
| Julia Mendes    | /checkin/7                   |
| Bruno Almeida   | /checkin/8                   |

## Próximos passos (versão real)

1. **Banco de dados** → Supabase (PostgreSQL gratuito)
2. **Autenticação** → Supabase Auth ou NextAuth.js
3. **Webhook Cakto** → Criar conta do personal trainer após compra aprovada
