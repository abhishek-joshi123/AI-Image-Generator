import express from "express";
import { body } from "express-validator";
import { logincontroller, registercontroller } from "../Controllers/auth.js";

const router = express.Router();

router.use('/register', [
    body('name','Enter a valid Name').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 8 characters').isLength({min:6})
], registercontroller);

router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password should contain atleast 6 characters').isLength({min:6})
], logincontroller);

export default router;
