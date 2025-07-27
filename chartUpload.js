// 🖼 routes/chartUpload.js

const express = require('express');
const router = express.Router();
const { QuickChart } = require('quickchart-js');

function buildLineChartConfig({ labels, datasets, options }) {
  return {
    type: 'line',
    data: { labels, datasets },
    options: {
      ...options,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 9 } }
        }
      },
      scales: {
        x: { ticks: { font: { size: 8 } } },
        y: { ticks: { font: { size: 8 } } }
      }
    }
  };
}

router.post('/', async (req, res) => {
  try {
    const config = buildLineChartConfig(req.body);

    const chart = new QuickChart();
    chart.setConfig(config);
    chart.setWidth(800);
    chart.setHeight(400);
    chart.setBackgroundColor('transparent');

    const chartUrl = chart.getUrl(); // or chart.toBinary() if embedding

    res.json({ status: 'success', chartUrl });
  } catch (err) {
    console.error('[chartUpload] Chart generation failed:', err.message);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;