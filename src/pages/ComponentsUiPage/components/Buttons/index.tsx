import { FC } from 'react'

import { BaseButton } from '../../../../components/common/BaseButton'

export const Buttons: FC = () => (
  <>
    <div className="mt-8 gap-5">
      <h1>Big button</h1>
      <div className="flex gap-2 mt-3 flex-wrap ">
        <BaseButton size="large" text="hola" style="primary" />
        <BaseButton size="large" text="hola" style="secondary" />
        <BaseButton size="large" text="hola" style="tertiary" />
        <BaseButton isLoading size="large" text="hola" style="primary" />
      </div>
    </div>
    <div className="mt-8 gap-5">
      <h1>Medium button</h1>
      <div className="flex gap-2 mt-3 flex-wrap">
        <BaseButton size="medium" text="hola" style="primary" />
        <BaseButton size="medium" text="hola" style="secondary" />
        <BaseButton size="medium" text="hola" style="tertiary" />
        <BaseButton isLoading size="medium" text="hola" style="primary" />
      </div>
    </div>
    <div className="mt-8 gap-5">
      <h1>Small button</h1>
      <div className="flex gap-2 mt-3 flex-wrap">
        <BaseButton size="small" text="hola" style="primary" />
        <BaseButton size="small" text="hola" style="secondary" />
        <BaseButton size="small" text="hola" style="tertiary" />
        <BaseButton isLoading size="small" text="hola" style="primary" />
      </div>
    </div>
  </>
)
