import { observable, action, runInAction } from 'mobx'

class SearchMapStore {
  @observable search = ''
  // @observable lat = undefined
  // @observable lng = undefined
  @observable location = {
    lat: undefined,
    lng: undefined,
  }

  @action
  setSearch(value) {
    this.search = value
  }

  @action
  setLat(value) {
    console.log('lat', value)
    this.location.lat = value
  }

  @action
  setLng(value) {
    console.log('lng', value)
    this.location.lng = value
  }
}

export default SearchMapStore
