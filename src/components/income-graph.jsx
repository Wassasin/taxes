import React from 'react';
import Plot from 'react-plotly.js'

import * as taxes from '../taxes2017';
import * as ranges from "../ranges";

const defaultConfig = {
  showLink: false,
  displayModeBar: false
};

export default () => <Plot
  layout={{
    xaxis: {tickprefix: "€", hoverformat: '.2f'},
    yaxis: {tickprefix: "€", hoverformat: '.2f'}
  }}
  data={[
    {
      type: 'line',
      name: 'Netto bestedingsvermogen',
      x: ranges.xRange,
      y: ranges.yRange(taxes.computeNetto),
    },
    {
      type: 'line',
      name: 'Huurtoeslag',
      x: ranges.xRange,
      y: ranges.yRange(hi => taxes.computeHuurtoeslag(hi, 700)),
    },
    {
      type: 'line',
      name: 'Zorgtoeslag',
      x: ranges.xRange,
      y: ranges.yRange(taxes.computeZorgtoeslag),
    },
    {
      type: 'line',
      name: 'Inkomstenbelasting',
      x: ranges.xRange,
      y: ranges.yRange(taxes.computeInkomstenbelasting),
    },
    {
      type: 'line',
      name: 'Arbeidskorting',
      x: ranges.xRange,
      y: ranges.yRange(taxes.computeArbeidskorting),
    },
    {
      type: 'line',
      name: 'Heffingskorting',
      x: ranges.xRange,
      y: ranges.yRange(taxes.computeHeffingskorting),
    },
  ]}
  config={defaultConfig}
/>;
