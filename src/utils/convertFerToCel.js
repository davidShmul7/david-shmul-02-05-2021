export const convertFerToCel = ({ tempVal }) => {
  const celcius = ((tempVal - 32) * 5) / 9;
  return Math.round(celcius);
};
