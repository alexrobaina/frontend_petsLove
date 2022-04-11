import { makeAutoObservable } from 'mobx';

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
  height;
  gender;
  images;
  weight;
  country;
  adopted;
  category;
  location;
  createdDate;
  description;
  userCreator;
  textAddress;
  medicalNotes;

  constructor() {
    this.id = '';
    this.age = '';
    this.name = '';
    this.city = '';
    this.weight = 0;
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
    this.medicalNotes = [];

    makeAutoObservable(this);
  }

  fillJson(pet) {
    this.id = pet._id;
    this.age = pet.age;
    this.name = pet.name;
    this.city = pet.city;
    this.color = pet.color;
    this.gender = pet.gender;
    this.images = pet.images;
    this.weight = pet.weight;
    this.adopted = pet.adopted;
    this.country = pet.country;
    this.category = pet.category;
    this.location = pet.location;
    this.medicalNotes = pet.medicalNotes;

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
