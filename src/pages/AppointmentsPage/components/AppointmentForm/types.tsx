import { FormikErrors } from 'formik'

export interface Props {
  userId: string
  title: string
  startDate?: string
  closeModal: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any
  errors: FormikErrors<{
    title: string
    description: string
    endDate: string
    petId: string
    startDate: Date
  }>
  pets: { name: string; id: string }[]
  pet: {
    name: string
    age: string
    Shelter?: {
      id: string
      name: string
      email: string
      firstname: string
      username: string
    }
    Adopter?: {
      id: string
      name: string
      email: string
      phone: string
      username: string
      firstname: string
    }
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void
}
