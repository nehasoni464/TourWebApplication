import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {store} from "../index"
const adminProtectedRoute=({component:Component,...rest})=>{
    
    const state= store.getState();
    const role=state.role
    return(
        <Route
        {...rest}
        render={(props)=>{
            
            if(role==="Admin"){
                return<Component/>
            }else{
                return <Redirect to={{pathname:"/summer",state:{from:props.location}}}/>
            }
        }}/>
    )
}
export default adminProtectedRoute;