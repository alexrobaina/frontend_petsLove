import { FC } from 'react'

interface Props {
  title: string
}

export const BaseHeader: FC<Props> = ({ title }) => {
  return (
    <header className='flex justify-between items-center'>
      <h1 className='text-md md:text-xl lg:md:text-1xl xl:md:text-2xl font-semibold'>
        {title}
      </h1>
    </header>
  )
}
