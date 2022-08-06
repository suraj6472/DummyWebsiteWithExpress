const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    speakers = await speakerService.getList();
    response.render('layout', { template: 'speakers', speakers, pageTitle: 'Speakers' });
  });

  router.get('/:shortname', (request, response) => {
    response.send(`This is shortname ${request.params.shortname}`);
  });

  return router;
};
