'use client'

import { userType } from '@/lib/EmployeeType';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'



const Dashboard = () => {
  const queryClient = useQueryClient();
  const sharedData = queryClient.getQueryData<userType>(["UserData"]);

  return (
    <h1 className='text-4xl'>مرحباً بك: {sharedData?.employeeName}</h1>
  )
}

export default Dashboard