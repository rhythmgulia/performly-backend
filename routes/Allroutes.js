const paymentRouter=require('./Payment.router')
const express=require('express')

const allrouter=express.Router();

allrouter.use('/payment',paymentRouter)

module.exports=allrouter