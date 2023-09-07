import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AgeGroupData } from '../../components/ageGroupPriceList/AgeGroupPriceList.tsx'

interface IinitialState {
  value: AgeGroupData[],
}


// loop allProducts to get init productList : {1:{total:0},2:{total:0},.....}


let initialState: IinitialState = { value: [{ ageGroup: [0, 20], price: '0' }] }


export const ageGroupPriceSlice = createSlice({
  name: 'ageGroupPrice',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    addCard: (state) => {
      state.value.push({ ageGroup: [0, 20], price: '0' })
    },
    removeCard: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.value.splice(index, 1);
    },
    ageChange: (state, action: PayloadAction<{ index: number; type: string; newAge: number }>) => {
      const { index, type, newAge } = action.payload;
      state.value[index].ageGroup[type === 'start' ? 0 : 1] = newAge;
    },
    priceChange: (state, action: PayloadAction<{ index: number; newValue: string }>) => {
      const { index, newValue } = action.payload;
      state.value[index].price = newValue;
    },
    // addToCart: (state, action: PayloadAction<{ id: string; color: string; }>) => {
    //   const { id, color } = action.payload;
    //   state.value[id][color] = (state.value[id][color] || 0) + 1;
    //   state.value[id].total += 1;
    //   state.totalAmount += 1;
    // },
    // changeProductCount: ((state, action: PayloadAction<{ id: string; color: string; number: number; }>) => {
    //   const { id, color, number } = action.payload;
    //   let numberDiff = number - state.value[id][color]
    //   state.value[id][color] = state.value[id][color] + numberDiff;
    //   state.value[id].total += numberDiff;
    //   state.totalAmount += numberDiff;
    //   // total:2 black:2
    //   // total:? black:7  加上兩者的差即為新的產品數量
    // }),
    // deleteFromCart: (state, action: PayloadAction<{ id: string; color: string; }>) => {
    //   const { id, color } = action.payload;
    //   const prevNumber = state.value[id][color]
    //   delete state.value[id][color];  //移除該顏色的key
    //   state.value[id].total -= prevNumber;
    //   state.totalAmount -= prevNumber;
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addCard, removeCard, ageChange, priceChange } = ageGroupPriceSlice.actions

export default ageGroupPriceSlice.reducer