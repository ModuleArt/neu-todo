import axios from "axios";

const DEBUG = process.env.NODE_ENV !== "production";
const API_MASTER_KEY = process.env.VUE_APP_API_MASTER_KEY || "-";

const api = axios.create({
  baseURL: "https://api.jsonbin.io/v3",
  timeout: 20000,
  headers: {
    "X-Master-Key": API_MASTER_KEY,
  },
});

api.interceptors.request.use(function (config) {
  if (DEBUG) {
    console.log("API Request:", config);
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    if (DEBUG) {
      console.log("API Response:", response);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

export default api;
