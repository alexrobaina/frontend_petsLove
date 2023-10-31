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
  const [modalProps, setModalProps]: any = useState<ModalProps>({
    children: null,
    onSubmit: () => {},
  })

  const openModal = (props: ModalProps) => {
    setIsOpen(true)
    setModalProps(props)
  }

  const closeModal = () => {
    setIsOpen(false)
    // setModalProps({
    //   children: null,
    //   onSubmit: () => {},
    // })
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

  return {
    openModal,
    closeModal,
    modalProps,
    isOpen,
  }
}

export const Modal = (props) => {
  console.log('props', props)

  if (!props.isOpen) return null

  if (props.type === MODAL_TYPE.DELETE) {
    return (
      <Delete
        isOpen={props.isOpen}
        closeModal={props.closeModal}
        title={props.title}
        onSubmit={props.onSubmit}
        description={props.description}
      />
    )
  }

  return (
    <Save
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      title={props.title}
      children={props.children}
      onSubmit={props.onSubmit}
      description={props.description}
      canClose={props.canClose}
      isDisabled={props.isDisabled || false}
    />
  )
}
