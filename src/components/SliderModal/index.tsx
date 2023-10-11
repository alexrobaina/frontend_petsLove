import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

import { SLIDER_VARIANTS } from '../../constants/animations'
import { BaseButton } from '../BaseButton'
import FadeIn from '../FadeIn'

interface Props {
  title?: string
  isOpen: boolean
  children?: ReactNode
  onSubmit?: () => void
  closeSlider: () => void
}

export const SliderModal: FC<Props> = ({
  title,
  isOpen,
  onSubmit,
  closeSlider,
  children = null,
}) => {
  return (
    <>
      {isOpen && (
        <FadeIn>
          <div
            onClick={closeSlider}
            className={`fixed bg-black opacity-40 top-0 left-0 w-screen h-screen transition-opacity duration-1 z-50`}
          />
        </FadeIn>
      )}
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
              <h1 className="text-xl font-semibold ">{title}</h1>
              {children && <div className="mt-5">{children}</div>}
              <div className="gap-4 mt-4 flex flex-row justify-en px-4 py-2 sm:flex sm:px-3 justify-end">
                <BaseButton
                  text="Cancel"
                  style="secondary"
                  onClick={closeSlider}
                />
                <BaseButton
                  text="Save"
                  style="primary"
                  onClick={() => {
                    onSubmit && onSubmit()
                    closeSlider()
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
