const http = require('node:http');
const fs = require('node:fs/promises');

class Butter {
  constructor() {
    this.server = http.createServer();

    /**
     * {
     *  "get/": () => { *** },
     *  "post/upload": () => { *** }
     * }
     */
    this.routes = {};
    this.middleware = [];

    this.server.on('request', (req, res) => {
      // Send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();

        res.setHeader('Content-Type', mime);

        fileStream.pipe(res);
      };

      // Set the status code of the response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      // Send a json data back to the client (for small json data, less than the highWaterMark value)
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      };

      const runMiddleware = (req, res, middleware, index) => {
        // Our exit point
        if (index === middleware.length) {
          // if the routes object does not have the key of req.method + req.url
          if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
            return res
              .status(404)
              .json({ error: `Cannot ${req.method} ${req.url}` });
          }

          this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
        } else {
          middleware[index](req, res, () => {
            runMiddleware(req, res, middleware, index + 1);
          });
        }
      };

      runMiddleware(req, res, this.middleware, 0);
    });
  }

  // Object methods
  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  beforeEach(cb) {
    this.middleware.push(cb);
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Butter;
