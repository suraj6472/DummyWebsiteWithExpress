const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response) => {
    feedbackList = await feedbackService.getList();
    response.json(feedbackList);
  });

  router.post('/', (request, response) => {
    response.send('Feedback form posted');
  });

  return router;
};
