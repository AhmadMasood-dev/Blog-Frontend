
import axios from "axios";


export const api = axios.create({
  baseURL: "https://blog-backend-mu-sooty.vercel.app/api/v1",
  timeout: 5000,
});



// // Create an Axios instance with base URL
// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // Replace with your backend base URL
//   timeout: 5000, // Optional: Set timeout for requests
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const request = async (method, url, data = null, config = {}) => {
//   try {
//     const response = await api({
//       method,
//       url,
//       data,
//       ...config,
//     });
//     // Success: Return response.data
//     return response.data;
//   } catch (error) {
//     // Failure: Throw error with backend message or fallback
//     const message =
//       error.response?.data?.message ||
//       error.message ||
//       `Failed to ${method.toUpperCase()} ${url}`;
//     throw new Error(message);
//   }
// };

// // Export specific HTTP methods
// export const get = (url, config = {}) => request("get", url, null, config);
// export const post = (url, data, config = {}) => request("post", url, data, config);
// export const put = (url, data, config = {}) => request("put", url, data, config);
// export const del = (url, config = {}) => request("delete", url, null, config);
