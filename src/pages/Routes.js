import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from "./Frontend"
import Authentaction from "./Authentaction"
import Dashboard from "./Dashboard"
import { useAuthContext } from '../context/AuthContext'
import PrivateRoute from '../component/PrivateRoute'

export default function Index() {
  const {isAuthentaction,isAdmin} =useAuthContext()
  return (
    <Routes>
      <Route path='/*'  element={<Frontend/>} />
      <Route path='auth/*'  element={!isAuthentaction ? <Authentaction/> : <Navigate to="/"/>} />
      <Route path='dashboard/*'  element={isAuthentaction && isAdmin ? <PrivateRoute Component={Dashboard}/>: <Navigate to="/"/> } />
    </Routes>
  )
}
