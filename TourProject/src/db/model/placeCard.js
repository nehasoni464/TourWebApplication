const mongoose = require('mongoose')
const placeCard = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
    trim: true,
    validate(value) {
      if (value.length >= 350) {
        throw new Error('length error')
      }
    }},
    season:{
      required:true,
      trim:true,
      type:Array,
      validate(value){

        if(value.length>3){
          throw new Error('season limit upto 3only')
        }
        if(value.length==0){
          throw new Error('Enter atleast one season')
        }
       value.forEach(e => {
         if(e=="summer"||e=="winter"||e=="monsoon"){}
         else{
           throw new Error("entered wrong season")
         }
         
       });
      } 

    },
    packages:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"package"
    }],
    show:{
      type:Boolean,
      default:true
    },
    avatar:{
      type:String
    }

  },{
    timestamps:true
})



const places = mongoose.model('places', placeCard)
module.exports = places
