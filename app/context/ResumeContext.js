import React,{useState,createContext,useContext} from 'react'

const ResumeContext=createContext()
export const ResumeContextProvider=({children})=>{
const [manRes,setManRes]=useState
({
    email: "",
    grad: "",
    occupation: "",
    mobnum: "",
    firstname: "",
    lastname: "",
    schper12: "",
    school12: "",
    schper: "",
    school: "",
    address: "",
    grad_per: "",
    skills: "",
    exp: "",
  })
  const [cn,setCn]=useState('Frontend Development')
const ManResSet=(resData)=>{
    setManRes(resData)
}
    return(
        <ResumeContext.Provider value={{manRes,ManResSet,cn,setCn}}>
            {children}
        </ResumeContext.Provider>
    )
}

export const ResumeCon=()=>{
    return useContext(ResumeContext)
}