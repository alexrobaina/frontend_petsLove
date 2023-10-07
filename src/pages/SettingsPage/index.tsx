import { useFormik } from 'formik'
import { action } from 'mobx'
import { FC, useContext, useEffect, useState } from 'react'

import FadeIn from '../../components/FadeIn'
import { Header } from '../../components/Header'
import { BaseLoading } from '../../components/BaseLoading'
import { useUser } from '../../hooks/useUser'
import { useUserUpdate } from '../../hooks/useUserUpdate'
import { AppContext, AppContextProps, User } from '../../services/AppContext'

import { PersonalInformationForm } from './components/PersonalInformationForm'
import { SocialMediaForm } from './components/SocialMediaForm'
import { INITIAL_STATE } from './constants'

export const SettingsPage: FC = () => {
  const context = useContext(AppContext)
  const { mutate, isLoading: isLoadingUpdate } = useUserUpdate()
  const { data, isLoading } = useUser(context?.user?.id)
  const [deleteFiles, setDeleteFiles] = useState(data?.user[0].image)

  useEffect(() => {
    if (data?.user[0].image) {
      setDeleteFiles(data?.user[0].image)
    }
  }, [data])

  const setUser = action((context: AppContextProps, user: User) => {
    if (!user) {
      return
    }
    context.user = user
  })

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit: (values) => {
      if (values.image) {
        values.deleteFiles = deleteFiles
      }

      mutate({
        ...values,
        id: context?.user?.id || '',
        locationId: data?.user[0]?.locationId || '',
      })
    },
    onReset: () => {
      formik.setValues(INITIAL_STATE)
    },
  })

  useEffect(() => {
    if (data?.user[0]) {
      setUser(context, data?.user[0])
    }
  }, [data, context, setUser])

  const { handleChange, handleSubmit, setFieldValue, values, errors } = formik

  if (!context?.user?.id) {
    return <div>Somethink is wrong</div>
  }

  if (isLoading || isLoadingUpdate) {
    return (
      <div className="mt-[20%]">
        <BaseLoading large />
      </div>
    )
  }

  return (
    <div className="pb-32">
      <header className="flex gap-5">
        <Header title="Settings" canBack />
      </header>
      <FadeIn>
        <form onSubmit={handleSubmit}>
          <PersonalInformationForm
            errors={errors}
            values={values}
            user={data?.user[0]}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          <SocialMediaForm
            errors={errors}
            values={values}
            user={data?.user[0]}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </form>
      </FadeIn>
    </div>
  )
}
