export const toggleBodyScroll = (isModalOpen: boolean) => {
  if (isModalOpen) return (document.body.style.overflow = 'hidden')
  document.body.style.overflow = ''
}
