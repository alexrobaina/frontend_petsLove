import InputStore from 'stores/InputStore'

class Dashboard {
  constructor() {
    this.totalPetsAdopted = new InputStore()
    this.totalPetsForAdoption = new InputStore()
  }

  getJson() {
    return {
      totalPetsAdopted: this.totalPetsAdopted,
      totalPetsForAdoption: this.totalPetsForAdoption,
    }
  }

  // ============================================
  // Setters
  // ============================================

  setTotalPetsForAdoption(value) {
    this.totalPetsForAdoption.setValue(value)
  }

  setTotalPetsAdopted(value) {
    this.totalPetsAdopted.setValue(value)
  }
}

export default Dashboard
