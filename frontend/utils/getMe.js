import api from "./axios.js";

 export const getCurrentUser = async () => {
  const { data } = await api.get("/api/auth/me", {
    withCredentials: true,
  });

  return data;
};