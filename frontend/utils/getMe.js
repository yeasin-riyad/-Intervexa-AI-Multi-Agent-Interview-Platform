import api from "./axios.js";

 export const getCurrentUser = async () => {
  const { data } = await api.get("/api/me", {
    withCredentials: true,
  });

  return data;
};