import { ShineBorder } from '@/components/ui/shine-border'
import UserRegisterForm from '@/components/UserRegisterForm'
import React from 'react'

const Registerpage = () => {
  return (
<div className="mt-50 w-full flex flex-column justify-center p-4 gap-4">
  
  <div className="relative overflow-hidden p-20 bg-transparent max-w-[500px]">
     <ShineBorder borderWidth={10} shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

     <p className="text-7xl font-bold mb-10">New User</p>
     <UserRegisterForm />
  </div>

</div>

  )
}

export default Registerpage
