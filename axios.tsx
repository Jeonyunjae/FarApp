import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://a27c-124-57-96-37.jp.ngrok.io/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 10000,
  withCredentials: true,
});

export default axiosClient;