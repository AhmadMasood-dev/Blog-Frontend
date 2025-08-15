import { api } from '../api'


export const loginApi = async (payload) => {
  try {


    const response = await api.post("/users/login", payload);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await api.post(
      "/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error.response?.data || error;
  }
};
export const getMeApi = async () => await api.get("/users/me");
