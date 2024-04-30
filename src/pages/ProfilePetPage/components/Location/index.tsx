import { IconLocation } from '../../../../assets/icons'

interface Props {
  city: string
  country: string
}

export const Location: React.FC<Props> = ({ country, city }) => {
  return (
    <div className="mt-10 flex-col">
      {country && (
        <div className="mt-10 flex items-center gap-2">
          <IconLocation />
          <p className="text-md font-semibold leading-6 text-primery-700 w-full">
            {`${city} ${country}`}
          </p>
        </div>
      )}
    </div>
  )
}
