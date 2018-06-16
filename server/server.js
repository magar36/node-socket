const path = require('path');

const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 2400;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
});
