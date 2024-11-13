//express server and API
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { makePrediction } from './src/prediction.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); 

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

