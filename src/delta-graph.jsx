import _map from 'lodash/map';
import _range from 'lodash/range';

import React from 'react';
import Plot from 'react-plotly.js'

import * as taxes from "./taxes2017";

const defaultConfig = {
  showLink: false,
  displayModeBar: false
};

const xAxis = {
  min: 0,
  max: 60000,
  steps: 250,
};

const xRange = _range(xAxis.min, xAxis.max, xAxis.steps);
const yDeltaRange = f => _map(xRange, x => {
  let sum = 0;

  for(let i = -50; i < 50; i+=10) {
    sum += f(x+i) - f(x+i-100);
  }

  return sum / 10;
});

export default () => <Plot
  layout={{
    xaxis: {tickprefix: "€", hoverformat: '.2f'},
    yaxis: {tickprefix: "€", hoverformat: '.2f'}
  }}
  data={[
    {
      type: 'line',
      name: 'Netto bestedingsvermogen',
      x: xRange,
      y: yDeltaRange(taxes.computeNetto),
    },
    // {
    //   type: 'line',
    //   name: 'Huurtoeslag',
    //   x: xRange,
    //   y: yDeltaRange(hi => taxes.computeHuurtoeslag(hi, 700)),
    // },
    // {
    //   type: 'line',
    //   name: 'Zorgtoeslag',
    //   x: xRange,
    //   y: yDeltaRange(taxes.computeZorgtoeslag),
    // },
    // {
    //   type: 'line',
    //   name: 'Inkomstenbelasting',
    //   x: xRange,
    //   y: yDeltaRange(taxes.computeInkomstenbelasting),
    // },
    // {
    //   type: 'line',
    //   name: 'Arbeidskorting',
    //   x: xRange,
    //   y: yDeltaRange(taxes.computeArbeidskorting),
    // },
    // {
    //   type: 'line',
    //   name: 'Heffingskorting',
    //   x: xRange,
    //   y: yDeltaRange(taxes.computeHeffingskorting),
    // },
  ]}
  config={defaultConfig}
/>;
