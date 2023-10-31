import { FC, ReactElement, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Import Framer Motion components
import { ACCORDEON_VARIANTS } from '../../constants/animations'

interface Props {
  title: string
  children: ReactElement
  icon: ReactElement
}

export const BaseAccordeon: FC<Props> = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="w-full p-2 mt-6 rounded shadow ring ring-primary-100 hover:ring-primary-200">
      <div
        className={
          isOpen
            ? 'flex items-center justify-between cursor-pointer p-2 text-primary-950 rounded bg-primary-100'
            : 'flex items-center justify-between cursor-pointer p-2 text-primary-950 rounded'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 ">
          {icon}
          <h4
            className={
              isOpen
                ? 'text-xs md:text-sm font-bold leading-6 text-primary-300'
                : 'text-xs md:text-sm font-bold leading-6 text-primary-950'
            }
          >
            {title}
          </h4>
        </div>
        <motion.svg
          className="w-3 h-3  shrink-0"
          initial={false}
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke={isOpen ? '#369683' : '#29786a'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9 5 5 1 1 5"
          />
        </motion.svg>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ACCORDEON_VARIANTS}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
