import { getNumberIntervals } from "../helper/getNumberIntervals";

describe("getNumberIntervals", () => {
  test.each([
    // 正常情況：重疊區間和未包含區間都存在
    {
      input: [
        [6, 11],
        [5, 8],
        [17, 20],
        [7, 7],
        [14, 17],
      ],
      expectedOutput: {
        overlap: [
          [6, 8],
          [17, 17],
        ],
        notInclude: [
          [0, 4],
          [12, 13],
        ],
      },
    },
    // 正常情況：重疊區間和未包含區間都存在
    {
      input: [
        [0, 10],
        [10, 15],
      ],
      expectedOutput: {
        overlap: [[10, 10]],
        notInclude: [[16, 20]],
      },
    },
    // 最小輸入值：空數組
    {
      input: [],
      expectedOutput: {
        overlap: [],
        notInclude: [[0, 20]],
      },
    },
    // 最大輸入值：包含所有數字
    {
      input: [[0, 20]],
      expectedOutput: {
        overlap: [],
        notInclude: [],
      },
    },
    // 正常情況：只存在重疊區間
    {
      input: [
        [0, 20],
        [0, 20],
      ],
      expectedOutput: {
        overlap: [[0, 20]],
        notInclude: [],
      },
    },
    // 正常情況：只存在重疊區間
    {
      input: [
        [1, 5],
        [0, 20],
      ],
      expectedOutput: {
        overlap: [[1, 5]],
        notInclude: [],
      },
    },
    // 正常情況：只存在未包含區間
    {
      input: [[0, 10]],
      expectedOutput: {
        overlap: [],
        notInclude: [[11, 20]],
      },
    },
    // 正常情況：只存在未包含區間
    {
      input: [
        [5, 19],
        [1, 2],
      ],
      expectedOutput: {
        overlap: [],
        notInclude: [
          [0, 0],
          [3, 4],
          [20, 20],
        ],
      },
    },
    // 加更多的測試
  ])(
    "should correctly find overlap and notInclude intervals",
    ({ input, expectedOutput }) => {
      const result = getNumberIntervals(input);
      expect(result).toEqual(expectedOutput);
    }
  );
});

// describe("getNumberIntervals", () => {
//   it("should correctly find overlap and notInclude intervals", () => {
//     const input = [
//       [6, 11],
//       [5, 8],
//       [17, 20],
//       [7, 7],
//       [14, 17],
//     ];
//     const expectedOutput = {
//       overlap: [
//         [6, 8],
//         [17, 17],
//       ],
//       notInclude: [
//         [0, 4],
//         [12, 13],
//       ],
//     };

//     const result = getNumberIntervals(input);

//     expect(result).toEqual(expectedOutput);
//   });
// });
