import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { HeaderPage } from '../Header/HeaderPage'
import { Navbar } from '../Navbar/Navbar'
import { Preloader } from '../common/Paginator/Preloader'

import style from './Layout.module.css'

export const Layout = () => {
  return (
    <div className={'main-layout'}>
      <HeaderPage />
      <div className={style.container}>
        <div className={style.mainContainer}>
          <div className={style.navbar}>
            <Navbar />
          </div>
          <Suspense fallback={<Preloader />}>
            <div className={style.main}>
              <Outlet />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
