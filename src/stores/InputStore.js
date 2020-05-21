import { observable, action } from 'mobx'

class InputStore {
  @observable error = false
  @observable value = ''
  @observable errorMessage = ''

  @action
  setError(error, errorMessage = '') {
    this.error = error
    this.errorMessage = errorMessage
  }

  @action
  setValue(value) {
    this.value = value

    this.clearError()
  }

  @action
  clearError() {
    this.error = false
    this.errorMessage = ''
  }
}

export default InputStore
