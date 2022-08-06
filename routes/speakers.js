const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.send('Speaker List');
  });

  router.get('/:shortname', (request, response) => {
    response.send(`This is shortname ${request.params.shortname}`);
  });

  return router;
};
