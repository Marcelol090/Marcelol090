# Doran OP Backend

Backend serverless auditável para o Doran OP.

## Rotas

- `GET /api/health`
- `GET /api/courses?axis=&q=`
- `POST /api/score`
- `POST /api/reports/ai`
- `POST /api/assessments`
- `GET /api/assessments/:id?token=`
- `DELETE /api/assessments/:id?token=`

## Princípios

- O cálculo RIASEC e o ranking de cursos são determinísticos.
- A LLM só ajusta o fit de cada candidato entre -0,10 e +0,10; o servidor recalcula as probabilidades.
- Percentuais representam aderência relativa entre cursos comparados, não chance de sucesso, emprego ou satisfação.
- Persistência exige consentimento explícito e `DATABASE_URL`.
- A IA é rotulada como assistente de orientação profissional, nunca psicóloga.

## Variáveis opcionais

- `DORAN_ALLOWED_ORIGIN`
- `DORAN_AI_MODEL` (padrão `openai/gpt-5.4`)
- `AI_GATEWAY_API_KEY` ou OIDC da Vercel
- `DATABASE_URL` para Neon Postgres
