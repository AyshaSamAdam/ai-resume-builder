import axiosInstance from "../utils/axios"


export const registerUser = async (username, email, password) => {

    const response = await axiosInstance.post("/auth/register", { username, email, password })
    return response.data
}


export const loginUser = async (email, password) => {

    const response = await axiosInstance.post("/auth/login", { email, password })
    return response.data
}


export const logoutUser = async () => {

    const response = await axiosInstance.post("/auth/logout", {})
    return response.data

}

export const refreshAccessToken = async () => {

     const response = await axiosInstance.post("/auth/refresh-token", {})
     return response.data
}

//  No body neeeded {} GET requests dont have a body
export const getMe = async () => {

     const response = await  axiosInstance.get("/auth/me")
     return response.data
}



export const  generateReportApi = async  (FormData) => {
 
    const response = await axiosInstance.post("/report/input", FormData, {headers : {'Content-Type' : 'multipart/form-data'}})
    return response.data

}


export const getReportApi = async (reportId) => {
            const response =  await axiosInstance.get(`/report/${reportId}`)
            return response.data

}

export const getMyReportsApi = async () => {
          const response =  await axiosInstance.get("/report/my-reports")
          return response.data
}



   // 1 argument the the address of the request 2 argument the data we sending on thsi address ( request) and 3 argument is the instructions 
    //  why write { 3 argument headers : } u write it for axios  axios passses it to the http request multer on the backened reads it and acts o it  without this header Multer would not recognize the request as a  file upload and req.file would be undefined in your controller 
