// Source: https://opendata.cbs.nl/statline/portal.html?_la=nl&_catalog=CBS&tableId=71510ned&_theme=235
// Missing people: 3944600 (children, students etc.)
// Total people: 12925400

// [persons * 1000, sum of bruto income * 1000000]
const data = [
  [51.6196979999, -506.60938715],
  [1.062878, 0],
  [537.525159, 494.431189013],
  [404.600383, 1206.6713379],
  [351.174804, 1745.43150443],
  [318.933717, 2230.46708172],
  [764.895422, 7204.36917769],
  [481.675236999, 5253.43069102],
  [450.092135999, 5861.48970357],
  [776.743078, 11705.9955271],
  [547.740366999, 9310.87104211],
  [539.67657, 10262.8172509],
  [453.277563999, 9514.67029651],
  [419.729897999, 9649.03150902],
  [400.772213999, 10020.0322717],
  [377.211383, 10184.4600186],
  [362.700776, 10510.4177761],
  [827.554735999, 26821.9339168],
  [729.635435999, 27338.3986879],
  [683.690714, 29014.2480116],
  [597.935332, 28364.7056017],
  [1738.24824799, 105023.803007],
  [635.980394999, 54238.8524405],
  [472.923926999, 72545.481365]
];

const normalizedData = data.map(row => {
  const [people, incomeSum] = row;
  return {people: people * 1000, incomeSum: incomeSum * 1000000};
});

export const averageIncomes = normalizedData.map(({people, incomeSum}) => incomeSum / people);

export const numberOfPeople = normalizedData.map(({people, incomeSum}) => people);
