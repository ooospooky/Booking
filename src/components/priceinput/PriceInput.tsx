import React, { useState } from 'react'
import './priceinput.scss';
import { addComma } from '../../helper/addComma.ts';
import { AgeGroupData } from '../ageGroupPriceList/AgeGroupPriceList.tsx';

interface PriceInputProps {
  setData: React.Dispatch<React.SetStateAction<AgeGroupData[]>>;
  data: AgeGroupData[];
  index: number;
}

export const PriceInput: React.FC<PriceInputProps> = ({ setData, data, index }) => {
  const [price, setPrice] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //移除千分位逗號
    const value = e.target.value.replace(/,/g, '');


    // 限制小數點後只能輸入三位
    const newValue = value.replace(/(\.\d{3}).+/, '$1');

    //輸入非數字、小數點、逗號的值不更新price
    const pattern = /[^0-9,.]/g;
    if (!pattern.test(newValue)) {
      // setPrice(newValue);
      setData((prev) => {
        const newData = [...prev]; // 建立prev副本
        // 在 newData 上修改
        newData[index].price = newValue;
        // newData[index].ageGroup[1] = newEndAge;
        return newData; // 返回修改後的data
      })

      setIsEmpty(false);
    }

    if (value === "") {
      setData((prev) => {
        const newData = [...prev]; // 建立prev副本
        // 在 newData 上修改
        newData[index].price = '';
        // newData[index].ageGroup[1] = newEndAge;
        return newData; // 返回修改後的data
      })
      setIsEmpty(true);
      console.log('empty')
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
          value={addComma(data[index].price)}
          onChange={handleInputChange}
          placeholder='請輸入費用'
        />
      </div>
      {isEmpty ?
        <p className='priceInput__errorMsg'>不可以為空白</p> : null}
      <p className='priceInput__gratText'>輸入0表示免費</p>
    </div>
  )
}
