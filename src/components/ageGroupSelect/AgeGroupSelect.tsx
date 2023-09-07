import React from 'react'
import './AgeGroupSelect.scss'
import { AgeGroupData } from '../ageGroupPriceList/AgeGroupPriceList';
interface AgeGroupSelectProps {
  setData: React.Dispatch<React.SetStateAction<AgeGroupData[]>>;
  data: AgeGroupData[];
  index: number;
  isOverLap: boolean;
}


export const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({ setData, data, index, isOverLap }) => {

  // 處理年齡選擇的變更
  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const newAge = Number(e.target.value);

    setData((prev) => {
      const newData = [...prev]; // 建立prev副本
      // 在 newData 上修改
      newData[index].ageGroup[type === 'start' ? 0 : 1] = newAge;
      return newData; // 返回修改後的data
    })
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
          value={data[index].ageGroup[0]}
          onChange={(e) => handleAgeChange(e, 'start')}>
          {/* {generateOptions(0, ageGroup[1])} */}
          {generateOptions(0, data[index].ageGroup[1])}
        </select>
        <span className="input-group-text" id="basic-addon1">~</span>
        <select
          className={`form-select ${isOverLap && 'inputContainer__select--empty'}`}
          id={`select-end-${index}`}
          value={data[index].ageGroup[1]}
          onChange={(e) => handleAgeChange(e, 'end')}>
          {/* {generateOptions(ageGroup[0], 20)} */}
          {generateOptions(data[index].ageGroup[0], 20)}
        </select>
      </div>
      {isOverLap && <p className='ageGroupSelect__errorMsg'>年齡區間不可重疊</p>}
    </div>
  )
}
