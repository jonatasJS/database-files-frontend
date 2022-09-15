import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST_URL == "http://localhost:4000/" ? process.env.REACT_APP_LOCALHOST_URL : "https://database-files-backend.herokuapp.com/",
});

export default api;
