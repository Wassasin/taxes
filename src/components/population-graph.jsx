import React from 'react';
import C3Chart from 'react-c3js';
import {format as d3format} from 'd3-format';

import 'c3/c3.css';

import * as incomes from "../incomes2014";

const cummulative = xs => {
  let sum = 0;
  return xs.map(x => {
    sum += x;
    return sum;
  });
};

export default () => <C3Chart
  data={{
    x: 'Gemiddelde inkomen per groep',
    columns: [
      ['Gemiddelde inkomen per groep'].concat(incomes.averageIncomes),
      ['Cummulatief aantal mensen'].concat(cummulative(incomes.numberOfPeople)),
    ],
    type: 'area'
  }}
  axis={{
    x: {
      tick: {
        format: x => '€'+d3format('.0f')(x)
      }
    },
    y: {
      tick: {
        format: y => d3format('.0f')(y)
      }
    }
  }}
  point={{show: false}}
  zoom={{enabled : true}}
/>;
