import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://9c9d-118-235-10-236.jp.ngrok.io/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 10000,
  withCredentials: true,
});

export default axiosClient;