
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { registerUser } from '../api/authApi'
import axiosInstance from '../utils/axios'

const Register = () => {
    
       const {login } = useAuth()
       const navigate = useNavigate()

      const [username, setUsername] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")
      const [error , setError] = useState(null)
      const [loading , setLoading] = useState(false)



      const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
          setError("Passwords Don't Match")
          //   return  stop here dont continue
          return
        }

        setLoading(true)
        try{
    
          await registerUser(username, email, password)
          await login(email, password)

          navigate("/dashboard")

        }
        catch(error) {

          setError(error.response?.data?.message || 'Something went wrong')
          setLoading(false)
                      
        }

    

      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
              <div className="text-center">
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create An Account</h1>
                <p className="text-gray-600 text-sm">Join us today and get started</p>
              </div>

              {/* if any error exist just show it rn  */}
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold text-sm">Username</label>
                  <input type="text" placeholder='Enter Username' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" value={username}  onChange={(e) => {setUsername(e.target.value); setError(null)}} required/>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold text-sm">Email</label>
                  <input type="email" placeholder='Enter Email' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" value={email}  onChange={(e) =>{ setEmail(e.target.value); setError(null)}}  required/>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold text-sm">Password</label>
                  <input type="password" placeholder='Enter Password' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" value={password}  onChange={(e) => { setPassword(e.target.value); setError(null)}}  required/>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-semibold text-sm">Confirm Password</label>
                  <input type="password" placeholder='Enter Password Again' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" value={confirmPassword}  onChange={(e) => {setConfirmPassword(e.target.value); setError(null)}}  required/>
                </div>

                <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>

              <div className="border-t border-gray-200 pt-6 text-center">
                <p className="text-gray-700 text-sm">
                  Already have an account? <span onClick={() => navigate("/login")} className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition">Sign In</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )

}

export default Register
