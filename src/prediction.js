import { loadLayersModel, tensor2d } from '@tensorflow/tfjs-node';

async function loadModel() {
  return await loadLayersModel('file://models/trained_model/model.json');
}

async function makePrediction({ latitude, longitude, date }) {
  const model = await loadModel();

  const dateObj = new Date(date);

  return { prediction: (model.predict(tensor2d([[parseFloat(latitude), parseFloat(longitude), dateObj.getTime()]]))).arraySync() };
}

export default { makePrediction };
