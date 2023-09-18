import { FC, ReactElement } from 'react'
import { motion } from 'framer-motion'
import { VARIANTS_OPACITY } from '../../constans/animations'

interface Props {
  children?: ReactElement
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.2 }}
      className='flex flex-col w-full h-full py-4 px-5'
    >
      {children}
    </motion.div>
  )
}

export default Layout
