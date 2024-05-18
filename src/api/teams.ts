import axios from 'axios'

export const listTeams = async () => {
  const response = await axios.get('/teams')
  return response.data
}

export const createTeam = async (teamData: {
  name: string
  description: string
  members: string[]
}) => {
  const response = await axios.post('/teams', teamData)
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTeam = async (teamData: any) => {
  const response = await axios.put(`/teams/${teamData.id}`, teamData)
  return response.data
}

export const getTeamById = async (id: string) => {
  const response = await axios.get(`/teams/${id}`)
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTeamMember = async (memberData: any) => {
  const response = await axios.post(
    `/teams/${memberData.teamId}/members`,
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
  const response = await axios.delete(`/teams/${teamId}/members/${userId}`)
  return response.data
}
