import React from 'react'
import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/components/login/Login'
import { useSession } from 'next-auth/react'
import scss from "@/styles/Layout.module.scss"

if (typeof window !== 'undefined') {
  global.self = window; 
}

const Home: React.FC = () => {
  const { data: session } = useSession();
  return (
    <>
     
      <main className={scss.main} >
        
        {session && <Dashboard />}
        {!session && <Login />}
      </main>
    </>
  )
}

export default Home;