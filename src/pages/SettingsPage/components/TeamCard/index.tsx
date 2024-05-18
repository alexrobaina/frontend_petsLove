import { FC } from 'react'

import { BaseButton } from '../../../../components'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  role: string
  email: string
}

interface Team {
  id: string
  name: string
  members: TeamMember[]
}

interface TeamCardProps {
  team: Team
}

const TeamCard: FC<TeamCardProps> = ({ team }) => {
  console.log(team)

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 w-full mt-8">
      <div className="w-full rounded overflow-hidden shadow-lg bg-white border border-gray-200">
        <div>{team.name}</div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-primary-900">
            {team?.name}
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 last:border-0">
            <p className="text-primary-900 text-base">Team Members:</p>
            <BaseButton
              text={'Add Member'}
              onClick={() => console.log('add member')}
            />
          </div>
        </div>
        <ul className="px-6 bg-primary-100">
          {team?.members.map((member) => (
            <li
              key={member.id}
              className="py-2 border-b flex justify-between items-center border-primary-200 last:border-0"
            >
              <div>
                {member?.firstName && (
                  <span className="font-semibold text-green-700">
                    {member?.firstName} {member?.lastName}
                  </span>
                )}
                <span className="text-gray-600"> - {member.role}</span>
              </div>
              <div>{member?.email}</div>
              <div className="flex gap-2 mt-2 text-primary-500 cursor-pointer">
                <BaseButton text={'Edit'} onClick={() => console.log('Edit')} />
                <BaseButton
                  style="delete"
                  text={'Remove'}
                  onClick={() => console.log('Remove')}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TeamCard
