import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

const UsekeyPress = ({ handleEnter, keyUserPress }) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const useKeyPress = targetKey => {
    // State for keeping track of whether key is pressed

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    // Add event listeners
    useEffect(() => {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return keyPressed
  }

  const keyPress = useKeyPress(keyUserPress)

  useEffect(() => {
    if (keyPressed) {
      handleEnter()
    }
  }, [keyPressed])

  return keyPress
}

UsekeyPress.propTypes = {
  handleEnter: PropTypes.func.isRequired,
  keyUserPress: PropTypes.string.isRequired,
}

export default observer(UsekeyPress)
