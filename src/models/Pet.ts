import { makeAutoObservable } from 'mobx';
import moment from 'moment';

interface IPet {
  id: string;
  age: string;
  name: string;
  city: string;
  notes: string;
  color: string;
  height: string;
  gender: string;
  country: string;
  category: string;
  location: object;
  adopted: boolean;
  createdDate: Date;
  description: string;
  userCreator: object;
  textAdderss?: string;
  images: Array<string>;
}

class Pet implements IPet {
  id;
  age;
  name;
  city;
  notes;
  height;
  gender;
  images;
  country;
  adopted;
  category;
  location;
  createdDate;
  description;
  userCreator;
  textAddress;

  constructor() {
    this.id = '';
    this.age = '';
    this.name = '';
    this.city = '';
    this.notes = [];
    this.height = 0;
    this.images = [];
    this.gender = '';
    this.color = '';
    this.country = '';
    this.category = '';
    this.location = {};
    this.description = '';
    this.adopted = false;
    this.userCreator = {};
    this.textAddress = '';
    this.userCreator = {};

    makeAutoObservable(this);
  }

  fillJson(pet) {
    this.id = pet._id;
    this.age = pet.age;
    this.name = pet.name;
    this.city = pet.city;
    this.notes = pet.notes;
    this.color = pet.color;
    this.height = pet.height;
    this.gender = pet.gender;
    this.images = pet.images;
    this.adopted = pet.adopted;
    this.country = pet.country;
    this.category = pet.category;
    this.location = pet.location;
    this.description = pet.description;
    this.userCreator = pet.userCreator;
    this.textAddress = pet.textAddress;
    this.userCreator = pet.userCreator;
  }

  // ============================================
  // Getters
  // ============================================

  get getUserCreatorId() {
    return this.userCreator._id;
  }
}

export default Pet;
