const http = require('node:http');

const PORT = 8050;

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('------- METHOD: -------');
  console.log(req.method);

  console.log('------- URL: -------');
  console.log(req.url);

  console.log('------- HEADERS: -------');
  console.log(req.headers);

  console.log('------- BODY: -------');
  req.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
