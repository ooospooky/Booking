import React, { useState, useEffect } from 'react'
import './AgeGroupPriceList.scss'
import { AgeGroupSelect } from '../ageGroupSelect/AgeGroupSelect.tsx'
import { PriceInput } from '../priceinput/PriceInput.tsx'
import { getNumberIntervals } from '../../helper/getNumberIntervals.ts';

export interface AgeGroupData {
  ageGroup: [number, number];
  price: string;
}

interface AgeGroupPriceListProps {
  onChange: (data: AgeGroupData[]) => void;
}

export const AgeGroupPriceList: React.FC<AgeGroupPriceListProps> = ({ onChange }) => {
  const [data, setData] = useState<AgeGroupData[]>([{ ageGroup: [0, 20], price: '0' }])

  const [isOverLap, setIsOverLap] = useState(false);
  const [notInclude, setNotInclude] = useState(false);

  //when data change check if allAgeGroup overlap
  // 如果重疊的陣列長度大於0，表示有重疊，將isOverLap設為true，否則設為false
  useEffect(() => {
    onChange(data)
    const allAgeGroups = data.map(item => item.ageGroup);
    const result = getNumberIntervals(allAgeGroups);

    setIsOverLap(result.overlap.length > 0);
    setNotInclude(result.notInclude.length < 0)
  }, [data, onChange])

  //處理新增價格設定
  const handleAddCard = () => {
    setData((prevData) => [
      ...prevData,
      { ageGroup: [0, 20], price: '0' },
    ]);
  }

  //移除指定index的卡片
  const handleCardRemove = (index: number) => {
    setData((prev) => {
      const newData = [...prev];
      newData.splice(index, 1)
      return newData
    })
  }

  return (
    <div className="ageGroupPriceList">
      {data.map((item, index) => {
        return (
          <div key={index} className="ageGroupPriceList__container">
            <div className="ageGroupPriceList__titleDiv">
              <h1 className="ageGroupPriceList__titleDiv--title">
                價格設定 - {index + 1}
              </h1>
              {index !== 0 &&
                <button
                  onClick={() => handleCardRemove(index)}
                  className="ageGroupPriceList__titleDiv--remove">
                  X 移除
                </button>
              }
            </div>
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
            {index !== data.length - 1 && <hr />}
          </div>
        )
      })}
      <button
        disabled={notInclude}
        className={`ageGroupPriceList__addCard ${notInclude && 'ageGroupPriceList__addCard--disable'}`}
        onClick={handleAddCard}>
        + 新增價格設定
      </button>
    </div>

  )
}
