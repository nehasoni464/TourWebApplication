const mongoose=require('mongoose')

const tourPackages=new mongoose.Schema({
    title:{
  type:String
    },
     food:{
         type:Boolean,
         //required:true
     },
     price:{
         type:Number,
         //required:true
     },
     hotelCategory:{
         type:Number,
         validate(value){
          if(value<=0 || value>5){
              throw new Error("Hotel Rating  should be R>0 and R<=5")

          }
         }},
         days:{
             type:Number,
            // required:true
         },
         night:{
         type:Number,
         //night!<=days
         //required:true
         },
         adventures:{
             type:Boolean, 
             //required:true
         }
         ,
         show:{
           type:Boolean,
           default:true
         },
         rating:{
             type:Array
         },
         avatar:{
           type:Array, 
           default:[]
         },
         description:{
             type:String
         }



})
const packages= mongoose.model('package', tourPackages)
module.exports= packages