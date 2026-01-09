/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import React, { createContext } from 'react';
import { AuthProvider } from './auth/AuthProvider';

interface RootProviderProps {
  children: React.ReactNode;
}

const RootContext = createContext<Record<string, never>>({});
export function RootProvider({ children }: RootProviderProps) {
  return (
    <RootContext.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </RootContext.Provider>
  );
}
