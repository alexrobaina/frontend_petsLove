import { observable } from 'mobx'
import moment from 'moment'
import InputStore from 'stores/InputStore'

class MedicalInformationDog {
  @observable isCastrated = false
  @observable rabiesVaccine = false
  @observable distemperVaccine = false
  @observable hepatitisVaccine = false
  @observable leptospirosisVaccine = false
  @observable parvovirusVaccine = false
  @observable parainfluenzaVaccine = false
  @observable bordetellaBronchisepticVaccine = false

  constructor(id) {
    this._id = id
    this.notes = new InputStore()
    this.vet = new InputStore()
    this.lastVisitVet = new InputStore()

    this.vet.setValue(null)
  }

  fillJson(medicalDog) {
    this._id = medicalDog._id
    this.lastVisitVet.setValue(medicalDog.lastVisitVet)
    this.vet.setValue(medicalDog.vet)
    this.isCastrated = medicalDog.isCastrated
    this.rabiesVaccine = medicalDog.rabiesVaccine
    this.distemperVaccine = medicalDog.distemperVaccine
    this.hepatitisVaccine = medicalDog.hepatitisVaccine
    this.leptospirosisVaccine = medicalDog.leptospirosisVaccine
    this.parvovirusVaccine = medicalDog.parvovirusVaccine
    this.parainfluenzaVaccine = medicalDog.parainfluenzaVaccine
    this.bordetellaBronchisepticVaccine = medicalDog.bordetellaBronchisepticVaccine
    this.notes.setValue(medicalDog.notes)
  }

  getJson() {
    return {
      _id: this._id,
      vet: this.vet.value,
      lastVisitVet: this.lastVisitVet.value,
      isCastrated: this.isCastrated,
      rabiesVaccine: this.rabiesVaccine,
      distemperVaccine: this.distemperVaccine,
      hepatitisVaccine: this.hepatitisVaccine,
      leptospirosisVaccine: this.leptospirosisVaccine,
      parvovirusVaccine: this.parvovirusVaccine,
      parainfluenzaVaccine: this.parainfluenzaVaccine,
      bordetellaBronchisepticVaccine: this.bordetellaBronchisepticVaccine,
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

  setIsCastrated() {
    this.isCastrated = !this.isCastrated
  }

  setRabiesVaccine() {
    this.rabiesVaccine = !this.rabiesVaccine
  }

  setDistemperVaccine() {
    this.distemperVaccine = !this.distemperVaccine
  }

  setHepatitisVaccine() {
    this.hepatitisVaccine = !this.hepatitisVaccine
  }

  setLeptospirosisVaccine() {
    this.leptospirosisVaccine = !this.leptospirosisVaccine
  }

  setParvovirusVaccine() {
    this.parvovirusVaccine = !this.parvovirusVaccine
  }

  setParainfluenzaVaccine() {
    this.parainfluenzaVaccine = !this.parainfluenzaVaccine
  }

  setBordetellaBronchisepticVaccine() {
    this.bordetellaBronchisepticVaccine = !this.bordetellaBronchisepticVaccine
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

  get getIsCastrated() {
    return this.isCastrated
  }

  get getRabiesVaccine() {
    return this.rabiesVaccine
  }

  get getDistemperVaccine() {
    return this.distemperVaccine
  }

  get getHepatitisVaccine() {
    return this.hepatitisVaccine
  }

  get getLeptospirosisVaccine() {
    return this.leptospirosisVaccine
  }

  get getParvovirusVaccine() {
    return this.parvovirusVaccine
  }

  get getParainfluenzaVaccine() {
    return this.parainfluenzaVaccine
  }

  get getBordetellaBronchisepticVaccine() {
    return this.bordetellaBronchisepticVaccine
  }

  get getNotes() {
    return this.notes.value
  }
}

export default MedicalInformationDog
