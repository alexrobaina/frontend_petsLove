import { useFormik } from 'formik'
import { action } from 'mobx'
import { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../components'
import FadeIn from '../../components/FadeIn'
import { BaseLoading } from '../../components/common/BaseLoading'
import { Header } from '../../components/common/Header'
import { useTeamsListByUser } from '../../hooks/teams/useTeamsListByUser'
import { useUser } from '../../hooks/user/useUser'
import { useUserUpdate } from '../../hooks/user/useUserUpdate'
import { AppContext, AppContextProps, User } from '../../services/AppContext'

import { PersonalInformationForm } from './components/PersonalInformationForm'
import { SocialMediaForm } from './components/SocialMediaForm'
import TeamCard, { Team } from './components/TeamCard'
import { INITIAL_STATE } from './constants'

export const SettingsPage: FC = () => {
  const { t } = useTranslation(['common', 'settings'])
  const context = useContext(AppContext)
  const { mutate, isLoading: isLoadingUpdate } = useUserUpdate()
  const { user, isLoading } = useUser(context?.user?.id)
  const { data: teams } = useTeamsListByUser()

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

  const canManageTeam = (team: {
    createdBy: string
    members: { role: string; user: { id: string } }[]
  }) => {
    const userId = context?.user?.id
    if (team.createdBy === userId) {
      return true
    }
    const userMember = team.members.find((member) => member.user.id === userId)
    return userMember && userMember.role === 'ADMIN'
  }

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
      {teams && (
        <div className="flex-col flex md:flex-row pr-5 md:pr-12 gap-10 mt-14">
          <div className="md:w-[50%]">
            <h2 className="text-xl font-semibold leading-7 text-primary-950">
              {'Teams'}
            </h2>
            <p className="mt-1 text-sm leading-6 text-primary-500">
              {'In this section you can manage your teams.'}
            </p>
          </div>
          <div className="w-full">
            <div className="flex justify-end gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
              <div className="sm:col-span-3">
                <BaseButton
                  isDisabled
                  text={'Create Team'}
                  onClick={() => console.log('Create Team')}
                />
              </div>
            </div>
            {teams.map((team: Team) => (
              <TeamCard
                team={team}
                key={team.id}
                canManage={canManageTeam(team) || false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
