export const getDayName = ({ dateVal }) => {
  let date = new Date(dateVal);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
