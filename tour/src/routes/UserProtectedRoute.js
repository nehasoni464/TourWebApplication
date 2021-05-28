import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {store} from "../index"
const userProtectedRoute=({component:Component,...rest})=>{
    
    const state= store.getState();
    const role=state.role
    return(
        <Route
        {...rest}
        render={(props)=>{
            
            if(role==="User"){
                return<Component/>
            }else{
                return <Redirect to={{pathname:"/signin",state:{from:props.location}}}/>
            }
        }}/>
    )
}
export default userProtectedRoute;