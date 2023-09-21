import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconBack } from '../../assets/icons'
import { BaseButton } from '../BaseButton'

interface Props {
  title: string
  canBack?: boolean
}

export const Header: FC<Props> = ({ canBack, title }) => {
  const navigate = useNavigate()

  const goToBack = () => {
    navigate('back')
  }
  return (
    <div className="flex gap-5">
      {canBack && (
        <BaseButton onClick={goToBack} type="secondary" icon={<IconBack />} />
      )}
      <h1 className="text-xl md:text-xl lg:text-3xl font-semibold">{title}</h1>
    </div>
  )
}
