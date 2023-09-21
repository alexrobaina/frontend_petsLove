import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'

export const Buttons: FC = () => (
  <>
    <div className="mt-8 gap-5">
      <h1>Big button</h1>
      <div className="flex gap-2 mt-3 flex-wrap ">
        <BaseButton size="large" text="hola" type="primary" />
        <BaseButton size="large" text="hola" type="secondary" />
        <BaseButton size="large" text="hola" type="tertiary" />
        <BaseButton isLoading size="large" text="hola" type="primary" />
      </div>
    </div>
    <div className="mt-8 gap-5">
      <h1>Medium button</h1>
      <div className="flex gap-2 mt-3 flex-wrap">
        <BaseButton size="medium" text="hola" type="primary" />
        <BaseButton size="medium" text="hola" type="secondary" />
        <BaseButton size="medium" text="hola" type="tertiary" />
        <BaseButton isLoading size="medium" text="hola" type="primary" />
      </div>
    </div>
    <div className="mt-8 gap-5">
      <h1>Small button</h1>
      <div className="flex gap-2 mt-3 flex-wrap">
        <BaseButton size="small" text="hola" type="primary" />
        <BaseButton size="small" text="hola" type="secondary" />
        <BaseButton size="small" text="hola" type="tertiary" />
        <BaseButton isLoading size="small" text="hola" type="primary" />
      </div>
    </div>
  </>
)
