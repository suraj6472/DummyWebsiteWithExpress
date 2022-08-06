const express = require("express");
const path = require("path");

const app = express();

const port = 3000;

app.use(express.static("./static"));

app.get("/", (request, response) => {
  //   response.sendFile(__dirname + "/static/index.html");
  response.sendFile(path.join(__dirname, "/static/index.html"));
});

app.get("/speakers", (request, response) => {
  response.sendFile(path.join(__dirname, "/static/speakers.html"));
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
