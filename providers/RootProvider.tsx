/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import React, { createContext, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/AuthProvider';
import { queryClientInstance } from '@/lib/queryClient';
import { CartProvider } from './cart/CartProvider';

interface RootProviderProps {
  children: React.ReactNode;
}

const RootContext = createContext<Record<string, never>>({});
export function RootProvider({ children }: RootProviderProps) {
  // Use useState to create a stable reference during SSR
  const [queryClient] = useState(() => queryClientInstance);

  return (
    <QueryClientProvider client={queryClient}>
      <RootContext.Provider value={{}}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </RootContext.Provider>
    </QueryClientProvider>
  );
}
