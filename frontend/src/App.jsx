import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { useState } from "react"
import { useEffect } from "react"
import { getCurrentUser } from "../../backend/gateway/controller/user.controller"

const App = () => {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const getUser=async ()=>{
      const data= await getCurrentUser();
      setUser(data?.user);
      setLoading(false);
    }
    getUser();
  },[])

  if(loading){
    return <div></div>
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>} />

    </Routes>
    </>
  )
}

export default App
