import React from "react"
import Header from "./navbar"
import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from './Season/card'
import CardPackage from './Packages/CardPackage'
import { Grid } from '@material-ui/core'
import { withRouter } from "react-router-dom"

const Hidden=(props)=>{
    const [places, setPlaces]=useState([])
    const [packages, setPackages]=useState([])
    const [change, setChange]=useState(false)
    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          };
             axios.get("http://localhost:4000/hidden",config)
     .then((response)=>{
         console.log(response)

            setPlaces(response.data.list)
            setPackages(response.data.listPackage)
             })
    .catch((e)=>console.log("error"))
         },[change])

return <div style={{ marginTop: "8rem" }}>
    <Header/>
    <h1>Hidden Files</h1>
    <Grid container spacing ={12} xs={12}>
    
       {places.map(place=>{
           return (<Card setChange={setChange} title={place.title}
                body={place.description}
                show={place.show}
                id={place._id}
                image={place.avatar}
                
                />)}) 
           }
           {packages.map(p=>{
                    return (<CardPackage setChange={setChange} title={p.title}
                         price={p.price}
                         adventures={p.adventures}
                         days={p.days}
                         hotelCategory={p.hotelCategory}
                        show={p.show}
                        id={p._id}
                        image={p.avatar[0]}
                         />
                         )
                 })}
                 
        </Grid>
        
</div>
};
export default withRouter(Hidden)