import { createContext, useEffect, useState } from "react";
import  axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();

    const[user,setUser ] = useState(false);
    const [showLogin,setShowLogin] = useState(false);

    const [token,setToken] = useState(localStorage.getItem('token'));
    const [credit,setCredit] = useState(0);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits',{headers : {token}});
            
            
            if(data.success){
                setCredit(data.credits);
                setUser(data.user);
            }

        } catch (error) {
            console.log(error.message)
            toast(error.message)
        }
    }

    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt} ,{headers : {token}});

            if(data.success){
                loadCreditsData();
                return data.resultImage;
            }else{
                toast.error(data.message);
                loadCreditsData();
                if(data.creditBalance === 0){
                    navigate('/buy');
                }
            }


        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
    }
            // loadCreditsData();

    useEffect(()=>{
        if(token){
            loadCreditsData();
        }
    },[token])

    const value = {
        user,setUser,showLogin,setShowLogin,token,setToken,credit,setCredit,backendUrl,loadCreditsData, logout , generateImage ,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
