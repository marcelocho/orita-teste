export default async function handler(req, res) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

  // Verifica se é o callback do GitHub (quando volta com ?code=)
  if (req.url.startsWith("/api/auth/callback")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const code = url.searchParams.get("code");

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
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "OAuth callback failed", details: err.message });
    }
  }

  // Se não for callback, inicia o login redirecionando pro GitHub
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user`
  );
}
