import { FC } from 'react'
import { BaseButton } from '../../components/BaseButton'
import { Loader } from '../../components/Loader'

export const ComponentsUiPage: FC = () => {
  return (
    <div className='flex flex-col p-10 gap-5'>
      <h1 className='text-3xl '>Componets UI</h1>
      <div className='flex flex-col gap-2 mt-5'>
        <h1>Loadings</h1>
        <div className='flex gap-5'>
          <Loader />
          <Loader big />
        </div>
      </div>
      <div className='mt-8 gap-5'>
        <h1>Big button</h1>
        <div className='flex gap-2 mt-3'>
          <BaseButton size='large' text='hola' type='primary' />
          <BaseButton size='large' text='hola' type='secondary' />
          <BaseButton size='large' text='hola' type='tertiary' />
          <BaseButton isLoading size='large' text='hola' type='primary' />
        </div>
      </div>
      <div className='mt-8 gap-5'>
        <h1>Medium button</h1>
        <div className='flex gap-2 mt-3'>
          <BaseButton size='medium' text='hola' type='primary' />
          <BaseButton size='medium' text='hola' type='secondary' />
          <BaseButton size='medium' text='hola' type='tertiary' />
          <BaseButton isLoading size='medium' text='hola' type='primary' />
        </div>
      </div>
      <div className='mt-8 gap-5'>
        <h1>Small button</h1>
        <div className='flex gap-2 mt-3'>
          <BaseButton size='small' text='hola' type='primary' />
          <BaseButton size='small' text='hola' type='secondary' />
          <BaseButton size='small' text='hola' type='tertiary' />
          <BaseButton isLoading size='small' text='hola' type='primary' />
        </div>
      </div>
    </div>
  )
}
