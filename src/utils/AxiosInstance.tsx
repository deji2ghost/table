import axios, { AxiosError } from "axios";
import { baseUrl } from "./base";

const AxiosInstance = axios.create({
  baseURL: baseUrl(),
});

AxiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance