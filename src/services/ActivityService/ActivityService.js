import i18next from 'i18next'

class ActivityService {
  getActivity = () => {
    const activity = [
      { value: '', label: i18next.t('selectActivity.allActivity') },
      { value: 'quiet', label: i18next.t('selectActivity.quiet') },
      { value: 'energetic', label: i18next.t('selectActivity.energetic') },
      { value: 'superEnergetic', label: i18next.t('selectActivity.superEnergetic') },
    ]
    return activity
  }
}

export default ActivityService
