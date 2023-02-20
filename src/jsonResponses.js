// 'database' of all users
const users = {};

// response objects
const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// GET METHODS
const getUsers = (request, response) => {
  console.log('in getUsers');

  const responseJSON = {
    users,
  };

  return respond(request, response, 200, responseJSON);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return obj with
  return respond(request, response, 404, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return obj with
  return respond(request, response, 404, responseJSON);
};

// HEAD METHODS
const getUsersMeta = (request, response) => {
  respondMeta(request, response, 200);
};

const notRealMeta = (request, response) => {
  respondMeta(request, response, 404);
};

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

// POST METHODS
const addUsers = () => {

};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
  addUsers,
};
