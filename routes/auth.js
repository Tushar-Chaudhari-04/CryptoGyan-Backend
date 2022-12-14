const router=require("express").Router();
const User = require("../models/User");
const CryptoJS=require("crypto-js");
const JWT=require("jsonwebtoken");

//Register Section
router.post("/register",async(req,res)=>{
    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(              ///Encryption for User Password
            req.body.password,
            process.env.SECRET_PASS
            ).toString()
    });

    try{
        const savedUser=await newUser.save();
        console.log(savedUser);
        console.log("User Register Successfully")
        res.status(201).json(savedUser);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//Login
router.post("/login",async(req,res)=>{
    
    try{
        if(req.body.email!=null){
            const user=await User.findOne({userName:req.body.email});
        }else{
            res.status(402).json("Email is Not Given")
        }
        
        !user && res.status(401).json("Wrong Credentials");

        const hashPassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_PASS
        );

        const OriginalPassword=hashPassword.toString(CryptoJS.enc.Utf8);
        if(req.body.password!=null){
            OriginalPassword!=req.body.password &&
            res.status(401).json("Wrong Credentials are given.Please provide valid Credentials");
        }else{
            res.status(402).json("Password not Given")
        }
       
        
        const accessToken=JWT.sign(
        {
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SEC_KEY,
        {expiresIn:"3d"}
    );

        const {password,...others}=user._doc;

        res.status(201).json({...others,accessToken});

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;