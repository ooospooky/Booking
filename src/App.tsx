import React from "react";
import { AgeGroupPriceList } from "./components/ageGroupPriceList/AgeGroupPriceList.tsx";
import { AgeGroupData } from "./components/ageGroupPriceList/AgeGroupPriceList.tsx";

function App() {
  const handleAgeGroupChange = (result: AgeGroupData[]) => {
    console.log("result:", result);
  };
  return (
    <div className="">
      <AgeGroupPriceList onChange={handleAgeGroupChange} />
    </div>
  );
}

export default App;
