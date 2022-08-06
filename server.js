const express = require('express');
const path = require('path');
const router = require('./routes');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

app.use(express.static('./static'));
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['dadaspapd', 'asdasdaadsd'],
  })
);

//PASSING TEMPLATE: it will be available throughout the life cycle of the application
app.locals.siteName = 'ROUX Meetups';

//PASSING TEMPLATE: this will be available in all templates
app.use(async (req, res, next) => {
  try {
    res.locals.speakerNames = await speakerService.getNames();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/', router({ feedbackService, speakerService }));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
