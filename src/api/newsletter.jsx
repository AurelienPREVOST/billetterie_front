import axios from 'axios'
import {config} from '../../config'

export function addToNewsletter(datas){
  return axios.post(`${config.api_url}/newsletter/add_email`, datas)
  .then((res)=>{
      return res.data
  })
  .catch((err) => {
      return err
  })
}
