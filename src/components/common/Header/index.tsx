import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconBack } from '../../../assets/icons'
import { BaseButton } from '../BaseButton'

interface Props {
  title?: string
  buttonBack?: boolean
}

export const Header: FC<Props> = ({ buttonBack, title }) => {
  const navigate = useNavigate()

  const goToBack = () => {
    navigate(-1)
  }
  return (
    <div className="flex gap-5 mt-1 items-center">
      {buttonBack && (
        <BaseButton
          className="w-9"
          onClick={goToBack}
          style="secondary"
          icon={<IconBack />}
        />
      )}
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  )
}
