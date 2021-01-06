const express = require('express');

const app = express();

app.use(express.static('./dist/gstoreplus'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/gstoreplus/'}),
);

app.listen(process.env.PORT || 8080);
