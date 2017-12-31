import _map from 'lodash/map';
import _range from 'lodash/range';

export const xAxis = {
  min: 12000,
  max: 40000,
  steps: 100,
};

export const xRange = _range(xAxis.min, xAxis.max, xAxis.steps);

export const yRange = f => _map(xRange, f);

export const yDeltaRange = f => _map(xRange, x => {
  const steps = xAxis.steps;
  let sum = 0;

  for(let i = (-steps)/2; i < steps/2; i+=1) {
    sum += f(x+i) - f(x+i-1);
  }

  return (sum / steps);
});