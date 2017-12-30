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
    yaxis: {ticksuffix: "%", hoverformat: '.2f'}
  }}
  data={[
    {
      type: 'line',
      name: 'Procentuele netto reductie',
      x: ranges.xRange,
      y: ranges.yRange(hi => ((hi - taxes.computeNetto(hi)) / hi)*100),
    },
  ]}
  config={defaultConfig}
/>;
