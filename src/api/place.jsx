import axios from 'axios'
import {config} from '../../config'

export function getAllPlaces(id){
  return axios.get(`${config.api_url}/place/all/product/${id}`)
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}

export function updateStatusSeat(placeId, clientId, numOrder) {
  return axios.put(`${config.api_url}/place/updateseat/${placeId}`, { clientId, numOrder })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export function qrCodeChecking(scanResult) {

  return axios.get(`${config.api_url}/place/checking/${scanResult}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export function qrCodeFirstValidateScan(scanResult) {
  return axios.put(`${config.api_url}/place/firstscan/${scanResult}`)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  });
}
