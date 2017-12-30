import React from 'react';
import Plot from 'react-plotly.js'

import * as taxes from "../taxes2017";
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
      y: ranges.yDeltaRange(taxes.computeNetto),
    },
  ]}
  config={defaultConfig}
/>;
