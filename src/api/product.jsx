import axios from 'axios'
import {config} from '../../config'
const token = window.localStorage.getItem('tutorial-token')


//obtenir les coordonnées via API Externe:
// curl "https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port"



export function displayProducts(){
  return axios.get(`${config.api_url}/product/all`)
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function testProductSql(type){
  return axios.get(`${config.api_url}/product/type/${type}`)
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function takeOneProduct(id){
  return axios.get(`${config.api_url}/product/${id}`)
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function addOneProduct(datas){
  return axios.post(`${config.api_url}/product/new`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function updateOneProduct(datas, id){
  return axios.put(`${config.api_url}/product/update/${id}`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function deleteOneProduct(id){
  return axios.delete(`${config.api_url}/product/delete/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err) => {
    return err
  })
}

export function searchEventsWithKeyWord(keyword){
  return axios.get(`${config.api_url}/event`, { params: { PartialQuery: `${keyword}` } })
  .then((res)=>{
    return res.data
  })
  .catch((err)=> {
    return err
  })
}
