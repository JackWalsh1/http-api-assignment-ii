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
    '/addUser': jsonHandler.addUser,
    notFound: jsonHandler.notFound,
  },
};

const parseBody = (request, response, handler) => {
  const body = [];

  console.log('chunks coming');

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });

  console.log(body);

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
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
    console.log([request.method]);

    // special parse body for post
    if (request.method === 'POST') {
      console.log(request);
      parseBody(request, response, routes[request.method][parsedUrl.pathname]);
    }

    // get or head -> go there
    return routes[request.method][parsedUrl.pathname](request, response);
  }

  // otherwise return notFound for that
  return routes[request.method].notFound(request, response);
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
