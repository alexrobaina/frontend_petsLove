import { observable, action } from 'mobx'

class SearchMapStore {
  @observable search = ''
  @observable location = []

  @action
  setSearch(value) {
    this.search = value
  }

  @action
  setResultSearchMap(results) {
    this.location = results
  }
}

export default SearchMapStore
