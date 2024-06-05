import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAppointmentUpdate } from '../../../hooks/appointments/useAppointmentUpdate'
import { useCreateAppointment } from '../../../hooks/appointments/useCreateAppointment'

interface AppointmentFormValues {
  id?: string
  petId: string
  title: string
  endDate: string
  startDate: string
  description: string
  recipientId: string
  recurring: boolean
}

export function useAppointmentForm(onClose: () => void) {
  const { mutate } = useCreateAppointment()
  const { mutate: update, isLoading } = useAppointmentUpdate()

  const INITIAL_STATE: {
    petId: string
    title: string
    endDate: string
    startDate: string
    recurring: boolean
    description: string
    recipientId: string
  } = {
    petId: '',
    title: '',
    endDate: '',
    startDate: '',
    description: '',
    recipientId: '',
    recurring: false,
  }

  const formik = useFormik<AppointmentFormValues>({
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      startDate: Yup.string().required('Description is required'),
    }),
    initialValues: INITIAL_STATE,
    onSubmit: async (values) => {
      if (!values?.petId) {
        values.petId = ''
        values.recipientId = ''
      }

      if (!values?.recipientId) {
        values.recipientId = ''
      }

      if (values.id) {
        update(values)
      } else {
        mutate(values)
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formik.resetForm({ INITIAL_STATE }) // Pass INITIAL_STATE as an argument to resetForm
      onClose()
    },
  })

  return { formik, isLoadingUpdate: isLoading }
}
