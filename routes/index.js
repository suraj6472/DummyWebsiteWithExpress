const express = require('express');

const speakerRoutes = require('./speakers');
const feedbackRoutes = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    if (!request.session.visitCount) {
      request.session.visitCount = 0;
    }
    request.session.visitCount += 1;

    console.log(request.session.visitCount);
    response.render('layout/index', { pageTitle: 'Welcome', template: 'index' });
  });

  router.use('/speakers', speakerRoutes(params));
  router.use('/feedback', feedbackRoutes(params));

  return router;
};
