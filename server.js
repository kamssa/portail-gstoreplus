const express = require('express');

const app = express();

app.use(express.static('./dist/gstoreplusimmobilier'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/gstoreplusimmobilier/'}),
);

app.listen(process.env.PORT || 8080);
