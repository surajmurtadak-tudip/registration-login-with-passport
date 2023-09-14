const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.get("/register",(req,res)=>{
    res.send("Registration page");
});

app.get("/login",(req,res)=>{
    res.send("Login page");
});

app.listen(4000,()=>console.log("server up and running"));