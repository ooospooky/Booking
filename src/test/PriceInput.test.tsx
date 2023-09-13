import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PriceInput } from '../components/priceinput/PriceInput';
import { ReduxProvider } from '../redux/features/provider';

test('handles input change correctly', () => {
  render(
    <ReduxProvider>
      <PriceInput index={0} />
    </ReduxProvider>
  );

  // 找到 input 元素
  const inputElement = screen.getByPlaceholderText('請輸入費用') as HTMLInputElement;

  // 模擬輸入事件
  fireEvent.change(inputElement, { target: { value: '12345' } });

  // 是否正確處理了輸入事件
  expect(inputElement.value).toBe('12,345');
});
test('handles input is empty', () => {
  render(
    <ReduxProvider>
      <PriceInput index={0} />
    </ReduxProvider>
  );

  // 找到 input 元素
  const inputElement = screen.getByPlaceholderText('請輸入費用') as HTMLInputElement;

  // 模擬空字串輸入事件
  fireEvent.change(inputElement, { target: { value: '' } });

  // 找到錯誤消息元素
  const errorMsgElement = screen.getByText('不可以為空白');

  // 判斷是否顯示錯誤消息
  expect(errorMsgElement).toBeInTheDocument();

  // 是否正確處理了輸入事件
  expect(inputElement.value).toBe('');
});

