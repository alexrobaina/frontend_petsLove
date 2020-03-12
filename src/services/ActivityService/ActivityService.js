class ActivityService {
  getActivity = () => {
    const activity = [
      { value: '', label: 'All Activity' },
      { value: 'quiet', label: 'quiet' },
      { value: 'energetic', label: 'energetic' },
      { value: 'superEnergetic', label: 'super energetic' },
    ]
    return activity
  }
}

export default ActivityService
