import React, { useState } from 'react'
import './AgeGroupSelect.scss'
import { AgeGroupData } from '../ageGroupPriceList/AgeGroupPriceList';
interface AgeGroupSelectProps {
  setData: React.Dispatch<React.SetStateAction<AgeGroupData[]>>;
  data: AgeGroupData[];
  index: number;
}


export const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({ setData, data, index }) => {

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const newAge = Number(e.target.value);
    // setEndAge(newEndAge);
    // if (newEndAge < startAge) {
    //   setStartAge(newEndAge);
    // }
    // setAgeGroup([ageGroup[0], newEndAge]);
    setData((prev) => {
      const newData = [...prev]; // 建立prev副本
      // 在 newData 上修改
      console.log('d', newData);
      newData[index].ageGroup[type === 'start' ? 0 : 1] = newAge;
      // newData[index].ageGroup[1] = newEndAge;
      console.log('after', newData);
      return newData; // 返回修改後的data
    })
  };


  //create option 0 to 20 
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
          className="form-select"
          id="inputGroupSelect01"
          value={data[index].ageGroup[0]}
          onChange={(e) => handleAgeChange(e, 'start')}>
          {/* {generateOptions(0, ageGroup[1])} */}
          {generateOptions(0, data[index].ageGroup[1])}
        </select>
        <span className="input-group-text" id="basic-addon1">~</span>
        <select
          className="form-select"
          id="inputGroupSelect01"
          // value={ageGroup[1]}
          value={data[index].ageGroup[1]}
          // onChange={handleEndAgeChange}
          onChange={(e) => handleAgeChange(e, 'end')}>
          {/* {generateOptions(ageGroup[0], 20)} */}
          {generateOptions(data[index].ageGroup[0], 20)}
        </select>
      </div>
    </div>
  )
}
