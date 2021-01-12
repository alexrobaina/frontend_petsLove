import { makeAutoObservable } from 'mobx';

class MedicalInformationDog {
  _id = '';
  vet = '';
  notes = '';
  userVetId = '';
  lastVisitVet = '';
  isCastrated = false;
  rabiesVaccine = false;
  distemperVaccine = false;
  hepatitisVaccine = false;
  parvovirusVaccine = false;
  leptospirosisVaccine = false;
  parainfluenzaVaccine = false;
  bordetellaBronchisepticVaccine = false;

  constructor(id) {
    this._id = id;

    makeAutoObservable(this);
  }

  fillJson(medicalDog) {
    this._id = medicalDog._id;
    this.vet = medicalDog.vet;
    this.notes = medicalDog.notes;
    this.isCastrated = medicalDog.isCastrated;
    this.lastVisitVet = medicalDog.lastVisitVet;
    this.rabiesVaccine = medicalDog.rabiesVaccine;
    this.distemperVaccine = medicalDog.distemperVaccine;
    this.hepatitisVaccine = medicalDog.hepatitisVaccine;
    this.parvovirusVaccine = medicalDog.parvovirusVaccine;
    this.leptospirosisVaccine = medicalDog.leptospirosisVaccine;
    this.parainfluenzaVaccine = medicalDog.parainfluenzaVaccine;
    this.bordetellaBronchisepticVaccine = medicalDog.bordetellaBronchisepticVaccine;

    if (medicalDog.vet) {
      this.userVetId = medicalDog.vet._id;
    }
  }

  getJson() {
    return {
      _id: this._id,
      vet: this.vet,
      notes: this.notes,
      isCastrated: this.isCastrated,
      lastVisitVet: this.lastVisitVet,
      rabiesVaccine: this.rabiesVaccine,
      distemperVaccine: this.distemperVaccine,
      hepatitisVaccine: this.hepatitisVaccine,
      parvovirusVaccine: this.parvovirusVaccine,
      parainfluenzaVaccine: this.parainfluenzaVaccine,
      leptospirosisVaccine: this.leptospirosisVaccine,
      bordetellaBronchisepticVaccine: this.bordetellaBronchisepticVaccine,
    };
  }

  // ============================================
  // Getters
  // ============================================

  get getVet() {
    return this.vet;
  }

  get getUserVetId() {
    return this.userVetId;
  }

  get getLastVisitVet() {
    return this.lastVisitVet;
  }

  get getIsCastrated() {
    return this.isCastrated;
  }

  get getRabiesVaccine() {
    return this.rabiesVaccine;
  }

  get getDistemperVaccine() {
    return this.distemperVaccine;
  }

  get getHepatitisVaccine() {
    return this.hepatitisVaccine;
  }

  get getLeptospirosisVaccine() {
    return this.leptospirosisVaccine;
  }

  get getParvovirusVaccine() {
    return this.parvovirusVaccine;
  }

  get getParainfluenzaVaccine() {
    return this.parainfluenzaVaccine;
  }

  get getBordetellaBronchisepticVaccine() {
    return this.bordetellaBronchisepticVaccine;
  }

  get getNotes() {
    return this.notes;
  }
}

export default MedicalInformationDog;
