import axios from 'axios';
import { config } from '../../config';
// Le token doit etre declaré dans chaque fonction sinon localstorage est undefined
export function saveOneOrder(datas) {
  const token = window.localStorage.getItem('tutorial-token');
  console.log("token =>", token);

  return axios.post(`${config.api_url}/order/save`, datas, { headers: { "x-access-token": token } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export function checkPayment(datas){
  const token = window.localStorage.getItem('tutorial-token');
  return axios.post(`${config.api_url}/order/payment`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function updateOrder(datas){
  const token = window.localStorage.getItem('tutorial-token');
  return axios.put(`${config.api_url}/order/validate`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getAllOrders(){
  const token = window.localStorage.getItem('tutorial-token');
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
  const token = window.localStorage.getItem('tutorial-token');
  return axios.get(`${config.api_url}/order/getMyOrder/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getOrderByUserId(user_id){
  const token = window.localStorage.getItem('tutorial-token');
  return axios.get(`${config.api_url}/myorders/${user_id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function getPlacesFromOrder(orderId) {
  const token = window.localStorage.getItem('tutorial-token');
  return axios.get(`${config.api_url}/order/placesInformations/${orderId}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}
