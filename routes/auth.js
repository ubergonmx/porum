import express from 'express';
import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

const authRoute = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
});
const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 1024*1024*5 },
    fileFilter: fileFilter
});

//RETURN HOME PAGE
authRoute.get('/', (req, res) => {
    res.redirect('/home');
});

//SIGN UP
authRoute.post('/signup', upload.single('profile-img'), async (req,res)=>{
    try{
        const emailExist = await User.findOne({email: req.body.email});
        const usernameExist = await User.findOne({username: req.body.username});
        if(!emailExist && !usernameExist){
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
                userData.profileImg = req.file.path.replaceAll("public\\", "")
            }

            //Create a new user
            const newUser = new User(userData);

            //Save the user and respond
            const user = await newUser.save();        
            res.status(200).json({message: "User created"});
        }
        else{
            if(emailExist && !usernameExist){
                res.status(400).json({error:"Email already exists.", fields:["email"]});
            }
            else if(!emailExist && usernameExist){
                res.status(400).json({error:"Username already exists.", fields:["username"]});
            }
            else{
                res.status(400).json({error:"Email and username already exists.", fields:["email", "username"]});
            }
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

export function checkAuth(req, res, next){
    if(req.session.user){
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