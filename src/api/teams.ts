import axios from 'axios'

export const listTeams = async () => {
  const response = await axios.get('/api/v1/teams/')
  return response.data
}

export const listTeamsByUser = async () => {
  const response = await axios.get('/api/v1/teamsByUser/')
  return response.data
}

export const createTeam = async (teamData: {
  name: string
  description: string
  members: string[]
}) => {
  const response = await axios.post('/api/v1/teams/', teamData)
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTeam = async (teamData: any) => {
  const response = await axios.put(`/api/v1/teams/${teamData.id}`, teamData)
  return response.data
}

export const getTeamById = async (id: string) => {
  const response = await axios.get(`/api/v1/teams/${id}`)
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTeamMember = async (memberData: any) => {
  const response = await axios.post(
    `/api/v1/teams/${memberData.teamId}/members`,
    memberData,
  )
  return response.data
}

export const removeTeamMember = async ({
  teamId,
  userId,
}: {
  teamId: string
  userId: string
}) => {
  const response = await axios.delete(
    `/api/v1/teams/${teamId}/members/${userId}`,
  )
  return response.data
}

export const checkUserMembership = async (petId?: string, userId?: string) => {
  const response = await axios.get(
    `/api/v1/teams/pet/${petId}/membership/${userId}`,
  )
  return response.data.isMember
}
