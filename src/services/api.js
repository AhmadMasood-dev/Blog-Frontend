
import axios from "axios";


// baseURL: "http://localhost:8000/api/v1",
export const api = axios.create({
  baseURL: "https://blog-backend-mu-sooty.vercel.app/api/v1",
  timeout: 5000,
  withCredentials: true,
});
