import { useEffect, useState } from 'react'

const useScreenWidth = (maxWidth: number): boolean => {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < maxWidth)
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [maxWidth])

  return isScreenSmall
}

export default useScreenWidth
