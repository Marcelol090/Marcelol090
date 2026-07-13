# Doran OP 5.1

Plataforma de exploração profissional baseada em interesses RIASEC, contexto, evidências e microexperimentos.

O frontend React e a função Gemini são publicados juntos pelo mesmo projeto Vercel. O Doran não depende de um segundo backend em produção.

## Stack

- React + Vite;
- Tailwind CSS 4;
- componentes shadcn/ui no modelo copy-and-own;
- Motion for React com suporte a `prefers-reduced-motion`;
- Lucide;
- Google Gen AI SDK;
- Vercel Functions.

## Arquitetura

```text
Navegador
  ├── aplicação React
  └── /api/report
        └── Vercel Function
              └── Google Gemini
```

A chamada same-origin mantém frontend e contrato da API no mesmo commit e evita divergência entre dois projetos.

Leia [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) para os detalhes.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run check
```

O comando verifica a sintaxe da função serverless e produz o build Vite de produção.

## Produção

Configure como segredo na Vercel:

```env
GEMINI_API_KEY=...
```

Variáveis opcionais:

```env
DORAN_GEMINI_MODEL=gemini-2.5-flash
DORAN_GEMINI_FALLBACK_MODEL=gemini-2.5-flash-lite
```

`VITE_DORAN_API_URL` deve permanecer vazio em produção. O navegador usa `/api/report` no mesmo domínio.

## Tratamento de falhas

A interface não chama `response.json()` cegamente. Ela valida o `Content-Type`, preserva um trecho seguro da resposta e apresenta uma mensagem legível quando a infraestrutura retorna HTML ou texto simples.

Isso impede erros opacos como:

```text
Unexpected token 'A', "An error occurred..." is not valid JSON
```

## Limite metodológico

O Doran é uma ferramenta educacional e exploratória. Não produz avaliação psicológica, diagnóstico, laudo ou parecer profissional. Percentuais representam aderência relativa entre cursos comparados, não chance de sucesso, emprego, conclusão ou satisfação.

## Design

A interface usa narrativa por scroll, estados reais de infraestrutura, hierarquia editorial e movimento restrito. Leia [`design-system/MASTER.md`](./design-system/MASTER.md) antes de alterar aparência ou interação.
