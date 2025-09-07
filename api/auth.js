// /api/auth.js

const { createVercelBeginHandler, createVercelCompleteHandler } = require('decap-server');

// O handler "begin" redireciona o usuário para a página de autorização do GitHub
const beginAuth = createVercelBeginHandler({
  // Use as mesmas credenciais do seu GitHub OAuth App
  oauthClientID: process.env.OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
});

// O handler "complete" é chamado pelo GitHub após a autorização
// Ele troca o código recebido por um token de acesso
const completeAuth = createVercelCompleteHandler();

// Exporta um handler principal que decide qual função chamar
module.exports = (req, res) => {
  // Verifica se a URL contém 'callback', o que indica que é a fase 'complete'
  if (req.url.includes('callback')) {
    return completeAuth(req, res);
  }
  // Caso contrário, inicia o processo de autenticação
  return beginAuth(req, res);
};