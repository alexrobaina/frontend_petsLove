import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'
import { useModal } from '../../../../hooks/useModal'
import { useSlider } from '../../../../hooks/useSlider'

export const Modals: FC = () => {
  const { openModal, Modal } = useModal()
  const { openSlider, Slider } = useSlider()
  const handleSlider = () => {
    alert('handleSlider')
  }
  const handleDelete = () => {
    alert('handleDelete')
  }
  const handleSave = () => {
    alert('handleSave')
  }
  return (
    <>
      <div className="mt-8 flex gap-4 ">
        <div>
          <h1>Delete modal</h1>
          <BaseButton
            type="primary"
            text="Delete"
            onClick={() =>
              openModal({
                styles: '',
                type: 'delete',
                title: 'Modal Title',
                onSubmit: handleDelete,
              })
            }
          />
        </div>
        <div>
          <h1>Save modal</h1>
          <BaseButton
            type="primary"
            text="Open save"
            onClick={() =>
              openModal({
                styles: '',
                type: 'save',
                title: 'Modal Save',
                onSubmit: handleSave,
                children: <div className="w-[500px]">forms</div>,
              })
            }
          />
        </div>
      </div>
      <div className="mt-8 gap-5">
        <h1>Slider modal</h1>
        <div className="flex gap-2 mt-3 flex-wrap">
          <BaseButton
            type="primary"
            text="Open Slider"
            onClick={() =>
              openSlider({
                styles: '',
                title: 'Modal Slider',
                onSubmit: handleSlider,
                children: <div>Slider Content</div>,
              })
            }
          />
        </div>
      </div>
      <Modal />
      <Slider />
    </>
  )
}
