import {User} from '../Models/userModel.js'
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../Utils/generateTokenAndSetCookie.js';
import {sendVerificationEmail} from '../Mailtrap/emails.js'


export const singup = async(req,res)=>{
    const {email,password, name} = req.body;
    try {
        if(!email || !password || !name){
            throw new Error('Enter all Details properly')
        }

        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({success:false,message:'User Already Exists'})

        const hashPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            email,
            name,
            password:hashPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24* 60 * 60 * 1000,
        })
        await user.save()

        //jwt
        generateTokenAndSetCookie(res,user._id)

        await sendVerificationEmail(user.email,verificationToken)

        res.status(201).json({
            success:true,
            message: 'User Created Successfully',
            useer:{
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

export const verifyEmail = async(req,res)=>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false, message: 'Invalid or expired verification code'})
        }
        user.isVerified= true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save()

        await SendWelcomeEmail(user.email,user.name)
    } catch (error) {
        
    }
}

export const login = async(req,res)=>{
    
}
export const logout = async(req,res)=>{
    res.send('signup route')
}