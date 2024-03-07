import { FC } from 'react'

import sprite from '../../../assets/images/sprite.svg'

interface IPropsSvg {
  id: string
  className?: string
}

export const IconSvg: FC<IPropsSvg> = ({ id, className }) => {
  return (
    <svg className={`icon + ${className}`}>
      <use href={sprite + id} />
    </svg>
  )
}
