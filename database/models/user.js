import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema =mongoose.Schema({
    name:{
        type:String ,
        trim:true ,
        required:true
    } ,
    gender:{
        type:String ,
        enum:['male','female'],
        required:true
    },
    email:{
        type: String,
        trim:true ,
        required: true
    } ,
    phone:{
        type:String ,
        trim:true ,
        required:true
    } ,
    password:{
        type:String ,
        minLength:[6, 'Password should be at least 6 characters'],
        required:true
    } ,
    confrimEmail:{
        type:Boolean ,
        default:false
    },
    imgCover:{
        type:String ,
        default:null
    } ,
    companyName:{
        type:String 
    },
    role:{
        type:String ,
        enum:['user' , 'admin'] ,
        default:'user'
    },
 
    logout:Date
},{timestamps:true})

userSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password ,7)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
 })

export const userModel =mongoose.model('user',userSchema)