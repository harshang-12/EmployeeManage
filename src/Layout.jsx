import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'


function Layout() {
  return (
    <div>
        <Navigation/>
        <Outlet/>
    </div>
  )
}

export default Layout
