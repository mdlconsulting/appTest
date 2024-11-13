//express server and API
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { makePrediction } = require('./prediction').default;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/predict', async (req, res) => {
  const { latitude, longitude, date } = req.body;
  try {
    const predictionResult = await makePrediction({ latitude, longitude, date });
    res.json(predictionResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
