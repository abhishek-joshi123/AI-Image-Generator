import userModel from '../Models/Usermodel.js'
import { validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
import {HashPassword, ComparePassword} from '../Helper/Auth.js'


export const registercontroller = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
    }

    const {name, email, password} = req.body;
    
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(400).send({
                success: false,
                Esuccess:false,
                message: 'User already exists'
            })
        }

        const HashedPassword = await HashPassword(password)

        const user = await new userModel({name, email, password:HashedPassword}).save()

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
    const user = await userModel.find({email});
}

export const logincontroller = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false, Esuccess: true, errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const isExistingUser = await userModel.findOne({email})
        if(!isExistingUser) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please login with correct email or phone"
            })
        }

        const passwordCompare = await ComparePassword(password, isExistingUser.password)

        if(!passwordCompare) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please enter the password correctly"
            })
        }

        const auth_token = JWT.sign({_id:isExistingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(201).send({
            success: true,
            message: 'You are Loged in successfully',
            user: {
                name: isExistingUser.name,
                email: isExistingUser.email,
            },
            auth_token
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in login",
            error 
        })
    }
}
