import { useState } from 'react'
import Login from './components/Login'
import Admin from './components/Admin'
import {RouterProvider} from 'react-router-dom'
import router from './components/Routes/Router.jsx'
function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
