const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { json } = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET,API_KEY} = require("../config/keys");
const requireLogin = require("../middleware/requireLogin")
const User = mongoose.model("User")
// Sending email using sendGrid
const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")
const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:API_KEY
    }
}))
// reset Password
const crypto=require("crypto");

router.get("/protected",requireLogin, async(req,res) =>{
    res.send("Hello User")
})

router.post('/signup',async(req,res)=>{
    const {name,email,password,pic}= req.body;
    var date=Date.now();
    if(!email || !password || !name){
        return(res.status(422).json({error:"please add all the fields!"}))
    }
    await User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser)
            return(res.status(422).json({error:"User already exists with this email "}))

            bcrypt.hash(password,12)
            .then(hashedPassword =>{
                const user = new User({
                    name,
                    email,
                    password:hashedPassword,
                    pic,
                    date
                })
                user.save()
                    .then(user =>{
                        transporter.sendMail({
                            to:user.email,
                            from:"bika6290@gmail.com",
                            subject:"SignUp Successfully!",
                            html:"<h1>You have successfully SignUp at https://rohit1coding.herokuapp.com/</h1>"
                        })
                        res.json({message:"successfully saved"})
                    })
                    .catch(err =>{
                        console.log(err)
                    })

            })
            
        })
        .catch(err =>{console.log(err)})
    
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return(res.status(404).json({error:"please enter email or password!!"}));
    await User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser)
            return(res.status(422).json({error:"Invalid email or password"}))
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                // res.json({message:"successfully sign in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic}=savedUser
                res.send({token, user:{_id,name,email,followers,following,pic}});   
            }
            else
            return(res.status(422).json({error:"Invalid email or password"}))

        })
        .catch(err =>{console.log(err)})
    })
});

router.post("/forgetPassword",async(req,res)=>{
    crypto.randomBytes(32,async(err,buffer)=>{
        if(err)
            return console.log(err);
        const token=buffer.toString('hex')
        User.findOne({email:req.body.email})
            .then(user=>{
                if(!user)
                    return(res.status(422).json({error:"Email does not exists!"}))
                if(user.name != req.body.name)
                    return(res.status(422).json({error:"Secrect Code does't Match!"}))
                
                user.resetToken=token
                user.expireToken=Date.now()+3600000
                user.save()
                    .then(()=>{
                        transporter.sendMail({
                            to:user.email,
                            from:"bika6290@gmail.com",
                            subject:"Reset Password!",
                            html:`<h1>Click <a href="https://rohit1coding.herokuapp.com/ForgetPassword/${token}">here</a> to reset Your password!</h1>
                            </br><p>Link in valid till ${user.expireToken}</p>`
                        })
                        res.json({message:"Check your Email!"})
                    })
                    .catch(err =>{console.log(err)})
            })
            .catch(err =>{console.log(err)})
            
    })
})

router.post("/newPassword",async(req,res)=>{
    const {token,password}=req.body;
    if(!password)
    return(res.status(422).json({error:"Please Enter password!"}))
    await User.findOne({resetToken:token})
        .then(user=>{
            if(!user)
                return(res.status(422).json({error:"Token has expired!"}))
            // if(user.expireToken>Date.now())
            //     return res.status(422).json({error:"Token is expired!"})
            bcrypt.hash(password,12)
                .then(hashedPassword=>{
                    user.password=hashedPassword;
                    user.token=undefined
                    user.expireToken=undefined
                    user.save().then((savedUser)=>{
                        res.json({message:"Password Successfully Updated!"})
                    })
                })
                .catch(err =>{console.log(err)})
        })
        .catch(err =>{console.log(err)})
})
module.exports = router;