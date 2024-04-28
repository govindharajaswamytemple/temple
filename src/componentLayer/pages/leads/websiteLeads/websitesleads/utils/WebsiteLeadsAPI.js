import axios from "axios";

// download syllabus
// export const getDownloadSyllabusLeads=async(filters,search,perPage,currentPage)=>{
//     const mergObj ={...search, ...perPage, ...currentPage, ...filters}
//     console.log(mergObj, "djjfgjff")
//     const url =`${process.env.REACT_APP_API_URL}/websiteleads/dsformleads`;
//     return axios.post(url,mergObj)
// } 

// webinar 
// export const getWebinarLeads=async(filterobj, searchobj, perPageObj, currentPageObj)=>{
//     const mergObj={...filterobj, ...searchobj, ...perPageObj, ...currentPageObj}
//     const url=`${process.env.REACT_APP_API_URL}`;
//     return axios.post(url,mergObj)
// }

// Whatsapp 
// export const getwhatsAppLeads=async(filterobj, searchobj, perPageObj, currentPageObj)=>{
//     const mergObj={...filterobj, ...searchobj, ...perPageObj, ...currentPageObj}
//     const url=`${process.env.REACT_APP_API_URL}`;
//     return axios.post(url,mergObj)
// }
//SLPEnquireLeads
// export const getSLPEnquireLeads=async(filters,search,perPage,currentPage)=>{
//     const mergObj ={...search, ...perPage, ...currentPage, ...filters}
//     console.log(mergObj, "djjfgjff")
//     const url =`${process.env.REACT_APP_API_URL}/websiteleads/slpefleads`;
//     return axios.post(url,mergObj)
// } 

 
// download syllabus
export const getDownloadSyllabusLeads = async (
  filters,
  search,
  perPage,
  currentPage
) => {
  const mergObj = { ...search, ...perPage, ...currentPage, ...filters };
  console.log(mergObj, "djjfgjff");
  const url = `${process.env.REACT_APP_API_URL}/websiteleads/dsformleads`;
  return axios.post(url, mergObj);
};
 
// webinar
export const getWebinarLeads = async (
  filterobj,
  searchobj,
  perPageObj,
  currentPageObj
) => {
  const mergObj = {
    ...filterobj,
    ...searchobj,
    ...perPageObj,
    ...currentPageObj,
  };
  const url = `${process.env.REACT_APP_API_URL}`;
  return axios.post(url, mergObj);
};
 
// Whatsapp
export const getwhatsAppLeads = async (
  filterobj,
  searchobj,
  perPageObj,
  currentPageObj
) => {
  const mergObj = {
    ...filterobj,
    ...searchobj,
    ...perPageObj,
    ...currentPageObj,
  };
  const url = `${process.env.REACT_APP_API_URL}/websiteleads/whatsappleads`;
  return axios.post(url, mergObj);
};
 //SLPLeads
 export const getSLPEnquireLeads = async (
    filterobj,
    searchobj,
    perPageObj,
    currentPageObj
  ) => {
    const mergObj = {
      ...filterobj,
      ...searchobj,
      ...perPageObj,
      ...currentPageObj,
    };
    const url = `${process.env.REACT_APP_API_URL}/websiteleads/slpefleads`;
    return axios.post(url, mergObj);
  };
