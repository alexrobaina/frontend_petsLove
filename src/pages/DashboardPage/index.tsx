import { FC } from 'react'

import { BaseButton } from '../../components/BaseButton'
import { Header } from '../../components/Header'
import { useModal } from '../../hooks/useModal'
import { useSlider } from '../../hooks/useSlider'

export const DashboardPage: FC = () => {
  const { openModal, Modal } = useModal()
  const { openSlider, Slider } = useSlider()
  const handleDelete = () => {
    alert(1)
  }

  return (
    <>
      <header>
        <Header title="Dashboard" canBack />
      </header>
      <div>
        <BaseButton
          type="primary"
          text="Open Modal"
          onClick={() =>
            openModal({
              styles: '',
              type: 'delete',
              title: 'Modal Title',
              onSubmit: handleDelete,
            })
          }
        />
        <BaseButton
          type="primary"
          text="Open Slider"
          onClick={() =>
            openSlider({
              styles: '',
              title: 'Modal Title',
              onSubmit: handleDelete,
              children: <div>Slider Content</div>,
            })
          }
        />
        <Modal />
        <Slider />
      </div>
    </>
  )
}
