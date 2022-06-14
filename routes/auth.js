import express from 'express';
import User from '../db/models/User.js';
import bcrypt from 'bcrypt';

const authRoute = express.Router();

//SIGN UP
authRoute.post('/signup', async (req,res)=>{
    try{
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
        });

        //Save the user and respond
        const user = await newUser.save();        
        res.status(200).json(user);;
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

//LOGIN
authRoute.post('/login', async (req,res)=>{
    try{
        //Find the user
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).json("User not found");
            return;
        }

        //Check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(400).json("Incorrect password");
            return;
        }

        //Respond with the user
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
        return;
    }
});

export default authRoute;