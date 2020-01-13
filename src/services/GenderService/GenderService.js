import axios from 'axios'
import { API_URL } from '../config'

class GenderService {
  getGender = () => {
    let gender = [
      {value: 'female', label: 'Female'},
      {value: 'male', label: 'Male'}
    ]
    
    return gender
  }
}

export default GenderService
