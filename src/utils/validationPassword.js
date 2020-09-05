const ERROR = 'Your password need 8 letters'
const PASSWORD_MATCH = 'The password need match'

export const validationPassword = password => {
  // Validate length
  if (password.value.length >= 8) {
    password.setError(false, '')
    return false
  }
  password.setError(true, ERROR)
  return true
}

export const validationPasswordMatch = (password, passwordConfirm) => {
  // Validate length
  if (password.value === passwordConfirm.value) {
    password.setError(false, '')
    return false
  }
  password.setError(true, PASSWORD_MATCH)
  return true
}
