//model training for predictions
import { tensor2d, sequential, layers, train, losses, node } from '@tensorflow/tfjs-node';
import { getData, fetchProcessData } from './preprocess';

async function trainModel() {
    const processedData = fetchProcessData((await getData()));
    
    const xs = processedData.map(d => [d.latitude, d.longitude, d.bright_ti4, d.bright_ti5, d.frp, d.daynight, d.confidence, d.scan, d.track]); 
    const ys = processedData.map(d => {
        return d.acq_date.getTime();
    });

    const inputTensor = tensor2d(xs, [xs.length, xs[0].length]); 
    const labelTensor = tensor2d(ys, [ys.length, 1]);

    const model = sequential(); 
    model.add(layers.dense({ inputShape: [xs[0].length], units: 50, activation: 'relu' })); 
    model.add(layers.dense({ units: 50, activation: 'relu' })); 
    model.add(layers.dense({ units: 1 }));
    
    model.compile({ optimizer: train.adam(), 
        loss: losses.meanSquaredError, 
        metrics: ['mse']
    });

    await model.fit(inputTensor, labelTensor, { 
        epochs: 50, 
        batchSize: 32, 
        validationSplit: 0.2, 
        shuffle: true, 
        callbacks: node.tensorBoard('/tmp/fit_logs') 
    });

    await model.save('file://models/trained_model'); 
    console.log('Model trained and saved successfully!');
}
trainModel().catch(err => console.error(err));

