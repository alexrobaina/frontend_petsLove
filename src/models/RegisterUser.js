import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

class RegisterUser {
  @observable terms = true

  constructor() {
    this.name = new InputStore()
    this.email = new InputStore()
    this.password = new InputStore()
    this.rol = new InputStore()
    this.username = new InputStore()
    this.phone = new InputStore()
  }

  getJson() {
    return {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      rol: this.rol.value,
      username: this.username.value,
      phone: this.phone.value,
      terms: this.terms,
    }
  }
}

export default RegisterUser
