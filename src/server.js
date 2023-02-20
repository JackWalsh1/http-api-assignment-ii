const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getIndexCSS,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notReal,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notRealMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addUser': jsonHandler.addUsers,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.log(routes[request.method][parsedUrl.pathname]);

  // if request method does not exist
  if (!routes[request.method]) {
    // notFound head
    return routes.HEAD.notFound(request, response);
  }

    // if path exists
  if (routes[request.method][parsedUrl.pathname]) {
    console.log("found path uwu");
    // go to there
    return routes[request.method][parsedUrl.pathname](request, response);
  }

  // otherwise return notFound for that
  return routes[request.method].notFound(request, response);
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
