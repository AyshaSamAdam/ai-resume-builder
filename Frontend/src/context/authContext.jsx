import { createContext, useContext, useEffect, useState } from "react";

import { registerUser, loginUser, logoutUser, refreshAccessToken, getMe } from '../api/authApi'
import { setAccessToken as setAxiosAccessToken } from '../utils/axios'

const AuthContext = createContext()

//    children hamare paas app hai 
export const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const login = async (email, password) => {

        try {
            const data = await loginUser(email, password)

            setAccessToken(data.accessToken)
            setUser(data.user)


            setAxiosAccessToken(data.accessToken)


        }
        catch (err) {
            console.log(err)
            throw err
        }
    }


    const logout = async () => {
        try {

            const data = await logoutUser()

            setAccessToken(null)
            setUser(null)

            setAxiosAccessToken(null)


        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        console.log("USE EFFECT IS SUNING ")


        const checkLogin = async () => {

            
            try {

            setLoading(true)

              const tokenData =  await  refreshAccessToken()
            
                  
              const userData   = await   getMe()

                 setAccessToken(tokenData.accessToken)
                 setUser(userData.user)

                 setAxiosAccessToken(tokenData.accessToken)

                   
            setLoading(false)
            }

            catch (error) 
            {
               
                console.log(error.message, "CHECK LOGIN FAILED ")
                setLoading(false)
            }

        }

        checkLogin()

    }, [])
 

    return (
        <> 
        <AuthContext.Provider  value={{accessToken,user, loading, login, logout}}>
           {children}
        </AuthContext.Provider>
            
        </>
    )

}

export default AuthContext




