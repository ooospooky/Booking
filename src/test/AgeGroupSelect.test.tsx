import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReduxProvider } from '../redux/features/provider';

import { PriceInput } from '../components/priceinput/PriceInput';
import { AgeGroupSelect } from '../components/ageGroupSelect/AgeGroupSelect';

test('handles input change correctly', () => {

  render(
    <ReduxProvider>
      <AgeGroupSelect index={0} isOverLap={false} />
    </ReduxProvider>
  );

  // 獲取年齡開始與結束的元素
  const startAgeSelect = screen.getByPlaceholderText('ageStart') as HTMLInputElement;;
  const endAgeSelect = screen.getByPlaceholderText('ageEnd') as HTMLInputElement;;

  // 模擬選擇年齡
  fireEvent.change(startAgeSelect, { target: { value: '10' } });
  fireEvent.change(endAgeSelect, { target: { value: '15' } });

  expect(startAgeSelect.value).toBe('10');
  expect(endAgeSelect.value).toBe('15');

});
test('handles overlap', () => {
  render(
    <ReduxProvider>
      <AgeGroupSelect index={0} isOverLap={true} />
    </ReduxProvider>
  );

  // 找到錯誤消息元素
  const errorMsgElement = screen.getByText('年齡區間不可重疊');

  // 判斷是否顯示錯誤消息
  expect(errorMsgElement).toBeInTheDocument();
});

