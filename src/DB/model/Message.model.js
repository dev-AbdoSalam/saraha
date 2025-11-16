import mongoose, { model, Schema, Types } from "mongoose";

const messageSechema=new Schema({
    message:{type:String,required:true,minlength:5,maxlength:50000,trim:true},
    recipientId:{type:Types.ObjectId,ref:"User",required:true}
})

const messageModel=mongoose.models.Message||model("Message",messageSechema)
export default messageModel