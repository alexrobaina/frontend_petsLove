const ERROR = 'Your password need 8 letters'

const validationPassword = password => {
  // Validate length
  if (password.value.length >= 8) {
    password.setError(false, '')
    return false
  }
  password.setError(true, ERROR)
  return true
}

export default validationPassword
