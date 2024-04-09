import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { IconSvg } from '../common/IconSvg/IconSvg'
import jsonData from '../../data/data.json'

import style from './Navbar.module.css'

export const Navbar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const params = useLocation()

  useEffect(() => {
    if (params.pathname === '/profile' || params.pathname === '/dialogs' || params.pathname === '/users') {
      setExpandedItem(prevItem => (prevItem === 'Main' ? 'Main' : 'Main'))
    } else if (params.pathname === '/photos' || params.pathname === '/news' || params.pathname === '/settings') {
      setExpandedItem(prevItem => (prevItem === 'Developer' ? 'Developer' : 'Developer'))
    }
  }, [params])

  const handleToggle = (itemName: string) => {
    setExpandedItem(prevItem => (prevItem === itemName ? null : itemName))
  }

  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? style.active : '')

  return (
    <div className={'navbar'}>
      {jsonData.map(({ name, icon, list, path }) =>
        path ? (
          <div key={name} className={`${style.navList} ${style.clickable} ${style.hoverEffect}`}>
            <NavLink to={path} className={setActive}>
              {icon && <IconSvg id={icon} />}
              <span>
                {name} {/* chat test*/}
              </span>
            </NavLink>
          </div>
        ) : (
          <div key={name} className={`${style.navList} ${style.clickable}`}>
            {
              <>
                <div className={`${style.navListItem} ${style.hoverEffect}`} onClick={() => handleToggle(name)}>
                  {icon && <IconSvg id={icon} />}
                  <span className={style.clickable}>
                    {name} {/* main + developer*/}
                  </span>
                </div>

                {expandedItem === name &&
                  list?.map(({ name, path }) => (
                    <div key={name} className={`${style.navListItem} ${style.hoverEffect}`}>
                      <NavLink to={path} className={setActive}>
                        {name} {/* photos + dialogs + profile*/}
                      </NavLink>
                    </div>
                  ))}
              </>
            }
          </div>
        ),
      )}
    </div>
  )
}
