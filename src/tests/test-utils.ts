// test-utils.ts

import { render, fireappointment } from '@testing-library/react'
import { ReactElement } from 'react'

const customRender = (ui: ReactElement) => render(ui)

export * from '@testing-library/react'
export { customRender as render, fireappointment }
