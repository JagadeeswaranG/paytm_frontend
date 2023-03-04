import axios from "axios";
import { config } from "../configaration/Config";

// Bill history
export async function allBills(uId)  {
    return axios.get(`${config.api}/api/products/${uId}`, {
      headers: {
        Authorization: localStorage.getItem(`${config.storage_key}`),
      },
    });
  }