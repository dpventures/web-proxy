const express = require('express');

const port = process.env.PORT || 5300;
const app = express();
app.listen(port);
console.log(`starting app at http://localhost:${port}`);

app.get('/test', (req, res) => {
  res.send('api is working!');
});
