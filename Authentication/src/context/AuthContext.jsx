import React, { useContext, useState } from "react"

const Auth=React.createContext({
    isLoggedIn:false,
    token:'',
    login:(token)=>{},
    logout:()=>{},
});

const AuthContextProvier=({children})=>{
    const [token,setToken]=useState(null)
    const userIsLoggedIn=!!token
    const loginHandler=(token)=>{
        setToken(token)
    }
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('loginInfo')
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