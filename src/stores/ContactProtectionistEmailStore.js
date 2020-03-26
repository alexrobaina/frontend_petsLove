import { action, observable, runInAction } from 'mobx'
import EmailServices from 'services/EmailServices'
import { SERVER } from 'services/config'

class ContactProtectionistEmailStore {
  constructor() {
    this.emailServices = new EmailServices()
  }

  @observable isSuccess = false
  @observable isloading = false
  @observable isError = false
  @observable name = ''
  @observable petName = ''
  @observable images = []
  @observable phone = ''
  @observable email = ''
  @observable message = ''
  @observable emailUser = ''
  @observable errorEmail = false
  @observable errorName = false
  @observable errorMessage = false
  @observable errorPhone = false
  @observable isDirty = false

  @action
  validate() {
    // eslint-disable-next-line no-useless-escape
    const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (emailTest.test(this.email)) {
      this.isDirty = true
      this.errorEmail = false
    } else {
      this.errorEmail = true
    }

    if (this.phone > 0) {
      this.isDirty = true
      this.errorPhone = false
    } else {
      this.errorPhone = true
      this.isDirty = false
    }

    if (this.message !== '') {
      this.isDirty = true
      this.errorMessage = false
    } else {
      this.errorMessage = true
      this.isDirty = false
    }

    if (this.name !== '') {
      this.isDirty = true
      this.errorName = false
    } else {
      this.errorName = true
      this.isDirty = false
    }
  }

  @action
  async contactProtectionist() {
    this.isloading = true
    this.isSuccess = false

    const data = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
      emailUser: this.emailUser,
      image: `${SERVER}/${this.images[0]}`,
      petName: this.petName,
    }

    try {
      await this.emailServices.contactProtectionist(data)

      runInAction(() => {
        this.isSuccess = true
        this.isloading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isSuccess = false
        console.log(e)
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

  @action
  setUserEmail(value) {
    this.emailUser = value
  }

  @action
  setImage(value) {
    this.images = value
  }

  @action
  setPetName(value) {
    this.petName = value
  }
}

export default ContactProtectionistEmailStore
