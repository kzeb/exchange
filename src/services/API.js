import axios from "axios";
import { history } from "./history";

const instance = axios.create({
  baseURL: "https://exchange-remitly-api.herokuapp.com/",
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export const API = instance;
