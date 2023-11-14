import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

import { SLIDER_VARIANTS } from '../../../constants/animations'
import FadeIn from '../../FadeIn'
import { BaseButton } from '../BaseButton'

interface Props {
  title?: string
  isOpen: boolean
  children?: ReactNode
  closeSlider: () => void
  handleSubmit?: () => void
}

export const SliderModal: FC<Props> = ({
  title,
  isOpen,
  closeSlider,
  handleSubmit,
  children = null,
}) => {
  return (
    <>
      {isOpen && (
        <FadeIn>
          <div
            onClick={closeSlider}
            className={`fixed bg-black opacity-40 top-0 left-0 w-screen h-screen transition-opacity duration-1 z-40`}
          />
        </FadeIn>
      )}
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            className={`fixed overflow-auto overflow-x-hidden right-0 w-[60%] bg-primary-50 h-full top-0 z-40 transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } t`}
            variants={SLIDER_VARIANTS}
            transition={{ ease: 'easeOut', delay: 0.1 }}
          >
            <div className="px-5">
              <h1 className="text-xl font-semibold ">{title}</h1>
              {children && <div className="mt-5">{children}</div>}
              <div
                className="
               flex gap-4 justify-end py-14 bg-primary-50
            "
              >
                <BaseButton
                  text="Cancel"
                  style="secondary"
                  onClick={closeSlider}
                />
                <BaseButton
                  text="Save"
                  style="primary"
                  onClick={() => {
                    handleSubmit && handleSubmit()
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
