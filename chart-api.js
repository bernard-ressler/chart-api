const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/chart-upload", async (req, res) => {
  const { chartUrl } = req.body;

  try {
    const response = await axios.get(chartUrl, {
      responseType: "arraybuffer",
      timeout: 5000
    });

    const base64 = Buffer.from(response.data).toString("base64");

    res.json({
      base64,
      mimeType: response.headers["content-type"]
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch chart image",
      details: error.message
    });
  }
});

// ✅ Ensure the server listens on the port provided by Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Chart API running on port ${PORT}`);
});