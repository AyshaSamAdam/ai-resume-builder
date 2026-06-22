import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getReportApi} from '../api/authApi'




function Report() {


  // ye reportId is from app.routes.jsx ayesha look at there we have wrote   path : '/report/:reportId',   then in our dashboard we have ddone something liek that  
  //                 const response = await generateReportApi(formData)
  //                 navigate(`/report/${response.report.id}`)
  //                 so in our response back w ehave an id in there right  so we did attach it to our app.routes.jsx path (/report/29737293982) 



  // url mein hamare pass id ayyi hui hogi  /report/38288483
  // use params mein hamara pass 8439344890 ye id ho gi aur usse hum ne reportId  mein daal di remember in app.routes.jsx we have  teh same name /report/:reportId
       const {reportId}       =   useParams()
//  stores report data null until fetched 
//  laoding starts true bcz we are fetching immediately on page loads  so we need to show the user loading.... until teh report is fetched and we ste the report form null to .. 

       const  [report, setReport] = useState(null)
       const  [loading, setLoading] = useState(true) 
       const [error, setError] = useState(null)

//  we are using use effect becaus ewe are fetching data immediately not when the  user clicks a button or something immediately show the data when the components loads and fr tat we use useEffect 
       useEffect(() => {

            const fetchReport = async () => {
              try{
                     const data = await getReportApi(reportId)
                     setReport(data.report )

              }
              catch(error) {
                console.log(error)
                setError(error.response?.data?.message || "something went wrong while fetching the report")
              }
              finally{
                setLoading(false)

              }
            }


            fetchReport() 
       }, [])


          if (loading)  return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
                <p className="text-gray-700 text-xl font-semibold">Loading your report...</p>
              </div>
            </div>
          )
          if (error)   return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center border-t-4 border-red-500">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-700 text-lg font-bold mb-2">Oops! Something went wrong</p>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          )
          if (!report)   return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center border-t-4 border-yellow-500">
                <div className="text-yellow-500 text-6xl mb-4">📋</div>
                <p className="text-gray-800 text-lg font-bold">Report Not Found</p>
                <p className="text-gray-600 text-sm mt-2">The report you're looking for doesn't exist.</p>
              </div>
            </div>
          )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Match Score Header */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-10 mb-10 text-center border border-gray-100">
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">Your Interview Performance</p>
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 blur-xl"></div>
              <div className="absolute inset-2 rounded-full border-8 border-gradient-to-r from-indigo-400 to-purple-500" style={{borderImage: 'linear-gradient(135deg, #6366f1, #a855f7) 1'}}></div>
              <div className="relative text-center">
                <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{report.matchScore}</span>
                <p className="text-gray-500 text-lg font-bold">%</p>
              </div>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {report.matchScore >= 80 ? "🎉 Excellent Match - You're well prepared!" : report.matchScore >= 60 ? "👍 Good Match - Nice preparation" : "📈 Keep working - Room for improvement"}
          </p>
        </div>

        {/* Technical Questions Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-10 border border-slate-700">
          <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <span className="text-2xl">💻</span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Technical Questions</span>
          </h2>
          <p className="text-gray-400 text-sm mb-6">Questions designed to assess your technical expertise</p>
          <div className="space-y-5">
            {report.technicalQuestion.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-bold flex-shrink-0 shadow-lg">{index + 1}</span>
                  <h3 className="text-lg font-bold text-white leading-tight flex-1">{item.question}</h3>
                </div>
                <div className="ml-12 space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">💡 Intention</p>
                    <p className="text-gray-300 font-medium">{item.intention}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">✅ Suggested Answer</p>
                    <p className="text-gray-300 font-medium">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Questions Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-10 border border-slate-700">
          <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Behavioral Questions</span>
          </h2>
          <p className="text-gray-400 text-sm mb-6">Questions to understand your work style and approach</p>
          <div className="space-y-5">
            {report.behavioralQuestion.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg text-sm font-bold flex-shrink-0 shadow-lg">{index + 1}</span>
                  <h3 className="text-lg font-bold text-white leading-tight flex-1">{item.question}</h3>
                </div>
                <div className="ml-12 space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">💡 Intention</p>
                    <p className="text-gray-300 font-medium">{item.intention}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">✅ Suggested Answer</p>
                    <p className="text-gray-300 font-medium">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Gap Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-10 border border-slate-700">
          <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Skills Gap Analysis</span>
          </h2>
          <p className="text-gray-400 text-sm mb-6">Areas where you need improvement or growth</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.skillsGap.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-5 border border-slate-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <p className="font-bold text-white mb-3 text-lg">{item.skill}</p>
                <span className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg ${
                  item.severity.toLowerCase() === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/50' :
                  item.severity.toLowerCase() === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' :
                  'bg-green-500/20 text-green-300 border border-green-500/50'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    item.severity.toLowerCase() === 'high' ? 'bg-red-500' :
                    item.severity.toLowerCase() === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></span>
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Plan Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Preparation Plan</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8">Day-by-day roadmap to ace your interview</p>
          <div className="space-y-6">
            {report.preparationPlan.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-5">
                  <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg font-bold text-lg shadow-lg">{index + 1}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.day}</h3>
                    <p className="text-green-300 text-sm font-semibold">📍 {item.focus}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-600">
                  <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">✓ Tasks for Today</p>
                  <ul className="space-y-3">
                    {item.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 font-medium">
                        <span className="text-green-400 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                        <span className="flex-1 leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Report
