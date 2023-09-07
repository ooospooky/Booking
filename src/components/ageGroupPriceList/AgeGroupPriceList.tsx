import React, { useState } from 'react'
import { AgeGroupSelect } from '../ageGroupSelect/AgeGroupSelect.tsx'
import { PriceInput } from '../priceinput/PriceInput.tsx'

export interface AgeGroupData {
  ageGroup: [number, number];
  price: string;
}

export const AgeGroupPriceList = () => {
  const [data, setData] = useState<AgeGroupData[]>([{ ageGroup: [0, 20], price: '0' }],)
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index} className="">
            <AgeGroupSelect setData={setData} data={data} index={index} />
            <PriceInput setData={setData} data={data} index={index} />
          </div>
        )
      })}
      AgeGroupPriceList

    </div>

  )
}
