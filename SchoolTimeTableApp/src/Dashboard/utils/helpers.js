export const getOrdinalSuffix = (num) => {
  if (num === 1) return "st";
  if (num === 2) return "nd";
  if (num === 3) return "rd";
  return "th";
};
