# Doran backend legado

O backend não é mais publicado como projeto separado.

A função de produção está em `../doran-vocacional/api/report.mjs` e é implantada junto com o frontend no mesmo projeto Vercel `doran-vocacional`.

## Motivo da consolidação

- chamadas same-origin em `/api/report`;
- eliminação de CORS entre dois projetos;
- frontend e contrato da API versionados no mesmo commit;
- apenas uma configuração de ambiente para Gemini;
- menor risco de publicar frontend e backend incompatíveis.

Esta pasta permanece apenas como referência histórica. Não deve receber um segundo deploy.
