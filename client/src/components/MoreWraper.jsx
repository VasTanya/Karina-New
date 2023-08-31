import React from 'react'
import { Outlet } from 'react-router-dom'

function MoreWraper() {
  return (
    <>{<Outlet/>}</>
  )
}

export default MoreWraper