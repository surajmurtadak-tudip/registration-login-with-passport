const mongoose = require("mongoose");
const express = require("express");
const { error } = require("console");
const app = express();

mongoose.connect("mongodb://localhost:27017/passportData");

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserPassport = new mongoose.model("UserPassport",userSchema);

app.get("/register",(req,res)=>{
    const user1 = new UserPassport({
                username : "Suraj",
                password : "12345678"
            });
            user1.save()
            .then((data)=>{
                res.send(`data save successfully`);
            })
            .catch((err)=>{
                res.send(`something went wrong: ${err}`);
            });
});

app.get("/login",(req,res)=>{
    res.send("Login page");
});

app.listen(4000,()=>console.log("server up and running"));