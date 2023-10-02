import { useState, ReactNode, useEffect } from 'react'

import { Delete } from './components/Delete'
import { Save } from './components/Save'

const MODAL_TYPE = {
  DELETE: 'delete',
  SAVE: 'save',
  ALERT: 'alert',
}

export interface ModalProps {
  title?: string
  styles?: string
  isDisabled?: boolean
  description?: string
  children?: ReactNode
  onClose?: () => void
  onSubmit: () => void
  canClose?: boolean // default true
  type?: 'delete' | 'save' | 'alert'
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ModalProps>({
    children: null,
    onSubmit: () => {},
  })

  const openModal = (props: ModalProps) => {
    setIsOpen(true)
    setModalProps(props)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalProps({
      children: null,
      onSubmit: () => {},
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const Modal = () => {
    if (modalProps.type === MODAL_TYPE.DELETE) {
      return (
        <Delete
          isOpen={isOpen}
          closeModal={closeModal}
          onSubmit={modalProps.onSubmit}
        />
      )
    }

    return (
      <Save
        isOpen={isOpen}
        closeModal={closeModal}
        title={modalProps.title}
        children={modalProps.children}
        onSubmit={modalProps.onSubmit}
        description={modalProps.description}
        canClose={modalProps.canClose}
        isDisabled={modalProps.isDisabled || false}
      />
    )
  }

  return {
    Modal,
    openModal,
    closeModal,
  }
}
