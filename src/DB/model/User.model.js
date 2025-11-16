import mongoose, { model, Schema } from "mongoose";

const userSchema=new Schema({
    userName:{type:String,required:true,trim:true,minlength:2,maxlength:30},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmEmail:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},
    gender:{type:String,enum:["male","female"],default:"male"},
    role:{type:String,enum:["user","admin"],default:"user"},
    phone:String,
    image:String,
    Address:String,
    DOB:Date,
    changeCredientialsTime:Date,
},{timestamps:true})
const userModel=mongoose.models.User||model("User",userSchema)
export default userModel