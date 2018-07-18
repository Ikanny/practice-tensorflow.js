import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

console.log(data);

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

function predict(x) {
  return tf.tidy(() =>
    a.mul(x.pow(tf.scalar(3)))
      .add(b.mul(x.square()))
      .add(c.mul(x))
      .add(d)
  );
}

function loss(predictions, labels) {
  return predictions.sub(labels).square().mean();
}

function train(xs, ys, numOfIterations = 75) {
    const learningRate = 0.5;
    const optimizer = tf.train.sgd(learningRate);

    for (let i = 0; i < numOfIterations; i++) {
      optimizer.minimize(() => {
        const predsYs = predict(xs);
        return loss(redsYs, ys);
      });
    }
}
