import { makeAutoObservable } from 'mobx';
import moment from 'moment';

interface IPet {
  id: string;
  image: any;
  name: string;
  notes: string;
  lost: boolean;
  state: boolean;
  birthday: Date;
  gender: string;
  history: string;
  category: string;
  location: object;
  adopted: boolean;
  userCreator: object;
  textAdderss?: string;
  activityLevel: string;
  userCreatorId: string;
}

class Pet implements IPet {
  id;
  lost;
  name;
  state;
  notes;
  gender;
  image;
  history;
  category;
  location;
  birthday;
  adopted;
  textAddress;
  userCreator;
  activityLevel;
  userCreatorId;

  constructor() {
    this.id = '';
    this.name = '';
    this.notes = '';
    this.gender = '';
    this.history = '';
    this.lost = false;
    this.category = '';
    this.state = false;
    this.location = {};
    this.birthday = '';
    this.adopted = false;
    this.userCreator = {};
    this.textAddress = '';
    this.userCreator = {};
    this.activityLevel = '';
    this.userCreatorId = '';

    makeAutoObservable(this);
  }

  fillJson(pet) {
    this.id = pet._id;
    this.name = pet.name;
    this.state = pet.state;
    this.image = pet.image;
    this.notes = pet.notes;
    this.gender = pet.gender;
    this.adopted = pet.adopted;
    this.history = pet.history;
    this.category = pet.category;
    this.location = pet.foundLocation;
    this.textAddress = pet.textAddress;
    this.userCreator = pet.userCreator;
    this.activityLevel = pet.activityLevel;
    this.userCreatorId = pet.userCreator._id;
    this.birthday = this.getBirthday(pet.birthday);
  }

  getBirthday(birthday) {
    let today = new Date();

    //define moments for the startdate and enddate
    let startdateMoment = moment(birthday);
    let enddateMoment = moment(today);

    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
      //getting the difference in years
      let years = enddateMoment.diff(startdateMoment, 'years');

      //moment returns the total months between the two dates, subtracting the years
      let months = enddateMoment.diff(startdateMoment, 'months') - years * 12;

      //to calculate the days, first get the previous month and then subtract it
      startdateMoment.add(years, 'years').add(months, 'months');
      let days = enddateMoment.diff(startdateMoment, 'days');

      return {
        years: years,
        months: months,
        days: days,
      };
    } else {
      return undefined;
    }
  }

  // ============================================
  // Getters
  // ============================================

  get getUserCreatorId() {
    return this.userCreatorId;
  }
}

export default Pet;
