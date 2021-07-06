import axios from 'axios';
import jwtDecode from 'jwt-decode';

const getAllProducts = (url)=>{
    
    return axios({
        method: 'get',
        url
      }).then((res)=>res.data).catch(er=>er);

}
const getAllCategories = (url)=>{
  let config = {
      headers: {
        'Accept': 'application/json'
      }
    }
  return axios({
      method: 'get',
      url,
      config
    }).then((res)=>res.data).catch(er=>er);

}
const addProductFav = (lang,data)=>{
  const token = window.localStorage.getItem("authToken");
  
    if(token){
      const {id} = jwtDecode(token);
      const url = `${process.env.REACT_APP_API_PATH}/${lang}/users/${id}/addproducts`;
        return axios({
            method: 'post',
            url,
            data
          }).then((res)=>res.data).catch((er)=>er);
    }
}

const removeProductFav = (lang,data)=>{
  const token = window.localStorage.getItem("authToken");
  
    if(token){
      const {id} = jwtDecode(token);
      const url = `${process.env.REACT_APP_API_PATH}/${lang}/users/${id}/removeproducts`;
      console.log(data)
        return axios({
            method: 'put',
            url,
            data
          }).then((res)=>res.data).catch((er)=>er);
    }
}
function GetFavoriteProducts(lang) {
  const token = window.localStorage.getItem("authToken");
    if(token){
      const {id} = jwtDecode(token);
      const url = `${process.env.REACT_APP_API_PATH}/${lang}/users/${id}/favorites`;
      return axios({
        method: 'get',
        url,
        headers: {
         'accept': 'application/json',
         }
      }).then((res)=>res.data);
    }
  
  
 }
const addProductInOrder = (products,adder)=> {
  let isExist = false
  const data = products.map(item=>{
    if(adder.id===item.id){
      item.quantite++
      isExist=true
    }
    return item
  })
  if(!isExist){
    data.push(adder)
  }
  return data;
}
const removeProductInOrder = (products,removedId)=>{
  const res = products.filter(item=>removedId!==item.id)
  return res;
}
export default {
    getAllProducts,
    GetFavoriteProducts,
    addProductFav,
    removeProductFav,
    getAllCategories,
    addProductInOrder,
    removeProductInOrder
}