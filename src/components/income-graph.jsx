import React from 'react';
import C3Chart from 'react-c3js';
import {format as d3format} from 'd3-format';

import 'c3/c3.css';

import * as taxes from "../taxes2017";
import * as ranges from "../ranges";

export default () => <C3Chart
data={{
  x: 'Bruto inkomen',
  columns: [
    ['Bruto inkomen'].concat(ranges.xRange),
    ['Netto bestedingsvermogen'].concat(ranges.yRange(taxes.computeNetto)),
    ['Huurtoeslag'].concat(ranges.yRange(hi => taxes.computeHuurtoeslag(hi, 700))),
    ['Zorgtoeslag'].concat(ranges.yRange(taxes.computeZorgtoeslag)),
    ['Inkomstenbelasting'].concat(ranges.yRange(taxes.computeInkomstenbelasting)),
    ['Arbeidskorting'].concat(ranges.yRange(taxes.computeArbeidskorting)),
    ['Heffingskorting'].concat(ranges.yRange(taxes.computeHeffingskorting)),
  ],
}}
axis={{
  x: {
    tick: {
      format: x => '€'+d3format('.0f')(x)
    }
  },
  y: {
    tick: {
      format: y => '€'+d3format('.2f')(y)
    }
  }
}}
point={{show: false}}
/>;
