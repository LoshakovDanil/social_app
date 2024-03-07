import { useEffect, useState } from 'react'

import { Button } from '../Button/Button'

import s from './Paginator.module.css'

type Props = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  portionSize?: number
  onPageChanged: (page: number) => void
}

const Paginator: React.FC<Props> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
  const totalUsersPages = Math.ceil(totalUsersCount / pageSize)
  const pages = Array.from({ length: totalUsersPages }, (_, index) => index + 1)

  const [currentPortion, setCurrentPortion] = useState(1)
  const leftBorderPortion = (currentPortion - 1) * portionSize + 1
  const rightBorderPortion = currentPortion * portionSize

  useEffect(() => {
    setCurrentPortion(Math.ceil(currentPage / portionSize))
  }, [currentPage, portionSize])

  const portionPages = pages.slice(leftBorderPortion - 1, rightBorderPortion)

  return (
    <div>
      {leftBorderPortion > 1 && (
        <Button
          onClick={() => {
            setCurrentPortion(currentPortion - 1)
          }}
        >
          Prev
        </Button>
      )}
      {portionPages.map(p => {
        return (
          <span
            style={{ padding: 2 }}
            key={p}
            onClick={() => {
              onPageChanged(p)
            }}
            className={p === currentPage ? s.selected : undefined}
          >
            {p}
          </span>
        )
      })}
      {rightBorderPortion < totalUsersPages && (
        <Button
          onClick={() => {
            setCurrentPortion(currentPortion + 1)
          }}
        >
          Next
        </Button>
      )}
    </div>
  )
}

export default Paginator
