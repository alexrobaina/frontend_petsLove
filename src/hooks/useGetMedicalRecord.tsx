import { useQuery } from 'react-query'

import { getMedicalRecord } from '../api/pet'

export const useGetMedicalRecord = (id: string | null) => {
  const { data, error, isLoading, refetch } = useQuery(
    [id],
    () => id && getMedicalRecord(id),
  )

  return { data: data?.medicalRecord, error, isLoading, refetch }
}
