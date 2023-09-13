import * as React from 'react';

export interface AppContextProps {
  session: { token: string };
  user: any;
}

// This object implements AppContextProps, but it throws
// an error instead of returning requested props. This mechanism helps
// to detect forbidden context access outside of provider tree.
const warning: AppContextProps = {
  get session(): { token: string } {
    console.warn('Accessed context.session without context provider.');
    throw new Error('Accessed context.session without context provider.');
  },
  get user(): any {
    console.warn('Accessed context.user without context provider.');
    throw new Error('Accessed context.user without context provider.');
  },
};

export const AppContext = React.createContext<AppContextProps>(warning);
