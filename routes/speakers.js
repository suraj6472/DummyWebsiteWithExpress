const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response, next) => {
    try {
      speakers = await speakerService.getList();
      response.render('layout', { template: 'speakers', speakers, pageTitle: 'Speakers' });
    } catch (error) {
      throw new Error(error);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      let shortname = request.params.shortname;
      const speaker = await speakerService.getSpeaker(shortname);
      const speakerArtwork = await speakerService.getArtworkForSpeaker(shortname);
      response.render('layout', {
        template: 'speakers-details',
        speaker,
        speakerArtwork,
        pageTitle: speaker.name,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  return router;
};
