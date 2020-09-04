import InputStore from 'stores/InputStore'

class Dashboard {
  constructor() {
    this.totalPetsAdopted = new InputStore()
    this.totalPetsAdopter = new InputStore()
    this.totalPetsForAdoption = new InputStore()
    this.totalVolunteersPetsOwner = new InputStore()
    this.totalVolunteersPetsCare = new InputStore()
    this.totalPetsVeterinaryCared = new InputStore()
  }

  getJson() {
    return {
      totalPetsAdopter: this.totalPetsAdopter,
      totalPetsAdopted: this.totalPetsAdopted,
      totalPetsForAdoption: this.totalPetsForAdoption,
      totalVolunteersPetsCare: this.totalVolunteersPetsCare,
      totalVolunteersPetsOwner: this.totalVolunteersPetsOwner,
      totalPetsVeterinaryCared: this.totalPetsVeterinaryCared,
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

  setTotalVolunteersPetsOwner(value) {
    this.totalVolunteersPetsOwner.setValue(value)
  }

  setTotalVolunteersPetsCare(value) {
    this.totalVolunteersPetsCare.setValue(value)
  }

  setTotalVeterinaryCared(value) {
    this.totalPetsVeterinaryCared.setValue(value)
  }

  setTotalPetsAdopter(value) {
    this.totalPetsAdopter.setValue(value)
  }
}

export default Dashboard
