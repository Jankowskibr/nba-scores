const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/scores', async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const url = `https://nba-scores-worker.jankowskibr.workers.dev/scores`;
    console.log('Fetching from:', url);

    const response = await axios.get(url, {
      headers: {
        'Authorization': '84ca0154-9d7e-46e9-9f63-2495fd4cb273'
      }
    });

    const games = response.data.data;
    res.json({ games });
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).send('Failed to fetch NBA scores');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
