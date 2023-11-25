import * as Yup from 'yup'

export const medicalRecordValidation = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  clinicName: Yup.string().required('Clinic name is required'),
})
