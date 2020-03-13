class GenderService {
  getGender = () => {
    const gender = [
      { value: '', label: 'All Genders' },
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ]
    return gender
  }
}

export default GenderService
