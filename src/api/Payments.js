import axios from "axios";
import { config } from "../configaration/Config";

/*Product Order Create*/ 
export async function orderProduct(uId,data) {
    return await axios.post(`${config.api}/api/products/${uId}`,data,{
      headers: {
        Authorization: localStorage.getItem(`${config.storage_key}`),
      },
    })
  }

/*Invoice to Email*/ 
  export async function sendinvoiceEmail(uId,pId)  {
    return axios.get(`${config.api}/api/products/${uId}/${pId}`, {
      headers: {
        Authorization: localStorage.getItem(`${config.storage_key}`),
      },
    });
  }