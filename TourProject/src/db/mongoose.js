// const mongoose=require('mongoose')
// mongoose.connect(process.env.MONGODB),{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     findOneAndDelete:false,
//     findOneAndUpdate:false,
//     findAndModify:false
// }
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB, {
useNewUrlParser: true,
useCreateIndex: true,

})