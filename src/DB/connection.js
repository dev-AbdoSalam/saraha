import mongoose from "mongoose"

export const connectionDB=async()=>{
    return await mongoose.connect(process.env.DB_URI).then(res=>{console.log("connectedDB success");
    }).catch(err=>{console.log("fail to connect",err);
    })
}