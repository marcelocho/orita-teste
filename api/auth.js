// /api/auth.js
const { createVercelHandler } = require('decap-server');

// As variáveis de ambiente devem ser OAUTH_CLIENT_ID e OAUTH_CLIENT_SECRET
// para corresponder ao que a biblioteca espera.
const handler = createVercelHandler({
  oauthClientID: process.env.OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
  oauthScopes: ['repo', 'user'],
});

module.exports = handler;