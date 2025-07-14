const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/chart-upload", async (req, res) => {
  const { chartUrl } = req.body;

  try {
    const response = await axios.get(chartUrl, {
      responseType: "arraybuffer"
    });

    const base64 = Buffer.from(response.data, "binary").toString("base64");

    res.json({
      base64,
      mimeType: response.headers["content-type"]
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chart image" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Chart API running on port ${PORT}`);
});