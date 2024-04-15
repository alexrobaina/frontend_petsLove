import { ContactCard } from '../../../../components/common/ContactCard'

interface Props {
  pet: {
    Shelter: {
      id: string
      email: string
      image: string
      username: string
      firstName: string
    }
    Adopter: {
      id: string
      email: string
      image: string
      username: string
      firstName: string
    }
    Vet: {
      id: string
      email: string
      image: string
      username: string
      firstName: string
    }
  }
  gotToUser: (id: string) => void
}

export const Guardians: React.FC<Props> = ({ pet, gotToUser }) => (
  <>
    <h2 className="mt-10 text-lg font-semibold text-primary-900">
      Pet Guardians
    </h2>
    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pet?.Shelter && (
        <div onClick={() => gotToUser(pet?.Shelter?.id)}>
          <ContactCard
            role="Shelter"
            email={pet?.Shelter?.email}
            className="cursor-pointer hover:bg-primary-100"
            name={pet?.Shelter?.username || pet?.Shelter?.firstName}
            image={`${import.meta.env.VITE_BUCKET_NAME}/users/avatar/${pet?.Shelter?.image}`}
            description="
              Shelter of this pet
              Click to see more information about this shelter
            "
          />
        </div>
      )}
      {pet?.Adopter && (
        <div onClick={() => gotToUser(pet?.Adopter?.id)}>
          <ContactCard
            role="Adopter"
            email={pet?.Adopter?.email}
            image={pet?.Adopter?.image}
            description="Owner of this pet"
            className="cursor-pointer hover:bg-primary-100"
            name={pet?.Adopter?.username || pet?.Adopter?.firstName}
          />
        </div>
      )}
      {pet?.Vet && (
        <div onClick={() => gotToUser(pet?.Adopter?.id)}>
          <ContactCard
            role="Veterinarian"
            email={pet?.Vet?.email}
            image={pet?.Vet?.image}
            description="Veterinarian of this pet"
            className="cursor-pointer hover:bg-primary-100"
            name={pet?.Vet?.username || pet?.Vet?.firstName}
          />
        </div>
      )}
    </div>
  </>
)
