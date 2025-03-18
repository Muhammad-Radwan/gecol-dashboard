import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className='p-2'>
          <SidebarTrigger />
          {children}
        </main>
    </SidebarProvider>
    </div>
  )
}

export default AuthLayout