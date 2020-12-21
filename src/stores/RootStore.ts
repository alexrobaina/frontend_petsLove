import SearchPetStore from 'stores/SearchPetStore';

interface IRootStore {
  searchPetStore: SearchPetStore;
}

class RootStore implements IRootStore {
  searchPetStore;

  constructor() {
    this.searchPetStore = new SearchPetStore();
  }
}

export default RootStore;
