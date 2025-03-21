import React from 'react'

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='p-5 flex items-center justify-center h-screen w-screen'>
        {children}
    </div>
  )
}

export default AuthLayout