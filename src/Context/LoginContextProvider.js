import { useState } from "react";
import LoginContext from "./LoginContext";


const LoginContextProvider = ({children})=>{
    const [login,setlogin]  = useState(false)
    return(
        <LoginContext.Provider value={{login,setlogin}} >
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;