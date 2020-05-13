import { action } from 'mobx'

class RegisterUser {
  constructor(name, email, password, rol, username, phone, terms) {
    this.name = name
    this.email = email
    this.password = password
    this.rol = rol
    this.username = username
    this.phone = phone
    this.terms = terms
  }

  getJson() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      rol: this.rol,
      username: this.username,
      phone: this.phone,
      terms: this.terms,
    }
  }

  static fromJson(json) {
    const registerUser = new RegisterUser()

    registerUser.fillFromJson(json)

    return registerUser
  }

  @action
  fillFromJson({ name, email, password, rol, username, phone, terms }) {
    this.name = name
    this.email = email
    this.password = password
    this.rol = rol
    this.username = username
    this.phone = phone
    this.terms = terms
  }
}

export default RegisterUser
