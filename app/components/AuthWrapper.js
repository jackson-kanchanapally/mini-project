import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {useRouter} from 'next/navigation'
export default function AuthWrapper({children}){
    const router = useRouter()
    const {user} =UserAuth()
    React.useEffect(()=>{
        if(!user){
            router.push('/login')
        }
    },[user])
    if(user)
    {
        return<>{children}</>
    }
    return null
}