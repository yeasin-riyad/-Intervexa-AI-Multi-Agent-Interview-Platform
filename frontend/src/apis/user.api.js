import api from "../../utils/axios.js"

export const currentUser= async()=>{
    try {
        const response= await api.get("/api/auth/me");
        return response.data;
        
    } catch (error) {
        console.error(error);
        return null;
        
    }
}


export const deductCoins= async({ coins, action })=>{
    try {
        const response= await api.post("/api/auth/use-coins",{ coins, action });
        return response.data;
        
    } catch (error) {
        return null;
        
    }

}