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
      ['Netto reductie'].concat(ranges.yRange(hi => ((hi - taxes.computeNetto(hi)) / hi)*100)),
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
        format: y => d3format('.2f')(y)+'%'
      }
    }
  }}
  point={{show: false}}
/>;
