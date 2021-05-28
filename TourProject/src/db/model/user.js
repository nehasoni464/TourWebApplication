const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')


const person= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length< 6 ||( value.includes('password')))
            {
                throw new Error('error')
            }
        }
    },
    confirmPassword:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    checkedA:{
        type:Boolean,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true

        }
    }]

},{
    timestamps:true
}

)



person.methods.toJSON=function () {
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

person.methods.generateAuthTaken= async function(){
    const user= this
    const token= jwt.sign({_id:user._id.toString(),role:user.role},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}




person.statics.findByCredientials=async (email, password)=>{
    
    const user = await Person.findOne({email})
    
    if(!user){
        throw new Error ('User Not Found!! Please Signup')
    }
   const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Incorrect password!! TRY AGAIN")
    }
    return user
}


person.pre('save', async function(next){
    const user=this
    
    if (user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
        user.confirmPassword=await  bcrypt.hash(user.password,8)
    }
    next()
})


const Person = mongoose.model('Person',person)


module.exports=Person


