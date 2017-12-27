import './index.scss';
import Chart from 'chart.js';

import _map from 'lodash/map';
import _range from 'lodash/range';

const root = document.getElementById("root");
const canvas = document.createElement("canvas");
root.appendChild(canvas);

const xAxis = {
  min: 10000,
  max: 50000,
  steps: 500,
};

const data = _map(_range(xAxis.min, xAxis.max, xAxis.steps), hv => {
  return {
    x: hv,
    y: hv
  };
});

const ctx = canvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [ {
      label: 'Netto bestedingsvermogen',
      data: data,
    } ]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      xAxes: [ {
        type: 'linear',
        ticks: {
          min: xAxis.min,
          max: xAxis.max,
        }
      } ]
    }
  }
});
