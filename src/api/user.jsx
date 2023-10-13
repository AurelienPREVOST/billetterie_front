import axios from 'axios'
import {config} from '../../config'
const token = window.localStorage.getItem('tutorial-token')

export function addOneUser(datas){
  return axios.post(`${config.api_url}/user/save`, datas)
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function loginUser(datas){
  return axios.post(`${config.api_url}/user/login`, datas)
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function forgotPassword(data){
  console.log("FRONT, je rentre dans forgotPassword et voici (data)", data)
  return axios.post(`${config.api_url}/user/forgot`, data)
  .then((res)=>{
    console.log("FRONT, then de forgotPassword (res =>) ", res)
    return res.data
  })
  .catch((err) => {
    console.log("FRONT, dans le catch de forgotPassword(data)")
    return err.response.data
  })
}

export function updateProfil(datas, id){
  return axios.put(`${config.api_url}/user/update/${id}`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function checkMyToken(){
  return axios.get(`${config.api_url}/user/checkToken`, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function getUserPlaces(userId) {
  return axios.get(`${config.api_url}/places/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
