import { PetDetail } from '../../interfaces'
import { MedicalRecord } from '../MedicalRecord'
import { VaccinesTable } from '../VaccinesTable'

export interface IVaccine {
  id: string
  name: string
  date: string
  nextDueDate: string
}

interface Props {
  pet: PetDetail
  handleEditVaccine: (data: unknown) => void
  handleOpenModalDeleteVaccine: (vaccine: IVaccine) => void
}

export const HealthData: React.FC<Props> = ({
  pet,
  handleEditVaccine,
  handleOpenModalDeleteVaccine,
}) => (
  <>
    <div className="mt-5 gap-6">
      <h2 className="mt-10 text-lg font-semibold text-primary-900">
        Medical Record
      </h2>
      <MedicalRecord medicalRecord={pet.MedicalRecord} />
    </div>
    <h2 className="mt-10 text-lg font-semibold text-primary-900">Vaccines</h2>
    {pet?.PetVaccine && (
      <VaccinesTable
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        vaccines={pet.PetVaccine || []}
        handleEditVaccine={handleEditVaccine}
        handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
      />
    )}
  </>
)
