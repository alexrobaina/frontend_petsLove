import { motion } from 'framer-motion' // Import Framer Motion components
import { FC, ReactElement, useState } from 'react'

import './styles.css'
import { IconEdit, IconTrash } from '../../../assets/icons'
import { BaseButton } from '../BaseButton'

interface Props {
  title: string
  icon: ReactElement
  children: ReactElement
  handleEdit: () => void
  handleDelete: () => void
}

export const BaseAccordeon: FC<Props> = ({
  icon,
  title,
  children,
  handleEdit,
  handleDelete,
}) => {
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
          <h4 className="text-xs md:text-sm font-bold leading-6 text-primary-950 ">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-5">
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
          <div className="flex gap-2">
            <BaseButton
              style="secondary"
              icon={<IconEdit />}
              onClick={(e) => {
                e.stopPropagation()
                handleEdit()
              }}
            />
            <BaseButton
              style="secondary"
              icon={<IconTrash />}
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
            />
          </div>
        </div>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  )
}
