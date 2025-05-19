const mongoose=require('mongoose')

const paymentSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    payment_id:{
        type:mongoose.Schema.Types.ObjectId
    },
    success:{
        type:String,
    },
    reason:{
        type:String
    },
    Amount:{
        type:number
    }
})

module.exports=new mongoose.model("payment",paymentSchema)