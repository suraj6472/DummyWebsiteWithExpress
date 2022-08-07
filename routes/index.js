const express = require('express');

const speakerRoutes = require('./speakers');
const feedbackRoutes = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', async (request, response) => {
    const { speakerService } = params;
    const topSpeakers = await speakerService.getList();
    response.render('layout/index', {
      pageTitle: 'Welcome',
      template: 'index',
      topSpeakers,
    });
  });

  router.use('/speakers', speakerRoutes(params));
  router.use('/feedback', feedbackRoutes(params));

  return router;
};
