import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

//  ACCESS TOKEN 

let accessToken = null
export const setAccessToken = (token) => {
    accessToken = token
}



//  axios. create make custom axios 

// Remembe cookies? 
// refreshToken live sin HTTP only Cookie
//  by default axios does not send cookies
// with credentials : true tells axios :
//  "always send cookies with every request "
//  without this the refersh token  neverreaches backened 
//  with this refresh token travels automatically



// REFRESH TOKEN 

const axiosInstance = axios.create({
    baseURL :  BASE_URL,
    withCredentials : true
})


axiosInstance.interceptors.request.use(
//  this function runs before every request
    (config) => {
        // config = everything aout the request
        // URL , method, headers , body etc

        //  do we have access token 
        if (accessToken) {
            // yes ? add it to the header
            config.headers.Authorization = `Bearer ${accessToken}`

            //  now every request has the token
        }

        // sends the request now 
        //  return config means "okay you can go "

        return config
    },

    (error) => Promise.reject(error)

)


axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
         const originalRequest = error.config

//  agr access token expire ho gaya yani return 401 means unauthorized hai user acces token expire ho gay aaur refresh token bhi expire ho gaya like  7 days baad its alos give 401  yaani original request hum ne ek baar ki aur nahi hua then pehle hum ne false kiya then hum ne true kar diya like ke nahi hua try abhi tak phir hum ne try kar wa liya ( abb 401 ayya aur tty bhi kar liya ek dafa still then stop f not then response )
// !undefined => true
        if (error.response?.status === 401 && !originalRequest._retry){
                        originalRequest._retry = true

         try{
             const response =  await axios.post(
                `${BASE_URL}/auth/refresh-token`, 
                {}, 
                {withCredentials : true}   
            )
          
            const newAcessToken = response.data.accessToken
            setAccessToken(newAcessToken)

            originalRequest.headers.Authorization = `Bearer ${newAcessToken}`
         return axiosInstance(originalRequest)


          }
        catch(refreshError) {

            setAccessToken(null)
            
            return Promise.reject(refreshError)

         }   
        }


        return  Promise.reject(error)



    }

)



export default axiosInstance