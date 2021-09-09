import axios from "axios";


axios.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = localStorage.getItem('token') ?? null;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios
