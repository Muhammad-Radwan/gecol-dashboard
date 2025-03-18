'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

const queryClient = new QueryClient()
 
const QCProvider = ({children} : PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QCProvider