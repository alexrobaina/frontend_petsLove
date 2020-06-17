import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

class RegisterUser {
  @observable terms = true

  constructor() {
    this.email = new InputStore()
    this.password = new InputStore()
    this.role = new InputStore()
    this.username = new InputStore()
    this.firstname = new InputStore()
    this.lastname = new InputStore()
    this.phone = new InputStore()
  }

  getJson() {
    return {
      firstname: this.lastname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
      username: this.username.value,
      phone: this.phone.value,
      terms: this.terms,
    }
  }
}

export default RegisterUser
