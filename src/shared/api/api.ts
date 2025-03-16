import axios from "axios";

const BASE_URL = 'http://217.114.4.176:5000/'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
