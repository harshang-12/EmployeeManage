import React from 'react'
import Profile from './components/UserProfile/Profile'
import { Outlet } from 'react-router-dom'

function Layout1() {
  return (
    <div>
      <Profile/>
      <Outlet/>
    </div>
  )
}

export default Layout1
