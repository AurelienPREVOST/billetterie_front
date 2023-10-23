import axios from 'axios'
import {config} from '../../config'
const token = window.localStorage.getItem('tutorial-token')

export function saveOneOrder(datas){
  console.log("export function saveOneOrder(datas")
  console.log("DATAS DE SAVEONEORDER=>", datas)
  return axios.post(`${config.api_url}/order/save`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function checkPayment(datas){
  return axios.post(`${config.api_url}/order/payment`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function updateOrder(datas){
  return axios.put(`${config.api_url}/order/validate`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getAllOrders(){
  return axios.get(`${config.api_url}/order/all`, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getOneOrder(id){
  return axios.get(`${config.api_url}/order/getOneOrder/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getMyOrder(id){
  return axios.get(`${config.api_url}/order/getMyOrder/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getOrderByUserId(user_id){
  return axios.get(`${config.api_url}/myorders/${user_id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function getPlacesFromOrder(orderId) {
  return axios.get(`${config.api_url}/order/placesInformations/${orderId}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    console.log("************************")
    console.log(orderId)
    console.log("************************")

    console.log("passe apr getPlacesFromOrder(orderId)")
    console.log("res.data",res.data)
    return res.data
  })
  .catch((err) => {
    console.log("err", err)
    return err
  })
}
