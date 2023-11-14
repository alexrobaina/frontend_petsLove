import * as Yup from 'yup'

export const petVaccineSchema = Yup.object().shape({
  status: Yup.string().required('Age is required'),
})
