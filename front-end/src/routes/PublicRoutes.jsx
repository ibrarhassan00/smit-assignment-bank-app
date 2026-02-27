import {Navigate,Outlet} from "react-router-dom"

import React from 'react'

const PublicRoutes = () => {
  return (
    !localStorage.getItem("token")  ?<Outlet /> : <Navigate to={"/"}/>
  )
}

export default PublicRoutes
