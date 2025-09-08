// /api/auth.js
export default async function handler(req, res) {
  // Use os nomes das variáveis que você tem na Vercel
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const code = url.searchParams.get("code");

  // Verifica se é o callback do GitHub (se a URL contém o parâmetro ?code=)
  if (code) {
    try {
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await response.json();
      const accessToken = data.access_token;

      // IMPORTANTE: O Decap CMS espera um script HTML como resposta, não um JSON.
      const script = `
        <script>
          const opener = window.opener;
          if (opener) {
            opener.postMessage(
              'authorization:github:success:${JSON.stringify({
                token: accessToken,
                provider: "github"
              })}',
              '*'
            );
            window.close();
          }
        </script>
      `;

      return res.status(200).setHeader('Content-Type', 'text/html').send(script);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "OAuth callback failed" });
    }
  }

  // Se não tiver o ?code=, inicia o login redirecionando pro GitHub
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`;
  return res.redirect(GITHUB_AUTH_URL);
}