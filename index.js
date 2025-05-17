const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Allrouters=require('./routes/Allroutes')
const mongoose=require('./db/connection')
require("dotenv").config();

const app= express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080

app.use('/api',Allrouters)

app.use((req,res)=>{
    res.status(404).send(`<html>
    <head>
        <title>404</title>
    </head>
    <body>
        <h1>PAGE NOT FOUND</h1>
    </body>
</html>`)
 })

app.listen(PORT,(err)=>{
    if(err)
        console.log("err",err);
    console.log("server listening on 8080")
});

module.exports = app;