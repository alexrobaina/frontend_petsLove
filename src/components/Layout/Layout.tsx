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
      className="flex flex-col w-full h-full py-2 pl-3 md:pl-6 md:pr-8"
    >
      {children}
    </motion.div>
  )
}

export default Layout
