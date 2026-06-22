
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'




function Login() {
    
      
       const {login} = useAuth()
       const navigate = useNavigate()


       const [email, setEmail] = useState("")
       const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)


       const handleSubmit =  async (e) => {
             e.preventDefault()

             setLoading(true)
             

             try{

              await login(email, password)
              navigate("/dashboard")
              

             }
             catch(error) {
              
          setError(error.response?.data?.message || 'Something went wrong')

      //     if login succeeds and naviagte to dashboard  setLoading(false never runs - loading stays true  fix move setLoading(false)) to finally 
             }
             finally{
                  setLoading(false)
             }
       }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-gray-600 text-sm">Welcome back, please login to your account</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold text-sm">Email</label>
              <input type="email" value={email} required placeholder="Enter Your Email address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" onChange={(e) => { setEmail(e.target.value); setError(null)} } />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold text-sm">Password</label>
              <input type="password" value={password} required placeholder="Enter Your Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" onChange={(e) => {setPassword(e.target.value); setError(null)}} />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={loading}>{loading ? "Logging you in..." : "LOGIN"}</button>
          </form>

          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-gray-700 text-sm">
              Don't have an account? <span onClick={() => navigate("/register")} className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
