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
// gets all users
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respond(request, response, 200, responseJSON);
};

// sends back a "not real" page
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, 404, responseJSON);
};

// default - sends back 404
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

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

// function to add a user from a POST body
const addUser = (request, response, body) => {
  console.log(body);

  // default = error, as correct changes it
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // check for name / age existing - if not, exit with 400
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respond(request, response, 400, responseJSON);
  }

  // must be valid -> change to 204 for just updating
  let responseCode = 204;

  // if a new name
  if (!users[body.name]) {
    // change to 201 since we're adding / create empty user
    responseCode = 201;
    users[body.name] = {};
  }

  // add / update fields for user
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // if new user, send 201 to signify
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respond(request, response, responseCode, responseJSON);
  }
  // 204 means we're just updating - no message back
  return respondMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
  addUser,
};
