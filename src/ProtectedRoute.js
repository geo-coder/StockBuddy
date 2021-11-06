import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'


const ProtectedRoute = ({children, ...rest})=>{
    const auth=false

    return(
        <Route {...rest}
        
        render={()=>{
            return auth===true 
            ? children 
            : <Redirect to={'/'}/>

        }}
        
        />

        
    )


}

export default ProtectedRoute