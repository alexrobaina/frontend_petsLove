import { useState, ReactNode, useEffect } from 'react'

import { BaseButton } from '../../components/BaseButton'

export interface ModalProps {
  title?: string
  styles?: string
  children?: ReactNode
  onClose?: () => void
  onSubmit: () => void
}

export const useSlider = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ModalProps>({
    children: null,
    onSubmit: () => {},
  })

  const openSlider = (props: ModalProps) => {
    setIsOpen(true)
    setModalProps(props)
  }

  const closeSlider = () => {
    setIsOpen(false)
    setModalProps({
      children: null,
      onSubmit: () => {},
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSlider()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const Slider = () => {
    return (
      <>
        <div
          onClick={closeSlider}
          className={`${
            isOpen
              ? 'fixed bg-black opacity-40 top-0 left-0 w-screen h-screen transition-opacity duration-1'
              : ''
          }`}
        />
        {isOpen && (
          <div
            className={`fixed right-0 w-[60%] bg-primary-50 h-full top-0 transform transition-transform duration-500`}
          >
            <div className="p-5">
              <h1 className="text-xl font-semibold ">{modalProps.title}</h1>
              <div className="mt-5">{modalProps.children}</div>
            </div>
            <div className="fixed p-4 gap-4  bottom-0 rigth-0 flex justify-end w-full transparent px-4 py-3 sm:flex sm:px-6">
              <BaseButton
                text="Cancel"
                type="secondary"
                onClick={closeSlider}
              />
              <BaseButton text="save" type="primary" onClick={closeSlider} />
            </div>
          </div>
        )}
      </>
    )
  }
  return {
    Slider,
    openSlider,
    closeSlider,
  }
}
