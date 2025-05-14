const {createRazorpayInstance} =require('../../config/razorpay.config')
require('dotenv').config()
const crypto=require('crypto')

const razorpayInstance=createRazorpayInstance()

exports.createOrder=async(req,res)=>{
    const body=req.body;

    const options={
        amount:amount*100,
        currency:"INR",
        receipt:`receipt_order_1`
    }
    try{
        razorpayInstance.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something Went Wrong"
                })
            }
            return res.status(200).json(order)
        })
    }
    catch(err){
        return res.status(500).json({success:false,message:"Some Error Occured"})
    }
}

exports.verifyPayment=async(req,res)=>{
    const {order_id,payment_id,signature}=req.body

    const secret=process.env.RAZORPAY_KEY_SECRET;

    const hmac=crypto.createHmac("sha256",secret)

    hmac.update(order_id+"|"+payment_id)

    const generatedSignature=hmac.digest('hex')

    if(generatedSignature==signature){
        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Payment Not Verified"
        })
    }
}