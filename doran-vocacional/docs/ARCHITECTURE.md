# Arquitetura do Doran

## Fonte única

O frontend React e a API de interpretação são publicados pelo mesmo projeto Vercel, com raiz no diretório `doran-vocacional`.

```text
Navegador
  └── /api/report
        └── Vercel Function
              └── Google Gemini
```

A chamada same-origin elimina dependência de CORS, reduz divergência de versões e impede que o frontend seja publicado apontando para um backend inexistente.

## Diretório `doran-backend`

O diretório histórico `doran-backend` permanece apenas para rastreabilidade. O backend ativo está em `doran-vocacional/api`.

Não devem existir dois projetos Vercel concorrentes usando contratos diferentes. A variável `VITE_DORAN_API_URL` fica vazia em produção. Ela só deve ser usada para testes locais com um servidor separado.

## Contrato de resposta

Todas as rotas da API devem responder JSON e informar `content-type: application/json; charset=utf-8`.

O cliente também é defensivo: ele lê o corpo como texto, tenta JSON e preserva um trecho seguro da resposta quando a infraestrutura retorna HTML ou texto simples. Isso evita erros opacos como:

```text
Unexpected token 'A', "An error occurred..." is not valid JSON
```

## Saúde

`GET /api/report` retorna o estado da função, a versão, os modelos configurados e se a chave de IA está presente. A interface usa esse endpoint para mostrar o estado real da infraestrutura.
