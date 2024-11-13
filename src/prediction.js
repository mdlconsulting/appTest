import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

async function loadModel() {
  return await tf.loadLayersModel('file://models/trained_model/model.json');
}

async function makePrediction({ latitude, longitude, date }) {
  const model = await loadModel();
  const inputTensor = tf.tensor2d([[parseFloat(latitude), parseFloat(longitude), new Date(date).getTime()]]);
  const prediction = model.predict(inputTensor);
  return { prediction: prediction.arraySync() };
}

export { makePrediction };
