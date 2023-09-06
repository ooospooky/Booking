import React, { useState } from 'react'
import './priceinput.scss';
// import { addComma } from '../../helper/addComma.ts
import { addComma } from '../../helper/addComma.ts'; // 添加 .ts 扩展名'

export const PriceInput = () => {
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
      setPrice(newValue);
      setIsEmpty(false);
    }

    if (value === "") {
      setPrice('');
      setIsEmpty(true);
      console.log('empty')
    }
  }


  return (
    <div className='priceInput'>
      <p className="priceInput__title">入住費用(每人每晚)</p>
      <div className='inputContainer'>
        <label className='inputContainer__label'>TWD</label>
        <input
          className={`inputContainer__input ${isEmpty ? 'inputContainer__input-empty' : ''}`}
          value={addComma(price)}
          onChange={handleInputChange}
          placeholder='請輸入費用'
        />
      </div>
      {isEmpty ?
        <p className='priceInput__errorMsg'>不可為空白</p> : null}
      <p className='priceInput__gratText'>輸入0表示免費</p>
    </div>
  )
}
