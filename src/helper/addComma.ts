export const addComma = (num: number): string => {
  let res = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return res;
};
