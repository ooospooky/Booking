export const getNumberIntervals = (intervals) => {
  const map = new Map();
  // 使map變成{0: 0, 1: 0, 2:0 ... 20:0}：
  for (let i = 0; i <= 20; i++) {
    map.set(i, 0);
  }

  //計算每個數字出現的次數
  intervals.forEach((interval) => {
    const [start, end] = interval;
    for (let i = start; i <= end; i++) {
      map.set(i, map.get(i) + 1);
    }
  });

  const result = {
    overlap: [],
    notInclude: [],
  };

  let currentInterval = null;
  let currentType = null; // 'overlap' 或 'notInclude'

  for (let i = 0; i <= 20; i++) {
    const count = map.get(i);
    if (count >= 2) {
      // 當數字為2以上，放到overlap區間
      if (!currentInterval) {
        currentInterval = [i, i];
        currentType = "overlap";
      } else {
        currentInterval[1] = i;
      }
    } else if (count === 1) {
      //當數字為1代表不在overlap' 或 'notInclude'區間
      //若currentInterval為true，將array push到result
      currentInterval && result[currentType].push(currentInterval);

      //將array變回初始狀態
      currentInterval = null;
    } else if (count === 0) {
      // 當數字為０時，放到notinclude區間
      if (!currentInterval) {
        currentInterval = [i, i];
        currentType = "notInclude";
      } else {
        currentInterval[1] = i;
      }
    }
  }

  return result;
};

/*
請根據如下條件實作找出數字 0 到 20 間重疊與未包含的數字區間 function
○ function name: getNumberIntervals
○ function input : [[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]
○ function output: { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }

*/
