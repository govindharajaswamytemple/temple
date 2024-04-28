import React from 'react';



import {debounce } from "../../../utils/Utils"

function Usedebounce(dispatch){

    const debouncesetSearch=debounce((searchData)=>{
      console.log(searchData, "searchData")
       dispatch({
           type: "SET_SEARCH",
           payload: searchData 
       })
    },500)

    const debouncesetPage= debounce((customPage)=>{
      console.log(customPage, "hero")
       dispatch({
           type: "SET_CUSTOM_PAGE",
           payload: customPage
       })
    },500)
    

  return {
    debouncesetSearch,
    debouncesetPage
  }

}


export default Usedebounce;

