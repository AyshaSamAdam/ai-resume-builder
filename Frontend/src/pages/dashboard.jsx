import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'


import { generateReportApi, getMyReportsApi } from '../api/authApi'


function Dashboard() {

  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])
  const [reportsLoading, setReportsLoading] = useState(true)
  const [submitError, setSubmitError] = useState(null)
   const [reportsError, setReportsError] = useState(null)

//  generate Report 
  const handleSubmit = async () => {
    try {

      if(!jobDescription) {
        setSubmitError("Job Description is Required ")
        return  // RETURN MEAN STOP HERE why return over here  without return javascript continues executing the next lines of code : like even though jobDescription is empty
      }

        if(!selfDescription && !resume) {
          setSubmitError("Please Provide either a resume or Self Description")
          return
        }


      setLoading(true)
      const formData = new FormData()

      formData.append("jobDescription", jobDescription)
      formData.append("selfDescription", selfDescription)
      if(resume) {
              formData.append("resume", resume)
      }
   

      const response = await generateReportApi(formData)
      navigate(`/report/${response.report.id}`)

    }
    catch (error) {
      console.log(error)
      setSubmitError(error.response?.data?.message  || "Something went wrong while generating a report ")
    } finally {
      setLoading(false)
    }

  }

  // logging out
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

//  loading previous reports 
  useEffect(() => {


    const fetchAllReports = async () => {
      try {


        const data = await getMyReportsApi()
        setReports(data.reports)
      }
      catch (error) {
        console.log(error)
        setReportsError(error.response?.data?.message || "Something went wrong while fething the reports ")
      }
      finally {
        setReportsLoading(false)
      }

    }

    fetchAllReports()
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.username}!</h1>
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 text-sm">LogOut</button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Generate Report Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Interview Report</h2>

          {submitError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium mb-6">{submitError}</div>}
          {reportsError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium mb-6">{reportsError}</div>}

          <div className="space-y-5">
            <div>
              <label htmlFor='jobDescription' className="block text-gray-700 font-semibold text-sm mb-2">Job Description</label>
              <textarea name='jobDescription' id='jobDescription' placeholder='Enter Job Description Here' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none" rows="4" value={jobDescription} onChange={(e) => {setJobDescription(e.target.value); setSubmitError(null)}}></textarea>
            </div>

            <div>
              <label htmlFor='resume' className="block text-gray-700 font-semibold text-sm mb-2">Upload Resume (PDF)</label>
              <input type='file' accept='.pdf' name='resume' id='resume' className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer text-sm" onChange={(e) => {setResume(e.target.files[0]); setSubmitError(null)}} />
              <p className="text-gray-500 text-xs mt-2">(Use resume and self description together for best results)</p>
            </div>

            <div>
              <label htmlFor='selfDescription' className="block text-gray-700 font-semibold text-sm mb-2">Self Description</label>
              <textarea name='selfDescription' id='selfDescription' placeholder='Tell us about your experience and skills' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none" rows="4" value={selfDescription} onChange={(e) => {setSelfDescription(e.target.value); setSubmitError(null)}}></textarea>
            </div>

            <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={loading}>{loading ? "Generating interview report..." : "Generate Interview Report"}</button>
          </div>
        </div>

        {/* Previous Reports Section */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Previous Reports</h2>

          {reportsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 mt-4 text-sm">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No reports yet. Create your first one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(`/report/${report._id}`)}
                  className="border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-lg hover:border-indigo-400 transition duration-300 hover:bg-indigo-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-indigo-600">{report.matchScore}%</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Match</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{report.jobDescription}</p>
                  <p className="text-indigo-600 text-xs font-medium mt-3 hover:underline">View Report →</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
