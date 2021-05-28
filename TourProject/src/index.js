const express = require('express')
const userRouter= require('./router/userRouter')
const placeRouter= require('./router/placeRouter')
const tourPackages=require('./router/tourPackagesRouter')
const cors =require('cors')
require('./db/mongoose')

const app= express()
const port= process.env.PORT||4000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(placeRouter)
app.use(tourPackages)

app.listen(port,()=>{
    console.log('Server is Running')
})