import { FC } from 'react'
import { BaseHeader } from '../../components/BaseHeader'
import { BaseBadge } from '../../components/BaseBadge'

export const SearchPetsPage: FC = () => {
  return (
    <div>
      <BaseHeader title='Search pets' />
      <div className='flex mt-10 justify-between flex-wrap'>
        <BaseBadge pointer text='Male' />
        <BaseBadge pointer text='Female' />
        <BaseBadge pointer text='Cats' />
        <BaseBadge pointer text='Dogs' />
        <BaseBadge pointer text='Exotic' />
      </div>
    </div>
  )
}
