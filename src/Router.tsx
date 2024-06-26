import { lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppDispatch } from './hook/hook'
import { Layout } from './components/layout/Layout'
import { ProfileContainer } from './components/Profile/ProfileContainer'
import { TestPage } from './components/Test/TestPage'
import { path } from './constants/pages'
import { initialize } from './redux-toolkit/appSlice'

import './App.css'

const LoginFormPage = lazy(() => import('./components/Login/LoginFormPage'))
const DialogsPage = lazy(() => import('./components/Dialogs/DialogsPage'))
const UsersPage = lazy(() => import('./components/Users/UsersPage'))
const ChatPage = lazy(() => import('./components/Chat/ChatPage'))
const NewsPage = lazy(() => import('./components/News/News'))

export const Router = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Navigate to={path.profile} />} />
          <Route path={path.profile} element={<ProfileContainer />} />
          <Route path={`${path.profile}/:userid`} element={<ProfileContainer />} />
          <Route path={path.login} element={<LoginFormPage />} />
          <Route path={path.dialogs} element={<DialogsPage />} />
          <Route path={path.users} element={<UsersPage />} />
          <Route path={path.chat} element={<ChatPage />} />
          <Route path={path.news} element={<NewsPage />} />
          <Route path={path.test} element={<TestPage />} />
          <Route path="*" element={<div> unknown page </div>} />
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </>
  )
}
