import { motion } from 'framer-motion'
import { useState, ReactNode, useEffect, FC } from 'react'

import { BaseButton } from '../../components/BaseButton'
import FadeIn from '../../components/FadeIn'
import { SLIDER_VARIANTS } from '../../constants/animations'

export interface ModalProps {
  title?: string
  styles?: string
  onClose?: () => void
  onSubmit: () => void
}

interface SliderProps {
  children?: ReactNode
}

export const useSlider = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalProps, setModalProps] = useState<ModalProps>({
    onSubmit: () => {},
  })

  const openSlider = (props: ModalProps) => {
    setIsOpen(true)
    setModalProps(props)
  }

  const closeSlider = () => {
    setIsOpen(false)
    setModalProps({
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

  return {
    Slider,
    openSlider,
    closeSlider,
  }
}

const Slider: FC<SliderProps> = ({ children = null }) => {
  return (
    <>
      <FadeIn>
        <div
          onClick={closeSlider}
          className={`${
            isOpen
              ? 'fixed bg-black opacity-40 top-0 left-0 w-screen h-screen transition-opacity duration-1 z-50'
              : ''
          }`}
        />
      </FadeIn>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            className={`fixed overflow-auto overflow-x-hidden right-0 w-[60%] bg-primary-50 h-full top-0  z-50 transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } t`}
            variants={SLIDER_VARIANTS}
            transition={{ ease: 'easeOut', delay: 0.1 }}
          >
            <div className="p-5">
              <h1 className="text-xl font-semibold ">{modalProps.title}</h1>
              {children && <div className="mt-5">{children}</div>}
              <div className="gap-4 mt-4 flex flex-row justify-en px-4 py-2 sm:flex sm:px-3 justify-end">
                <BaseButton
                  text="Cancel"
                  style="secondary"
                  onClick={closeSlider}
                />
                <BaseButton text="Save" style="primary" onClick={closeSlider} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
