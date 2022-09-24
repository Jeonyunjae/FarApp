import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'

  },
  timeout: 10000,
  withCredentials: true,
});

export default axiosClient;