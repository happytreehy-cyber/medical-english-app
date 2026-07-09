export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  var password = (req.body && req.body.password) || '';
  var correctPassword = process.env.APP_PASSWORD;
  var sessionToken = process.env.SESSION_TOKEN;

  if (!correctPassword || !sessionToken) {
    // Env vars not set up yet on Vercel
    return res.status(500).json({ success: false, message: 'Server not configured. Set APP_PASSWORD and SESSION_TOKEN in Vercel project settings.' });
  }

  if (password === correctPassword) {
    res.setHeader(
      'Set-Cookie',
      'session=' + sessionToken + '; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax'
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
