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


///////ON COMMENTE POUR ESSAYER UNE AUTRE VERSION MAIS CELLE CI MARCHE
// export function updateStatusSeat(id) {
//   return axios.put(`${config.api_url}/place/updateseat/${id}`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err;
//     });
// }

export function updateStatusSeat(placeId, clientId) {
  return axios.put(`${config.api_url}/place/updateseat/${placeId}`, { clientId })
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
