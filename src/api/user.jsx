import axios from 'axios'
import {config} from '../../config'
const token = window.localStorage.getItem('tutorial-token')

// export function addOneUser(datas){
//   console.log("je passe par addOneUser, voici datas=>", datas) // PASSE PAR LA
//   console.log("config.api_url==>", config.api_url) // retourne bien http://localhost:9000
//   return axios.post(`${config.api_url}/user/save`, datas)
//   .then((res)=>{
//     console.log("je passe dans le then de addOneUser, voici res.data=>", res.data)
//       return res.data
//   })
//   .catch((err) => {
//     console.log("je tombe dans le catch voici err =>", err)  // PASSE PAR LA
//       return err
//   })
// }

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
  console.log("FRONT, je rentre dans forgotPassword et voici (mdp)", mdp)
  return axios.post(`${config.api_url}/user/forgot`, mdp)
  .then((res)=>{
    console.log("FRONT, then de forgotPassword (res =>) ", res)
    return res.data
  })
  .catch((err) => {
    console.log("FRONT, dans le catch de forgotPassword(data)")
    return err.response.data
  })
}


export function changePassword(data){
  console.log("FRONT, je passe dans changePassword et voici (data)", data)
  return axios.post(`${config.api_url}/user/changePassword/:key_id`, data)
  .then((res)=>{
    console.log("FRONT, then de changePassword (res =>) ", res.data)
    return res.data
  })
  .catch((err) => {
    console.log("FRONT, dans le catch de changePassword(data)")
    console.log(err.response.data)
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

export function checkIfValidateIsYes(email) {
  console.log("email de api/user.jsx", email)
  return axios.get(`${config.api_url}/user/checkMailValidation?email=${email}`)
    .then((res) => {
      console.log("checkIfValidateIsYes api/user front => res =>", res)
      return res.data;
    })
    .catch((err) => {
      console.log("checkIfValidateIsYes api/user front => err =>", err);
      return err;
    });
}

export function sendMail(myContact, subject, message) {
  const data = {
    myContact: myContact,
    subject: subject,
    message: message
  };

  return axios.post(`${config.api_url}/envoiMailFormContact`, data)
    .then((res) => {
      console.log("sendmail res =>", res);
      return res.data;
    })
    .catch((err) => {
      console.log("sendmail err =>", err);
      return err;
    });
}
