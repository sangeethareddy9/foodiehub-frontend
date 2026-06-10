import axios from "axios";

const api = axios.create({
  baseURL: "https://foodiehub-api-lvp5.onrender.com"
});

export default api;