import { makeAutoObservable } from 'mobx';

interface IShelter {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  aboutUs: string;
  username: string;
  location: object;
  textAddress: string;
  requirementsToAdopt: string;
}

class Shelter implements IShelter {
  _id;
  name;
  role;
  phone;
  email;
  aboutUs;
  username;
  location;
  textAddress;
  requirementsToAdopt;

  constructor() {
    this._id = '';
    this.name = '';
    this.role = '';
    this.phone = '';
    this.email = '';
    this.aboutUs = '';
    this.username = '';
    this.location = {};
    this.textAddress = '';
    this.requirementsToAdopt = '';

    makeAutoObservable(this);
  }

  fillJson(shelter) {
    this._id = shelter._id;
    this.name = shelter.name;
    this.role = shelter.role;
    this.phone = shelter.phone;
    this.email = shelter.email;
    this.aboutUs = shelter.aboutUs;
    this.location = shelter.location;
    this.username = shelter.username;
    this.textAddress = shelter.textAddress;
    this.requirementsToAdopt = shelter.requirementsToAdopt;
  }

  // ============================================
  // Getters
  // ============================================

  get getTextAddress() {
    return this.textAddress;
  }

  get getUsername() {
    return this.name;
  }

  get getAboutUs() {
    return this.aboutUs;
  }

  get getEmail() {
    return this.email;
  }

  get getRole() {
    return this.role;
  }

  get getName() {
    return this.name;
  }

  get getPhone() {
    return this.phone;
  }
}

export default Shelter;
