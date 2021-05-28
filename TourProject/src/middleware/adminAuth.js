const jwt = require('jsonwebtoken')
const User=require('../db/model/user')

const adminAuth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded.role||decoded.role!=="Admin")
        {
            throw new Error()
        }
        const user= await User.findOne({_id:decoded._id,'tokens.token':token})
     
        if(!user)
        {
            throw new Error()
        }
       
        req.token=token
        req.user=user
        next()

    }catch(e){
        console.log(e)
        res.status(401).send({error:"please authenticate"})
    }
}
module.exports=adminAuth