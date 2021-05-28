const mongoose=require('mongoose')

const register=new mongoose.Schema({
    name:{
  type:String,
  required:true
    },
     city:{
         type:String,
        required:true
     },
     mobileNumber:{
         type:Number,
         required:true
     },
     date:{
             type:Date,
            required:true
         },
         bookedUser:{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Person"
        },
        packageID:{
            type:mongoose.Schema.Types.ObjectId,
           ref:"Package"
       }
}
)
const registeredUser= mongoose.model('registeredUser', register)
module.exports= registeredUser