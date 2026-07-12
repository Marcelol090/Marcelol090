# Doran OP 2.0

Frontend e backend unificados na Vercel.

## Stack

- React
- Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- estrutura shadcn/ui no modelo copy-and-own
- Motion for React
- Lucide icons
- Google Gen AI SDK
- Vercel Functions

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
```

Variável obrigatória na Vercel:

```env
GEMINI_API_KEY=...
```

## Limite metodológico

A aplicação é uma ferramenta educacional e de exploração de carreira. Ela não produz avaliação psicológica, diagnóstico, laudo ou parecer profissional. Os percentuais dos cursos são aderências relativas dentro do conjunto comparado.

## Fonte visual

Leia `design-system/MASTER.md` antes de alterar aparência ou interação. Regras específicas de página ficam em `design-system/pages/`.
