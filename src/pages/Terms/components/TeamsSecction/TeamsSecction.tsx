import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../../../components'
import TeamCard, { Team } from '../TeamCard'

interface Props {
  teams: Team[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canManageTeam: any
}

export const TeamsSecction: FC<Props> = ({ teams, canManageTeam }) => {
  const { t } = useTranslation(['settings'])

  return (
    <>
      {teams && (
        <div className="flex-col flex md:flex-row pr-5 md:pr-12 gap-10 mt-14">
          <div className="md:w-[50%]">
            <h2 className="text-xl font-semibold leading-7 text-primary-950">
              {t('settings:teams')}
            </h2>
            <p className="mt-1 text-sm leading-6 text-primary-500">
              {t('settings:teamsDescription')}
            </p>
          </div>
          <div className="w-full">
            <div className="flex justify-end gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
              <div className="sm:col-span-3">
                <BaseButton
                  isDisabled
                  text={t('settings:createTeam')}
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
    </>
  )
}
