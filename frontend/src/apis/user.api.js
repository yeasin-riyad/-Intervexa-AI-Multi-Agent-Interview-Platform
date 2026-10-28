import api from "../../utils/axios.js"

export const currentUser= async()=>{
    try {
        const response= await api.get("/api/me");
        return response.data;
        
    } catch (error) {
        console.error(error);
        return null;
        
    }
}