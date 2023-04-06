import React, { useContext, useState } from "react"

const Auth=React.createContext({
    isLoggedIn:false,
    token:'',
    login:(token)=>{},
    logout:()=>{},
});
const calculateRemainingTime=(expirationTime)=>{
    const currentTime=new Date().getTime();
    // console.log(currentTime);
    const newexpirationTime=new Date(expirationTime).getTime();
    const remainingTime=currentTime-newexpirationTime
    console.log(remainingTime);
    return remainingTime
}
const AuthContextProvier=({children})=>{
    const initialTokan=localStorage.getItem('loginInfo')
    const [token,setToken]=useState(initialTokan)
    const userIsLoggedIn=!!token
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('loginInfo')
    }
    const loginHandler=(token,expirationtime)=>{
        setToken(token)
        localStorage.setItem('loginInfo',token)
        const remainingTime=calculateRemainingTime(expirationtime)
        setTimeout(()=>{
            logoutHandler()
        }
        ,remainingTime)
        
    }
    return <Auth.Provider value={{
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }}>{children}</Auth.Provider>
}

export default AuthContextProvier

export const AuthContext=()=>{
    return useContext(Auth)
}