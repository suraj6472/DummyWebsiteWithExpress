const express = require('express');
const path = require('path');
const router = require('./routes');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
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

app.locals.siteName = 'ROUX Meetups';

app.use(async (req, res, next) => {
  try {
    res.locals.speakerNames = await speakerService.getNames();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/', router({ feedbackService, speakerService }));

app.use((req, res, next) => {
  return next(createError(400, 'Not Found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log(res.locals.message);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error', { status, message: res.locals.message });
});


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
