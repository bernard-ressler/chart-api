app.post("/chart-upload", async (req, res) => {
  const { chartUrl } = req.body;

  try {
    const response = await axios.get(chartUrl, {
      responseType: "arraybuffer"
    });

    const base64 = Buffer.from(response.data).toString("base64");

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      base64,
      mimeType: response.headers["content-type"]
    }));
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chart image" });
  }
});