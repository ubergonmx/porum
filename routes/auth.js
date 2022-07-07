import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import emailValidator from 'deep-email-validator';
import fs from 'fs';
import User from '../db/models/User.js';
import Token from '../db/models/Token.js';
import Cloudinary from '../utils/cloudinary.js';
import { upload } from '../utils/multer.js';
import { isEqual } from '../utils/helper.js';
import { sendEmail } from '../utils/sendEmail.js';

const authRoute = express.Router();

//RETURN HOME PAGE
authRoute.get('/', (req, res) => {
    res.redirect('/home');
});

//SIGN UP
authRoute.post('/signup', upload.single('profile-img'), async (req,res)=>{
    try{
        const emailExist = await User.findOne({email: req.body.email});
        const usernameExist = await User.findOne({username: req.body.username});
        
        // deep-email-validator is timing out so I removed it for now
        // var { valid: emailValid } = await emailValidator.validate(req.body.email);
        // if(req.body.email.includes("@dlsu.edu.ph")
        // ||req.body.email.includes("@gmail.com")
        // ||req.body.email.includes("@yahoo.com")) emailValid = true;

        const emailValid = true;

        if(!emailExist && emailValid && !usernameExist){
            //Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            //Temporarily store the user data
            const userData = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phoneNumber: req.body.phoneNumber,
            }

            //If there is a profile image, add profileImg property
            if(req.file){
                // Local
                // userData.profileImg = req.file.destination.replaceAll('./public/', '') + req.file.filename;
                        
                // Cloudinary
                const profileImg = await Cloudinary.uploader.upload(req.file.path, { folder: `porum/users/profile-img` });
                userData.profileImg = profileImg.secure_url;
                //after upload, delete the local file
                fs.unlinkSync(req.file.path);
            }

            //Create a new user
            const newUser = new User(userData);

            //Save the user and respond
            const user = await newUser.save();        
            res.status(200).json({message: "User created"});
        }
        else{
            let message = "", errorFields = [];
            if(emailExist && usernameExist){
                message = "Email and username already exist.";
                errorFields = ["email", "username"];
            }
            else if(!emailValid && usernameExist){
                message = "Invalid email and username already exists.";
                errorFields = ["email", "username"];
            }
            else if(emailExist){
                message = " already exists.";
                errorFields = ["email"];
            }
            else if(!emailValid){
                message = "Please enter a valid email.";
                errorFields = ["email"];
            }
            else if(usernameExist){
                message = "Username already exists.";
                errorFields = ["username"];
            }
            res.status(400).json({error: message, fields: errorFields});            
        }
    }catch(err){
        console.log("ERROR-IN-AUTH");
        console.log(err);
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
            res.status(404).json("User not found.");
            return;
        }

        //Check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(400).json("Incorrect password.");
            return;
        }
        req.session.user=user;

        //Respond with the user
        res.sendStatus(200);
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

//LOGOUT
authRoute.delete('/logout', (req,res)=>{
    try{
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.status(400).send('Unable to log out');
                } else {
                    res.status(200).send('Logout successful');
                }
            });
        } else {
            res.end();
        }  
    }
    catch(err){
        res.status(500).json(err);
        return;
    }
});

//RESET PASSWORD
authRoute.post("/reset", async (req, res) => {
    try {
        // const schema = Joi.object({ email: Joi.string().email().required() });
        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email, username: req.body.username });
        if (!user)
            return res.status(400).send("User doesn't exist.");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/resetpassword/${user._id}.${token.token}`;

        const htmlTemplate = `<!DOCTYPE html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>[Porum] Reset Password Email</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover {text-decoration: underline !important;} </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: hsl(214, 100%, 96%);" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;">&nbsp;</td> </tr> <tr> <td style="text-align:center;"> <a href="https://porum-g12.herokuapp.com" title="logo" target="_blank"> <img width="100" src="https://porum-g12.herokuapp.com/images/design/logo.png" title="logo" alt="logo"> </a> </td> </tr> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested to reset your password</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> A unique link to reset your password has been generated for you. Please click the link below to reset your password. If you did not request to reset your password, please ignore this email. </p> <a href="${link}" style="background:hsl(205, 99%, 62%);text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a> </td> </tr> <tr> <td style="height:40px;">&nbsp;</td> </tr> </table> </td> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>porum-g12.herokuapp.com</strong></p> </td> </tr> <tr> <td style="height:80px;">&nbsp;</td> </tr> </table> </td> </tr> </table> </body> </html>`;
        await sendEmail(user.email, "[Porum] Password reset", htmlTemplate);

        res.send("Password reset link has been sent to your email account.");
    } catch (error) {
        res.send("An error occurred.");
        console.log(error);
    }
});

authRoute.post("/:userId.:token", async (req, res) => {
    try {
        // const schema = Joi.object({ password: Joi.string().required() });
        // const { error } = schema.validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("Link invalid or expired.");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Link invalid or expired.");

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
        await user.save();
        await token.delete();

        res.send("Password reset successfully.");
    } catch (error) {
        res.send("An error occurred.");
        console.log(error);
    }
});


export async function checkAuth(req, res, next){
    if(req.session.user){
        const user = await User.findById(req.session.user._id).lean();
        if(!isEqual(user, req.session.user))
            req.session.user = user;
        return next();
    }
    res.redirect('/login');
}

export function checkNoAuth(req, res, next){
    if(req.session.user){
        return res.redirect('/home');
    }
    next();    
}
export default authRoute;