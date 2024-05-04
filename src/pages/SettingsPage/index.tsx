import { useFormik } from 'formik'
import { action } from 'mobx'
import { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import FadeIn from '../../components/FadeIn'
import { BaseLoading } from '../../components/common/BaseLoading'
import { Header } from '../../components/common/Header'
import { useUser } from '../../hooks/useUser'
import { useUserUpdate } from '../../hooks/useUserUpdate'
import { AppContext, AppContextProps, User } from '../../services/AppContext'

import { PersonalInformationForm } from './components/PersonalInformationForm'
import { SocialMediaForm } from './components/SocialMediaForm'
import { INITIAL_STATE } from './constants'

export const SettingsPage: FC = () => {
  const { t } = useTranslation(['common', 'settings'])
  const context = useContext(AppContext)
  const { mutate, isLoading: isLoadingUpdate } = useUserUpdate()
  const { user, isLoading } = useUser(context?.user?.id)

  const setUser = action((context: AppContextProps, user: User) => {
    if (!user) {
      return
    }
    context.user = user
  })

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    onSubmit: (values) => {
      mutate({
        ...values,
        id: context?.user?.id || '',
        locationId: user?.locationId || '',
      })
    },
  })

  useEffect(() => {
    if (user) {
      setUser(context, user)
    }
  }, [user, context, setUser])

  useEffect(() => {
    if (user) {
      formik.setValues({
        ...user,
        role: values.role || user.role,
        image: values.image || user.image,
        lastName: values.lastName || user.lastName,
        username: values.username || user.username,
        firstName: values.firstName || user.firstName,
        description: values.description || user.description || '',
      })
    }
  }, [user])

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
        <Header title={t('common:settings')} buttonBack />
      </header>
      <FadeIn>
        <form onSubmit={handleSubmit}>
          <PersonalInformationForm
            user={user}
            errors={errors}
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
          <SocialMediaForm
            user={user}
            values={values}
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        </form>
      </FadeIn>
    </div>
  )
}
