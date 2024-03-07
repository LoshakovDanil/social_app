import { lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { DispatchType } from './redux/store-redux'
import { initialize } from './redux/appReducer'
import { ProfileContainer } from './components/Profile/ProfileContainer'
import { Layout } from './components/layout/Layout'
import { TestPage } from './components/Test/TestPage'

import { path } from './constants/pages'

import './App.css'
const LoginFormPage = lazy(() => import('./components/Login/LoginFormPage'))
const DialogsPage = lazy(() => import('./components/Dialogs/DialogsPage'))
const UsersPage = lazy(() => import('./components/Users/UsersPage'))
const ChatPage = lazy(() => import('./components/Chat/ChatPage'))

export const Router = () => {
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Navigate to={path.profile} />} />
            <Route path={path.profile} element={<ProfileContainer />} />
            <Route path={`${path.profile}/:userid`} element={<ProfileContainer />} />
            <Route path={path.dialogs} element={<DialogsPage />} />
            <Route path={path.users} element={<UsersPage />} />
            <Route path={path.login} element={<LoginFormPage />} />
            <Route path={path.chat} element={<ChatPage />} />
            <Route path={path.test} element={<TestPage />} />
            <Route path="*" element={<div> unknown page </div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
