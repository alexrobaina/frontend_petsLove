import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

class MedicalInformationCat {
  @observable isCastrated = false
  @observable distemperVaccine = false
  @observable felineFluVaccine = false
  @observable felineLeukemiaVaccine = false
  @observable felineInfectiousPeritonitisVaccine = false
  @observable distemperVaccine = false
  @observable rabiesVaccine = false

  constructor(id) {
    this._id = id
    this.notes = new InputStore()
    this.vet = new InputStore()
    this.lastVisitVet = new InputStore()

    this.vet.setValue(null)
  }

  fillJson(medicalCat) {
    this._id = medicalCat._id
    this.lastVisitVet.setValue(medicalCat.lastVisitVet)
    this.vet.setValue(medicalCat.vet)
    this.distemperVaccine = medicalCat.distemperVaccine
    this.rabiesVaccine = medicalCat.rabiesVaccine
    this.isCastrated = medicalCat.isCastrated
    this.felineFluVaccine = medicalCat.felineFluVaccine
    this.felineLeukemiaVaccine = medicalCat.felineLeukemiaVaccine
    this.felineInfectiousPeritonitisVaccine = medicalCat.felineInfectiousPeritonitisVaccine
    this.notes.setValue(medicalCat.notes)
  }

  getJson() {
    return {
      _id: this._id,
      vet: this.vet.value,
      lastVisitVet: this.lastVisitVet.value,
      distemperVaccine: this.distemperVaccine,
      rabiesVaccine: this.rabiesVaccine,
      isCastrated: this.isCastrated,
      felineFluVaccine: this.felineFluVaccine,
      felineLeukemiaVaccine: this.felineLeukemiaVaccine,
      felineInfectiousPeritonitisVaccine: this.felineInfectiousPeritonitisVaccine,
      notes: this.notes.value,
    }
  }

  // ============================================
  // Setters
  // ============================================

  setVet(value) {
    this.vet.setValue(value)
  }

  setLastVisitVet(value) {
    this.lastVisitVet.setValue(value)
  }

  setDistemperVaccine() {
    this.distemperVaccine = !this.distemperVaccine
  }

  setIsCastrated() {
    this.isCastrated = !this.isCastrated
  }

  setRabiesVaccine() {
    this.rabiesVaccine = !this.rabiesVaccine
  }

  setFelineFluVaccine() {
    this.felineFluVaccine = !this.felineFluVaccine
  }

  setFelineLeukemiaVaccine() {
    this.felineLeukemiaVaccine = !this.felineLeukemiaVaccine
  }
  setFelineInfectiousPeritonitisVaccine() {
    this.felineInfectiousPeritonitisVaccine = !this.felineInfectiousPeritonitisVaccine
  }

  setNotes(value) {
    this.notes.setValue(value)
  }

  // ============================================
  // Getters
  // ============================================

  get getVet() {
    return this.vet.value
  }

  get getLastVisitVet() {
    return this.lastVisitVet.value
  }

  get getDistemperVaccine() {
    return this.distemperVaccine
  }

  get getIsCastrated() {
    return this.isCastrated
  }

  get getRabiesVaccine() {
    return this.rabiesVaccine
  }

  get getFelineFluVaccine() {
    return this.felineFluVaccine
  }

  get getFelineLeukemiaVaccine() {
    return this.felineLeukemiaVaccine
  }

  get getFelineInfectiousPeritonitisVaccine() {
    return this.felineInfectiousPeritonitisVaccine
  }

  get getNotes() {
    return this.notes.value
  }
}

export default MedicalInformationCat
