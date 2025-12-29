import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home.jsx'
import Dashboard from './Components/Dashboard.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            }/>
        </Routes>
    </>
  )
}

export default App
