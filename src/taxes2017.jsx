// Alles voor 2017

export const computeHuurtoeslag = (hi, rekenhuur) => {
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

export const computeZorgtoeslag = (hi) => {
  if (hi > 27857) {
    return 0;
  }

  // http://wetten.overheid.nl/BWBR0018451/2017-07-01

  const drempelinkomen = 1.08 * 1264.80 * 12;
  const standaardpremie = 1530; // https://download.belastingdienst.nl/toeslagen/docs/berekening_zorgtoeslag_2017_tg0821z71fd.pdf
  const normpremie = Math.max(0.02305 * drempelinkomen + 0.1346 * (hi - drempelinkomen), 0);

  return Math.max(standaardpremie - normpremie, 0);
};

export const computeInkomstenbelasting = (hi) => {
  const eersteSchijf = 19982;
  const tweedeSchijf = 33791;
  const derdeSchijf = 67072;

  // https://www.nibud.nl/consumenten/inkomstenbelasting/

  let inkomstenbelasting = 0;

  inkomstenbelasting += 0.3655 * Math.min(hi, eersteSchijf);
  inkomstenbelasting += 0.4080 * Math.max(Math.min(hi, tweedeSchijf) - eersteSchijf, 0);
  inkomstenbelasting += 0.4080 * Math.max(Math.min(hi, derdeSchijf) - tweedeSchijf, 0);
  inkomstenbelasting += 0.5200 * Math.max(hi - derdeSchijf, 0);

  return inkomstenbelasting;
};

export const computeHeffingskorting = (hi) => {
  // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-ahk-2017

  if (hi < 19982) {
    return 2254;
  }

  if (hi > 67068) {
    return 0;
  }

  return Math.max(2254 - 0.04787 * (hi - 19982), 0);
};

export const computeArbeidskorting = (hi) => {
  // https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel_arbeidskorting_2017

  if (hi < 9309) {
    return hi * 0.01772;
  }

  if (hi < 20108) {
    return 165 + 0.28317 * (hi - 9309);
  }

  if (hi < 32444) {
    return 3223;
  }

  if (hi < 121972) {
    return 3223 - 0.036 * (hi - 32444);
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
