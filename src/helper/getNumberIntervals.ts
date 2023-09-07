export const getNumberIntervals = (intervals: number[][]) => {
  const map = new Map();
  // 使map變成{0: 0, 1: 0, 2:0 ... 20:0}：
  for (let i = 0; i <= 20; i++) {
    map.set(i, 0);
  }

  //計算每個數字出現的次數
  for (const [start, end] of intervals) {
    for (let i = start; i <= end; i++) {
      map.set(i, map.get(i) + 1);
    }
  }

  //init result
  const result: { overlap: number[][]; notInclude: number[][] } = {
    overlap: [],
    notInclude: [],
  };

  let currentInterval: null | [number, number] = null; //區間紀錄
  let currentType: null | "overlap" | "notInclude" = null; //區間類型 'overlap' or 'notInclude' or null

  for (let i = 0; i <= 20; i++) {
    const count = map.get(i); //獲取當前數字出現的次數

    // 當數字大於等於2，放到overlap區間
    if (count >= 2) {
      //如果currentInterval有值且當前區間非overlap，進行處理
      if (currentInterval && currentType !== "overlap") {
        //如果當前區間是'notInclude'，將區間紀錄 push 到 result
        if (currentType === "notInclude") {
          result[currentType].push(currentInterval);
        }
        currentInterval = null; //初始話區間紀錄
      }
      //若無當前區間紀錄，建立並包含當前數字
      if (!currentInterval) {
        currentInterval = [i, i];
        currentType = "overlap";
      } else {
        //已有當前區間紀錄，擴展結束數字
        currentInterval[1] = i;
      }
    } else if (count === 1) {
      //當數字為1代表不在overlap' 或 'notInclude'區間
      //若currentInterval為true，將array push到result
      if (currentInterval && currentType)
        result[currentType].push(currentInterval);

      //將區間紀錄變回初始狀態
      currentInterval = null;
    } else if (count === 0) {
      // 當數字為０時，放到notinclude區間

      //如果currentInterval有值且當前區間非notInclude，進行處理
      if (currentInterval && currentType !== "notInclude") {
        //如果當前區間是'overlap'，將區間紀錄 push 到 result
        if (currentType === "overlap") {
          result[currentType].push(currentInterval);
        }
        currentInterval = null; //初始話區間紀錄
      }

      //若無當前區間紀錄，建立並包含當前數字
      if (!currentInterval) {
        currentInterval = [i, i];
        currentType = "notInclude";
      } else {
        //已有當前區間紀錄，擴展結束數字
        currentInterval[1] = i;
      }
    }
  }
  //處理最後一個區間
  if (currentInterval && currentType) result[currentType].push(currentInterval);

  return result;
};

/*
  請根據如下條件實作找出數字 0 到 20 間重疊與未包含的數字區間 function
  ○ function name: getNumberIntervals
  ○ function input : [[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]
  ○ function output: { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }

  */
