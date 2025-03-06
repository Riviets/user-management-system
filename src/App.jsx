import { useState } from 'react'
import UserList from './components/UserList'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserDetails from './components/UserDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserList />,
  },
  {
    path: '/user/:userId',
    element: <UserDetails />,
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
