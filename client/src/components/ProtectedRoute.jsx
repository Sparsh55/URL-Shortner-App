import { cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const[user,setUser] = useState(null);
    const navigate = useNavigate()

    function getCookie(name) {
        const cookieValues = document.cookie.split('; ');
        const cookieObject = {};
    
        cookieValues.forEach(cookie => {
            const [key, value] = cookie.split('=');
            try {
                cookieObject[key] = JSON.parse(decodeURIComponent(value)); // Try parsing the value as JSON
            } catch (error) {
                console.log(error)
                cookieObject[key] = decodeURIComponent(value); // If not JSON, fallback to raw value
            }
        });
    
        return cookieObject[name] || null;
    }
  

      useEffect(()=>{
        
        const userData = getCookie("userUrl")
        
        
        console.log(userData,user)
        if(userData){
          setUser(userData)
          navigate("/dashboard")
        }
        else{
          setUser(null)
          navigate("/")
        }
  },[user ,navigate]);
  return cloneElement(children,{user, setUser})
}

export default ProtectedRoute