const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register/SignUp
const registerUser = async(req,res)=>{
    
    try{
    const {name,username,email,password} = req.body;

    // Simple validation
    if(!name || !email || !username || !password){
        return res.status(400).json({message:'All fields are required'});
    }   
    // Checking if user already exists
    const existingUser = await User.findOne({$or:[{username},{email}]});
    if(existingUser){
        return res.status(409).json({message:'Username or Email is Already Taken!'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
                    name,
                    username,
                    email,
                    password:hashedPassword
    });
    return res.status(201).json({message:"User Successfully Registered!"});
    }

    catch(err){
        return res.status(500).json({message:"Something went wrong!",error:err.message});
    }
}

// Generate dummy hash once when the server starts
const DUMMY_PASSWORD = 'invalid-password';
const dummyHashPromise = bcrypt.hash(DUMMY_PASSWORD, 10);

// Login
const loginUser = async(req,res)=>{
    try{
        const {username,password} = req.body;

        // Input validation
        if(!username || !password){
            return res.status(400).json({message:'Username and password are required'});
        } 
        
        // Try to find User
        const user = await User.findOne({username});
        const hashedPassword = user ? user.password : await dummyHashPromise;
        const isMatch = await bcrypt.compare(password,hashedPassword);

        if(!user || !isMatch){
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const {password:_,...userData} = user._doc
        return res.status(200).json({message:"✔️Login Successful!",userData})
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong!",error:err.message});
    }
}

module.exports = {registerUser,loginUser};