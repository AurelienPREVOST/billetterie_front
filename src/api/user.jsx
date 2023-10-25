import axios from 'axios'
import {config} from '../../config'
const token = window.localStorage.getItem('tutorial-token')

export const addOneUser = (datas) => {
  return axios.post(`${config.api_url}/user/save`, datas)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    return err.response.data
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

export function forgotPassword(mdp){
  return axios.post(`${config.api_url}/user/forgot`, mdp)
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err.response.data
  })
}


export function changePassword(data){
  return axios.post(`${config.api_url}/user/changePassword/:key_id`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
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
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function checkIfValidateIsYes(email) {
  return axios.get(`${config.api_url}/user/checkMailValidation?email=${email}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

export function sendMail(myContact, subject, message) {
  const data = {
    myContact: myContact,
    subject: subject,
    message: message
  }

  return axios.post(`${config.api_url}/envoiMailFormContact`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
