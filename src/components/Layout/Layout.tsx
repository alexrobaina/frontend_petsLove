import { motion } from 'framer-motion'
import { FC, ReactElement } from 'react'

import { VARIANTS_OPACITY } from '../../constants/animations'

interface Props {
  children?: ReactElement
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.2 }}
      className="flex flex-col w-full h-full py-20 pl-0 pr-0 sm:py-2 sm:pl-6 sm:pr-8"
    >
      {children}
    </motion.div>
  )
}

export default Layout
