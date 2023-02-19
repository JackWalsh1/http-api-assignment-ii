// function to send response
let responseObj;

// response objects
const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(content);
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};


// GET METHODS
const getUsers = () => {

}

const notReal = () => {

}

const notFound = (request, response) => {

    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

  // return obj with
  return respond(request, response, 404, responseJSON);
};

// HEAD METHODS
const getUsersMeta = () => {

}

const notRealMeta = () => {

}

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

// POST METHODS
const addUsers = () => {

}

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
};
