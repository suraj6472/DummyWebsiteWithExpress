const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    speakerList = await speakerService.getList();
    response.json(speakerList);
  });

  router.get('/:shortname', (request, response) => {
    response.send(`This is shortname ${request.params.shortname}`);
  });

  return router;
};
