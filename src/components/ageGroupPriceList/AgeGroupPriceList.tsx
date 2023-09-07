import React, { useState, useEffect } from 'react'
import './AgeGroupPriceList.scss'
import { AgeGroupSelect } from '../ageGroupSelect/AgeGroupSelect.tsx'
import { PriceInput } from '../priceinput/PriceInput.tsx'
import { getNumberIntervals } from '../../helper/getNumberIntervals.ts';

export interface AgeGroupData {
  ageGroup: [number, number];
  price: string;
}

export const AgeGroupPriceList = () => {
  const [data, setData] = useState<AgeGroupData[]>([{ ageGroup: [0, 20], price: '0' }, { ageGroup: [0, 20], price: '0' }, { ageGroup: [0, 20], price: '0' }])

  const [isOverLap, setIsOverLap] = useState(false);

  //when data change check if allAgeGroup overlap
  //if overlap's array > 0 mean is overlap, set overlap to ture, else false
  useEffect(() => {
    const allAgeGroups = data.map(item => item.ageGroup);
    const result = getNumberIntervals(allAgeGroups);
    result.overlap.length > 0 ? setIsOverLap(true) : setIsOverLap(false);
  }, [data])

  return (
    <div className="ageGroupPriceList">
      {data.map((item, index) => {
        return (
          <div key={index} className="ageGroupPriceList__container">
            <h1 className="ageGroupPriceList__container--title">價格設定 - {index + 1}</h1>
            <div className="ageGroupPriceList__card">
              <AgeGroupSelect
                setData={setData}
                data={data}
                index={index}
                isOverLap={isOverLap} />
              <PriceInput
                setData={setData}
                data={data}
                index={index} />
            </div>
          </div>
        )
      })}
      AgeGroupPriceList

    </div>

  )
}
