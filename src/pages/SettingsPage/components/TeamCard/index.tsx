import React from 'react'
import { useNavigate } from 'react-router-dom'

import { BaseButton } from '../../../../components'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  role: string
  user: {
    id: string
    email: string
    username: string
    firstName: string
    lastName: string
  }
}

interface Team {
  id: string
  name: string
  members: TeamMember[]
  createdBy: string
}

interface TeamCardProps {
  team: Team
  canManage: boolean
}

const TeamCard: React.FC<TeamCardProps> = ({ team, canManage }) => {
  const navigate = useNavigate()
  const gotToUser = (id: string) => {
    navigate(`/user/${id}`)
  }

  return (
    <div className="w-full mt-4 rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      <div
        onClick={() => {
          gotToUser(team.createdBy)
        }}
        className="px-6 py-4 hover:bg-primary-200 cursor-pointer"
      >
        <div className="font-bold text-xl mb-2 text-primary-700">
          {team.name}
        </div>
        <p className="text-gray-700 text-base">Team Members:</p>
      </div>
      <ul className="px-6 pb-2">
        {team.members.map((member) => (
          <li
            key={member.id}
            className="flex gap-4 items-center justify-between py-2 border-b border-gray-200 last:border-0"
          >
            <div>
              <span className="font-semibold text-primary-700">
                {member?.user?.email}
              </span>
            </div>
            <div>
              <span className="text-gray-600">{member.role}</span>
            </div>
            {canManage && (
              <div className="flex gap-2 px-6 py-4">
                <BaseButton
                  text={'Edit Team'}
                  onClick={() => console.log('Edit Team')}
                />
                <BaseButton
                  style="delete"
                  text={'Delete Team'}
                  onClick={() => console.log('Delete Team')}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamCard
