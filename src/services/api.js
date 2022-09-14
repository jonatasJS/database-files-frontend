import axios from "axios";

console.log("process.env.LOCALHOST_URL", process.env.LOCALHOST_URL);

const api = axios.create({
  baseURL: process.env.LOCALHOST_URL ? process.env.LOCALHOST_URL : "https://database-files-backend.herokuapp.com/",
});

export default api;
