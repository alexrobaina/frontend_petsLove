import { FC, useContext } from 'react'

import { Header } from '../../components/Header'
import { Loader } from '../../components/Loader'
import { useUser } from '../../hooks/useUser'
import { AppContext } from '../../services/AppContext'

import { PersonalInformationForm } from './components/PersonalInformationForm'
import { SocialMediaForm } from './components/SocialMediaForm'

export const SettingsPage: FC = () => {
  const context = useContext(AppContext)
  const { data, isLoading } = useUser(context?.user?.id)

  if (!context?.user?.id) {
    return <div>Somethink is wrong</div>
  }

  return (
    <div className="pb-32">
      <header className="flex gap-5">
        <Header title="Settings" canBack />
      </header>
      {isLoading && (
        <div className="mt-[20%]  ">
          <Loader big />
        </div>
      )}
      {!isLoading && (
        <>
          <PersonalInformationForm user={data?.user[0]} />
          <SocialMediaForm user={data?.user[0]} />
        </>
      )}
    </div>
  )
}
