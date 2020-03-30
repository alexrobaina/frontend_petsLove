import AuthStore from 'stores/AuthStore'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this)
    this.optionsSelectsStore = new OptionsSelectsStore()
    this.searchPetsStore = new SearchPetsStore()
  }
}

export default RootStore
