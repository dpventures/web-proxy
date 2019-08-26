const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.env.PORT || 5300;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port);
console.log(`starting app at http://localhost:${port}`);

app.get('/test', (req, res) => {
  res.send('api is working!');
});

app.post('/', (req, res) => {
  const url = req.body.url;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`requested url: ${url} by IP: ${ip}`);
  if (url && !url.match(/^https?:\/\/(www\.)?instagram\.com.*/i)) return res.sendStatus(404);
  request(url, function (error, response, body) {
    if (error) return res.sendStatus(500);
    if (response && response.statusCode != 200) return res.sendStatus(response.statusCode);
    return res.send(body);
  });
});
