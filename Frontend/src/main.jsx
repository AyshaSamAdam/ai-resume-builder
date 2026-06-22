
import { createRoot } from 'react-dom/client'

import './index.css'



import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
  {/*  parent hamara show hota hai not childeren so we have to {children in context file} */}

  <AuthProvider>
       <App />
  </AuthProvider>
 
  </>
)
