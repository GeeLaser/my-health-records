const express = require('express');
const path = require('path');
const fileRoute = require('./routes/file');
require('./db/db');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(3030, () => {
  console.log('server started on port 3030');
});
