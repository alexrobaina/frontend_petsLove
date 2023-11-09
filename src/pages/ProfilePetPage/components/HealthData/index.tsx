import { IMedicalRecord, IVaccine } from '../../interfaces'
import { MedicalRecord } from '../MedicalRecord'
import { VaccinesTable } from '../VaccinesTable'

interface Props {
  pet: {
    MedicalRecord: IMedicalRecord[]
  }
  petVaccines: IVaccine[]
  handleEditVaccine: (id: string) => void
  handleDeleteVaccine: (id: string) => void
}

export const HealthData: React.FC<Props> = ({
  pet,
  petVaccines,
  handleEditVaccine,
  handleDeleteVaccine,
}) => {
  return (
    <>
      <div className="mt-5 gap-6">
        <h2 className="mt-10 text-lg font-semibold text-primary-900">
          Medical Record
        </h2>
        <MedicalRecord medicalRecord={pet.MedicalRecord} />
      </div>
      <h2 className="mt-10 text-lg font-semibold text-primary-900">Vaccines</h2>
      {petVaccines.length > 0 && (
        <VaccinesTable
          vaccines={petVaccines}
          handleEditVaccine={handleEditVaccine}
          handleDeleteVaccine={handleDeleteVaccine}
        />
      )}
    </>
  )
}
