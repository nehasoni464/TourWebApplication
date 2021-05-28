

const express = require('express')
const Person = require('../db/model/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const jwt=require('jsonwebtoken')

//Creating User
router.post('/signup', async (req, res) => {
    const user = new Person(req.body)
    try {
        await user.save()
        const token = await user.generateAuthTaken()
     res.status(201).send({user,token})
    res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})
router.get('/profile',async(req,res)=>{
       try {
       const token = req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
   const person= await Person.findById(decoded._id)
   
   if(person)
   {
       return res.send(person)
   }
   res.status(402).send()}
   catch(e){res.status(500).send(e)}
})
//UserLogin
router.post('/signin', async (req, res) => {
        try {
        const user = await Person.findByCredientials(req.body.email,req.body.password)
      const token = await user.generateAuthTaken()
        res.send({user,token})
    } catch (e) {
        console.log(e)
                res.status(400).send(e.message)
    }
})

//UserLogout
router.post('/logout', auth, async (req, res) => {
   
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send("successfully logout")
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router