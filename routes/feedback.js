const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      feedbackList = await feedbackService.getList();
      response.json(feedbackList);
    } catch (error) {
      throw new Error(error);
    }
  });

  router.post('/', (request, response, next) => {
    try {
      response.send('Feedback form posted');
    } catch (error) {
      throw new Error(error);
    }
  });

  return router;
};
