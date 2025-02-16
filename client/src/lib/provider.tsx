"use client"

import { store } from '@/store/store'
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function ProviderElement({ children }: { children: ReactNode }) {
  return (
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
        <Toaster />
    </>
  )
}

export default ProviderElement