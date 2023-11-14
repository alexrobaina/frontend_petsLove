import { motion } from 'framer-motion' // Import Framer Motion components
import { FC, ReactElement, useState } from 'react'

import './styles.css'

interface Props {
  title: string
  children: ReactElement
  icon: ReactElement
}

export const BaseAccordeon: FC<Props> = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="bg-primary-50 w-full p-2  mt-6 rounded shadow ring-primary-200 ring-1 hover:ring-primary-200">
      <div
        className={
          isOpen
            ? 'flex items-center justify-between cursor-pointer p-2 text-primary-950 rounded bg-primary-100'
            : 'flex items-center justify-between cursor-pointer p-2 text-primary-950 rounded'
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="w-[50px] iconTitle">{icon}</div>
          <h4 className="text-xs md:text-sm font-bold leading-6 text-primary-950">
            {title}
          </h4>
        </div>
        <motion.svg
          className="w-3 h-3 shrink-0 mr-4 "
          initial={false}
          animate={isOpen ? { rotate: 0 } : { rotate: 180 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke={isOpen ? '#369683' : '#29786a'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </motion.svg>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  )
}
