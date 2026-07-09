export default function handler(req, res) {
  var cookieHeader = req.headers.cookie || '';
  var cookies = {};
  cookieHeader.split(';').forEach(function (pair) {
    var idx = pair.indexOf('=');
    if (idx > -1) {
      var key = pair.slice(0, idx).trim();
      var val = pair.slice(idx + 1).trim();
      cookies[key] = val;
    }
  });

  var sessionToken = process.env.SESSION_TOKEN;

  if (sessionToken && cookies.session === sessionToken) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false });
}
