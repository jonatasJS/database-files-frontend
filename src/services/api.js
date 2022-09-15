import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST_URL ? process.env.REACT_APP_LOCALHOST_URL : "https://database-files-backend.herokuapp.com/",
});

export default api;
