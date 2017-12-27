import _map from 'lodash/map';
import _range from 'lodash/range';

import React from 'react';
import Plot from 'react-plotly.js'

import * as taxes from './taxes2017';

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
const yRange = f => _map(xRange, f);

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
      y: yRange(taxes.computeNetto),
    },
    {
      type: 'line',
      name: 'Huurtoeslag',
      x: xRange,
      y: yRange(hi => taxes.computeHuurtoeslag(hi, 700)),
    },
    {
      type: 'line',
      name: 'Zorgtoeslag',
      x: xRange,
      y: yRange(taxes.computeZorgtoeslag),
    },
    {
      type: 'line',
      name: 'Inkomstenbelasting',
      x: xRange,
      y: yRange(taxes.computeInkomstenbelasting),
    },
    {
      type: 'line',
      name: 'Arbeidskorting',
      x: xRange,
      y: yRange(taxes.computeArbeidskorting),
    },
    {
      type: 'line',
      name: 'Heffingskorting',
      x: xRange,
      y: yRange(taxes.computeHeffingskorting),
    },
  ]}
  config={defaultConfig}
/>;
