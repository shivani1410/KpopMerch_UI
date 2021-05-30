import React, { createContext, useState } from 'react'

export const UserDetailsContext=createContext();

export const UserDetailsProvider=props=>{
    const [details,setDetails]=useState({})
    return (
        <UserDetailsContext.Provider value={[details,setDetails]}>
            {props.children}
        </UserDetailsContext.Provider>
    )
}