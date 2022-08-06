const express = require("express");
const path = require("path");
const router = require('./routes');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

app.use(express.static('./static'));

app.use('/', router());

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
