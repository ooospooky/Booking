export const addComma = (num: string): string => {
  let res = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return res;
};
