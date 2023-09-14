const mongoose = require("mongoose");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");
const path = require("path");

mongoose.connect("mongodb://localhost:27017/passportData");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(session({
    secret : "ACBD1234",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});

userSchema.plugin(passportLocalMongoose);

const UserPassport = new mongoose.model("UserPassport",userSchema);

passport.use(UserPassport.createStrategy());
passport.serializeUser(UserPassport.serializeUser());
passport.deserializeUser(UserPassport.deserializeUser());


app.post("/registration",(req,res)=>{
    let userName = req.body.username;
    let userPass = req.body.password;
    UserPassport.register({username:userName},userPass,(err,user)=>{
        if(err){
            res.send(`error : ${err}`);
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.send(`successfully register`);
            });
        }
    });
});

app.post("/login",(req,res)=>{
    const user1 = new UserPassport({
        username : req.body.username,
        password : req.body.password
    });
    req.login(user1,(err)=>{
        if(err){
            res.send(`error : ${err}`);
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.send("login successfull");
            });
        }
    });
});

app.listen(4000,()=>console.log("server up and running"));