import { createBrowserRouter } from "react-router-dom";
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Dashboard from './pages/dashboard.jsx'
import  ProtectedRoute from './components/ProtectedRoute.jsx'
import { Navigate } from "react-router-dom";
import Report from "./pages/report.jsx";


export const router = createBrowserRouter([
    {
        path : '/',
        element :  <Navigate to='/register'  />
    },
    {
        path : "/dashboard",
        element : (
             <ProtectedRoute>
                    <Dashboard />
            </ProtectedRoute >
        )
    },
    {
        path : '/login',
        element:<Login />
    },
    {
        path : "/register",
        element : <Register  />

    },
    {
        //  the report page needs to know which report to dispaly so :reportID that specific user report to show on report page 
        path : '/report/:reportId',
        element :  <ProtectedRoute><Report/></ProtectedRoute>
    }
])