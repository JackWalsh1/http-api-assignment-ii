const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const statusHandler = require('./statusResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getIndexCSS,
    '/getUsers': statusHandler.getUsers,
    '/notReal': statusHandler.notReal,
    notFound: statusHandler.notFound,
  },
  HEAD: {
    '/getUsers': statusHandler.getUsersMeta,
    '/notReal': statusHandler.notRealMeta,
    notFound: statusHandler.notFoundMeta,
  },
  POST: {
    '/addUser': statusHandler.addUser,
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (!routes[request.method]) {
    return routes.HEAD.notFound(request, response);
  }

  if (routes[request.method][parsedUrl.pathname]) {
    return routes[request.method][parsedUrl.pathname](request, response, params);
  }
  return routes[request.method].notFound(request, response);
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
