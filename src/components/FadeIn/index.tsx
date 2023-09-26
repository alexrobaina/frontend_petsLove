import { motion } from 'framer-motion'
import { FC, ReactElement } from 'react'

interface Props {
  className?: string
  children?: ReactElement
}

const FadeIn: FC<Props> = ({ children, className }) => {
  const VARIANTS_OPACITY = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
