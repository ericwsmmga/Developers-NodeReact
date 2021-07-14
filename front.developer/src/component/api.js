import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.rhtua.com.br",
});

export default api;
