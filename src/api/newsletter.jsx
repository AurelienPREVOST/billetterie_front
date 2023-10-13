import axios from 'axios'
import {config} from '../../config'

export function addToNewsletter(datas){
  return axios.post(`${config.api_url}/newsletter/add_email`, datas)
  .then((res)=>{
    console.log("RESSSSSS", res)
      return res.data
  })
  .catch((err) => {
    console.log("ERR", err)
      return err
  })
}
