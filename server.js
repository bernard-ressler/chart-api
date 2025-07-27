// 🚀 server.js

const express = require('express');
const bodyParser = require('body-parser');
const chartUploadRoute = require('./routes/chartUpload');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/chart-upload', chartUploadRoute);

app.listen(port, () => {
  console.log(`Chart server running at http://localhost:${port}`);
});