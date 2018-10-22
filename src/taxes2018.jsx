// Alles voor 2018

const minimumloon = 1264.80

export const computeHuurtoeslag = (hi, rekenhuur) => {
  // 23 jaar oud
  // onder 710.68 euro huur

  if (hi > 22400 || rekenhuur > 710.68 || rekenhuur < 225) {
    return 0;
  }

  // http://wetten.overheid.nl/jci1.3:c:BWBR0008659&amp;hoofdstuk=3&amp;paragraaf=1&amp;artikel=19&amp;z=2017-03-27&amp;g=2017-03-27
  // https://zoek.officielebekendmakingen.nl/stcrt-2017-69899.html

  const a = 0.000000684366;
  const b = 0.002171483654;

  const normhuur = (a * Math.pow(hi, 2)) + (b * hi);
  const kwaliteitskortingsgrens = 417.34;
  const aftoppingsgrens = 597.30;

  let subsidie = 0;

  if (rekenhuur < normhuur) {
    return 0;
  }

  subsidie += Math.max(Math.min(rekenhuur, kwaliteitskortingsgrens) - normhuur, 0);
  subsidie += 0.65 * Math.max(Math.min(rekenhuur, aftoppingsgrens) - kwaliteitskortingsgrens, 0);
  subsidie += 0.40 * Math.max(rekenhuur - aftoppingsgrens, 0);

  const jaarsubsidie = subsidie * 12;
  if (jaarsubsidie < 24) {
    return 0;
  }
  return jaarsubsidie;
};

export const computeZorgtoeslag = (hi) => {
  if (hi > 27857) {
    return 0;
  }

  // http://wetten.overheid.nl/jci1.3:c:BWBR0018451&z=2018-01-01&g=2018-01-01
  // https://download.belastingdienst.nl/toeslagen/docs/berekening_zorgtoeslag_2018_tg0821z81fd.pdf

  const drempelinkomen = 20451;
  const standaardpremie = 1546;
  const normpremie = Math.max(0.01995 * drempelinkomen + 0.1349 * (hi - drempelinkomen), 0);

  return Math.max(standaardpremie - normpremie, 0);
};

export const computeInkomstenbelasting = (hi) => {
  const eersteSchijf = 20142;
  const tweedeSchijf = 33994;
  const derdeSchijf = 68507;

  // https://www.nibud.nl/consumenten/inkomstenbelasting/

  let inkomstenbelasting = 0;

  inkomstenbelasting += 0.3655 * Math.min(hi, eersteSchijf);
  inkomstenbelasting += 0.4085 * Math.max(Math.min(hi, tweedeSchijf) - eersteSchijf, 0);
  inkomstenbelasting += 0.4085 * Math.max(Math.min(hi, derdeSchijf) - tweedeSchijf, 0);
  inkomstenbelasting += 0.5195 * Math.max(hi - derdeSchijf, 0);

  return inkomstenbelasting;
};

export const computeHeffingskorting = (hi) => {
  // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/

  if (hi < 20142) {
    return 2265;
  }

  if (hi > 68507) {
    return 0;
  }

  return Math.max(2265 - 0.04683 * (hi - 20142), 0);
};

export const computeArbeidskorting = (hi) => {
  // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/

  if (hi < 9468) {
    return hi * 0.01764;
  }

  if (hi < 20450) {
    return 167 + 0.28064 * (hi - 9468);
  }

  if (hi < 33112) {
    return 3249;
  }

  if (hi < 123362) {
    return 3249 - 0.036 * (hi - 33112);
  }

  return 0;
};

export const computeNetto = hi => {
  let ni = hi;

  ni += computeHuurtoeslag(hi, 700);
  ni += computeZorgtoeslag(hi);
  ni += computeHeffingskorting(hi);
  ni += computeArbeidskorting(hi);
  ni -= computeInkomstenbelasting(hi);

  return ni;
};
