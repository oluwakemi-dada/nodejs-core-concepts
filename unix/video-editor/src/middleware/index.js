const DB = require('../DB');

exports.authenticate = (req, res, next) => {
  const routesToAuthenticate = [
    'GET /api/user',
    'PUT /api/user',
    'DELETE /api/logout',
    'POST /api/upload-video',
    'GET /api/videos',
  ];

  const routeKey = `${req.method} ${req.url.split('?')[0]}`;

  if (routesToAuthenticate.includes(routeKey)) {
    // If we have a token cookie, then save the userId to the req object

    const parseCookies = (cookieHeader) => {
      const cookies = {};
      cookieHeader.split(';').forEach((cookie) => {
        const parts = cookie.trim().split('=');
        const key = parts.shift();
        const value = parts.join('=');
        cookies[key] = value;
      });
      return cookies;
    };

    if (req.headers.cookie) {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.token;

      DB.update();
      const session = DB.sessions.find((session) => session.token === token);

      if (session) {
        req.userId = session.userId;
        return next();
      }
    }

    return res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
};

exports.serverIndex = (req, res, next) => {
  const routes = ['/', '/login', '/profile'];

  if (routes.indexOf(req.url) !== -1 && req.method === 'GET') {
    return res.status(200).sendFile('./public/index.html', 'text/html');
  } else {
    next();
  }
};
