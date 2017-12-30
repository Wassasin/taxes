import _map from 'lodash/map';
import _range from 'lodash/range';

export const xAxis = {
  min: 12000,
  max: 100000,
  steps: 250,
};

export const xRange = _range(xAxis.min, xAxis.max, xAxis.steps);

export const yRange = f => _map(xRange, f);

export const yDeltaRange = f => _map(xRange, x => {
  let sum = 0;

  for(let i = -50; i < 50; i+=10) {
    sum += f(x+i) - f(x+i-100);
  }

  return sum / 10;
});