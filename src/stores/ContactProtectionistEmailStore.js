import { action, observable, runInAction } from 'mobx'
import EmailServices from '../services/EmailServices'

class ContactProtectionistEmailStore {
  constructor() {
    this.emailServices = new EmailServices()
  }

  @observable successful = false
  @observable isloading = false
  @observable isError = false
  @observable name = ''
  @observable phone = ''
  @observable email = ''
  @observable message = ''

  @action
  async contactProtectionist() {
    this.isloading = true

    const data = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
    }

    try {
      await this.emailServices.contactProtectionist(data)

      runInAction(() => {
        this.isloading = false
        this.successful = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.isError = true
      })
    }
  }

  @action
  setName(value) {
    this.name = value
  }

  @action
  setEmail(value) {
    this.email = value
  }

  @action
  setPhone(value) {
    this.phone = value
  }

  @action
  setMessage(value) {
    this.message = value
  }
}

export default ContactProtectionistEmailStore
