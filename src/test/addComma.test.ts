import { addComma } from "../helper/addComma";

//測試整數
test("should add commas to positive integer", () => {
  const input = "1234567";
  const expectedOutput = "1,234,567";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
test("should add commas to negative integer", () => {
  const input = "1234567";
  const expectedOutput = "1,234,567";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
test("should add commas to large positive integer", () => {
  const input = "9999999999";
  const expectedOutput = "9,999,999,999";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
//測試小數點
test("should handle positive integer with decimal points", () => {
  const input = "1234567.89";
  const expectedOutput = "1,234,567.89";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
test("should handle negative integer with decimal points", () => {
  const input = "-1234567.89";
  const expectedOutput = "-1,234,567.89";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
test("should handle large positive integer with decimal points", () => {
  const input = "5644156486666666.166";
  const expectedOutput = "5,644,156,486,666,666.166";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
test("should handle large negative integer with decimal points", () => {
  const input = "-5644156486666666.166";
  const expectedOutput = "-5,644,156,486,666,666.166";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
//測試空字串
test("should handle empty string", () => {
  const input = "";
  const expectedOutput = "";
  const result = addComma(input);
  expect(result).toBe(expectedOutput);
});
