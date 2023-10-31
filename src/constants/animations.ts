export const VARIANTS_OPACITY = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const SLIDER_VARIANTS = {
  hidden: { x: '100vw' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
}

export const ACCORDEON_VARIANTS = {
  hidden: {
    opacity: 0,
    height: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    x: -0,
    transition: { duration: 1, type: 'tween', ease: 'easeInOut' },
  },
}
