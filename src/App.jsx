import { useState } from 'react'
import UserList from './components/user/UserList'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserDetails from './components/user/UserDetails'
import LoginPage from './components/auth/LoginPage'
import ProtectedRoute from './components/utils/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <ProtectedRoute>
          <UserList />
        </ProtectedRoute>
    ),
  },
  {
    path: '/user/:userId',
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <LoginPage />
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
