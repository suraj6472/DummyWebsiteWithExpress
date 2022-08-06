const express = require('express');

const speakerRoutes = require('./speakers');
const feedbackRoutes = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', async (request, response) => {
    // if (!request.session.visitCount) {
    //   request.session.visitCount = 0;
    // }
    // request.session.visitCount += 1;

    const { speakerService } = params;
    const topSpeakers = await speakerService.getList();

    //PASSING TEMPLATE: here second argument is the object of variable being passed to that specific template
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
