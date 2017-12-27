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
  steps: 200,
};

// Alles voor 2017

const computeHuurtoeslag = (hi, rekenhuur) => {
  // 23 jaar oud
  // onder 710 euro huur

  if (hi > 22200 || rekenhuur > 710.68 || rekenhuur < 223.42) {
    return 0;
  }

  // http://wetten.overheid.nl/jci1.3:c:BWBR0008659&amp;hoofdstuk=3&amp;paragraaf=1&amp;artikel=19&amp;z=2017-03-27&amp;g=2017-03-27
  // https://zoek.officielebekendmakingen.nl/stcrt-2016-67448.html

  const a = 0.000000702729;
  const b = 0.002157297539;

  const normhuur = (a * Math.pow(hi, 2)) + (b * hi);
  const kwaliteitskortingsgrens = 414.02;
  const aftoppingsgrens = 592.55;

  let subsidie = 0;

  if (rekenhuur < normhuur) {
    return 0;
  }

  subsidie += Math.max(Math.min(rekenhuur, kwaliteitskortingsgrens) - normhuur, 0);
  subsidie += 0.65 * Math.max(Math.min(rekenhuur, aftoppingsgrens) - kwaliteitskortingsgrens, 0);
  subsidie += 0.40 * Math.max(rekenhuur - aftoppingsgrens, 0);

  return subsidie * 12;
};

const computeZorgtoeslag = (hi) => {
  if (hi > 27857) {
    return 0;
  }

  // http://wetten.overheid.nl/BWBR0018451/2017-07-01

  const drempelinkomen = 1.08 * 1264.80 * 12;
  const standaardpremie = 1530; // https://download.belastingdienst.nl/toeslagen/docs/berekening_zorgtoeslag_2017_tg0821z71fd.pdf
  const normpremie = Math.max(0.02305 * drempelinkomen + 0.1346 * (hi - drempelinkomen), 0);

  return Math.max(standaardpremie - normpremie, 0);
};

const generateSeries = f => _map(_range(xAxis.min, xAxis.max, xAxis.steps), x => {
  return {
    x: x,
    y: f(x),
  };
});

const nettoData = generateSeries(hi => {
  let ni = hi;

  ni += computeHuurtoeslag(hi, 700);
  ni += computeZorgtoeslag(hi);

  return ni;
});

const invisible = 'rgba(0, 0, 0, 0)';

const ctx = canvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
        fill: false,
        label: 'Netto bestedingsvermogen',
        data: nettoData,
      },
      {
        borderColor: '#00FF00',
        backgroundColor: '#00FF00',
        fill: false,
        label: 'Huurtoeslag',
        data: generateSeries(hi => computeHuurtoeslag(hi, 700)),
      },
      {
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
        fill: false,
        label: 'Zorgtoeslag',
        data: generateSeries(hi => computeZorgtoeslag(hi)),
      },
      {
        borderColor: '#555555',
        backgroundColor: '#555555',
        fill: false,
        label: 'Heffingsloon',
        data: generateSeries(hi => hi),
      },
    ]
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
