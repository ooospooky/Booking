import React, { useState } from 'react'
import './priceinput.scss';
import { addComma } from '../../helper/addComma.ts';

import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { priceChange } from '../../redux/features/ageGroupPriceSlice.tsx';

interface PriceInputProps {
  index: number;
}

export const PriceInput: React.FC<PriceInputProps> = ({ index }) => {
  //用於檢查price是否為空
  const [isEmpty, setIsEmpty] = useState(false);

  //調用redux ageGroupPriceSliceReducer內的data
  const reduxData = useAppSelector((state) => state.ageGroupPriceSliceReducer.value)

  //調用redux action
  const dispatch = useAppDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //移除千分位逗號
    const value = e.target.value.replace(/,/g, '');

    // 限制小數點後只能輸入三位
    const newValue = value.replace(/(\.\d{3}).+/, '$1');

    //輸入非數字、小數點、逗號的值不更新price
    const pattern = /[^0-9,.]/g;  //pattern為０～９的數字、小數點及逗號
    if (!pattern.test(newValue)) {
      dispatch(priceChange({ index, newValue }));
      setIsEmpty(false);
    }

    if (value === "") {
      dispatch(priceChange({ index, newValue: "" }));
      setIsEmpty(true);
    }
  }

  return (
    <div className='priceInput'>
      <p className="priceInput__title">入住費用(每人每晚)</p>
      <div className='inputContainer'>
        <span className="input-group-text inputContainer__label" id="basic-addon1">TWD</span>
        <input
          className={`form-control inputContainer__input ${isEmpty ? 'inputContainer__input-empty' : ''}`}
          aria-label="Username" aria-describedby="basic-addon1"
          value={addComma(reduxData[index].price)}
          onChange={handleInputChange}
          placeholder='請輸入費用'
        />
      </div>
      {isEmpty && <p className='priceInput__errorMsg'>不可以為空白</p>}
      <p className='priceInput__gratText'>輸入0表示免費</p>
    </div>
  )
}
