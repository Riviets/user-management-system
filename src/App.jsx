import { useState } from 'react'
import UserList from './components/user/UserList'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserDetails from './components/user/UserDetails'
import LoginPage from './components/auth/LoginPage'
import ProtectedRoute from './components/utils/ProtectedRoute'
import AddUser from './components/user/AddUser'
import EditUser from './components/user/EditUser'
import './index.css'

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
  },
  {
    path: '/user/add',
    element: (
      <ProtectedRoute>
        <AddUser />
      </ProtectedRoute>
    )
  },
  {
    path: 'user/edit/:id',
    element: (
      <ProtectedRoute>
        <EditUser />
      </ProtectedRoute>
    )
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
