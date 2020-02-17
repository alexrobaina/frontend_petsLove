import { observable, action, runInAction } from 'mobx'

class SearchMapStore {
  @observable search = ''
  @observable lat: -34.61315
  @observable lng: -58.37723

  @action
  setSearch(value) {
    this.search = value
  }
}

export default SearchMapStore
