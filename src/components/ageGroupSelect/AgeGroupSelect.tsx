import React from 'react'
import './AgeGroupSelect.scss'

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { ageChange } from '../../redux/features/ageGroupPriceSlice.tsx';

interface AgeGroupSelectProps {
  index: number;
  isOverLap: boolean;
}


export const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({ index, isOverLap }) => {

  //調用redux ageGroupPriceSliceReducer內的data
  const reduxData = useAppSelector((state) => state.ageGroupPriceSliceReducer.value)

  //調用redux action
  const dispatch = useAppDispatch()

  // 處理年齡選擇的變更
  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const newAge = Number(e.target.value);

    dispatch(ageChange({ index, type, newAge }));
  };


  //create option 範圍，從start到end
  const generateOptions = (start: number, end: number) => {
    const options: JSX.Element[] = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="ageGroupSelect">
      <p className="ageGroupSelect__title">年齡</p>
      <div className="inputContainer">
        <select
          className={`form-select ${isOverLap && 'inputContainer__select--empty'}`}
          id={`select-start-${index}`}
          value={reduxData[index].ageGroup[0]}
          onChange={(e) => handleAgeChange(e, 'start')}>
          {/* {generateOptions(0, ageGroup[1])} */}
          {generateOptions(0, reduxData[index].ageGroup[1])}
        </select>
        <span className="input-group-text" id="basic-addon1">~</span>
        <select
          className={`form-select ${isOverLap && 'inputContainer__select--empty'}`}
          id={`select-end-${index}`}
          value={reduxData[index].ageGroup[1]}
          onChange={(e) => handleAgeChange(e, 'end')}>
          {/* {generateOptions(ageGroup[0], 20)} */}
          {generateOptions(reduxData[index].ageGroup[0], 20)}
        </select>
      </div>
      {isOverLap && <p className='ageGroupSelect__errorMsg'>年齡區間不可重疊</p>}
    </div>
  )
}
