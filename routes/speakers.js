const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    speakers = await speakerService.getList();
    response.render('layout', { template: 'speakers', speakers, pageTitle: 'Speakers' });
  });

  router.get('/:shortname', async (request, response) => {
    let shortname = request.params.shortname;
    const speaker = await speakerService.getSpeaker(shortname);
    const speakerArtwork = await speakerService.getArtworkForSpeaker(shortname);
    response.render('layout', {
      template: 'speakers-details',
      speaker,
      speakerArtwork,
      pageTitle: speaker.name,
    });
  });

  return router;
};
