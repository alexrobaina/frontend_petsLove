// test-utils.ts
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement) => render(ui);

export * from '@testing-library/react';
export { customRender as render };
