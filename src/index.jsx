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

// Alles voor 2017

const applyHuurtoeslag = (hv, huur) => {
  // 23 jaar oud
  // onder 710 euro huur

  if (hv > 22200 || huur > 710.68 || huur < 223.42) {
    return 0;
  }

  return Math.max(hv * -0.0135, -592.22) * 12;
};

const data = _map(_range(xAxis.min, xAxis.max, xAxis.steps), hi => {
  let ni = hi;

  ni = ni - applyHuurtoeslag(hi, 700);

  return {
    x: hi,
    y: ni
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
