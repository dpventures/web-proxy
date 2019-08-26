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

app.post('/geturl', (req, res) => {
  const url = req.body.url;
  request(url, function (error, response, body) {
    if (error) return res.sendStatus(500);
    if (response && response.statusCode != 200) return res.sendStatus(response.statusCode);
    res.send(body);
  });
});
