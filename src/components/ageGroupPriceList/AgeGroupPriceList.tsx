import React, { useState, useEffect } from 'react'
import './AgeGroupPriceList.scss'
import { AgeGroupSelect } from '../ageGroupSelect/AgeGroupSelect.tsx'
import { PriceInput } from '../priceinput/PriceInput.tsx'
import { getNumberIntervals } from '../../helper/getNumberIntervals.ts';

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { addCard, removeCard } from '../../redux/features/ageGroupPriceSlice.tsx';


export interface AgeGroupData {
  ageGroup: [number, number];
  price: string;
}

interface AgeGroupPriceListProps {
  onChange: (data: AgeGroupData[]) => void;
}

export const AgeGroupPriceList: React.FC<AgeGroupPriceListProps> = ({ onChange }) => {

  const [isOverLap, setIsOverLap] = useState(false);
  const [notInclude, setNotInclude] = useState(false);

  //調用redux ageGroupPriceSliceReducer內的data
  const reduxData = useAppSelector((state) => state.ageGroupPriceSliceReducer.value)

  //調用redux action
  const dispatch = useAppDispatch()

  //when data change check if allAgeGroup overlap
  // 如果重疊的陣列長度大於0，表示有重疊，將isOverLap設為true，否則設為false
  useEffect(() => {
    onChange(reduxData)
    const allAgeGroups = reduxData.map(item => item.ageGroup);
    const result = getNumberIntervals(allAgeGroups);

    setIsOverLap(result.overlap.length > 0);
    setNotInclude(result.notInclude.length === 0)
  }, [reduxData, onChange])

  //處理新增價格設定
  const handleAddCard = () => {
    dispatch(addCard())
  }

  //移除指定index的卡片
  const handleCardRemove = (index: number) => {
    dispatch(removeCard(index))
  }

  return (
    <div className="ageGroupPriceList">
      {reduxData.map((item, index) => {
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
                index={index}
                isOverLap={isOverLap} />
              <PriceInput
                index={index} />
            </div>
            {index !== reduxData.length - 1 && <hr />}
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
