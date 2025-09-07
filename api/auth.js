// /api/auth.js

const { createVercelHandler } = require('decap-server');

// A nova API usa uma única função para criar o handler completo
// A própria função detecta se é o início do fluxo ou o callback.
const handler = createVercelHandler({
  // Use as mesmas credenciais do seu GitHub OAuth App que estão nas variáveis de ambiente da Vercel
  oauthClientID: process.env.OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,

  // Escopos opcionais que você pode solicitar ao GitHub
  // 'repo' é comum para permitir que o CMS escreva no repositório
  // 'user' para ler a identidade do usuário
  oauthScopes: ['repo', 'user'],
});

// Exporta o handler para ser usado pela Vercel
module.exports = handler;