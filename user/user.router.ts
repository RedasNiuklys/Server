import express, { NextFunction } from "express";
import { Request,Response } from "express";
import {body, validationResult,param} from "express-validator";
import * as userService from "./user.service";
import bcrypt from "bcrypt";
import { decode } from "punycode";

export const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
// Get one 
userRouter.get("/login",
body("Username").isString(),
async (req:Request,res:Response) =>
{
    const errors = validationResult(req)
    const username = req.body.Username;
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    return res.status(200).json("Can Login");
})

// POST: Create
userRouter.post("/register", async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const user = req.body;
        const newUser = await userService.createUser(user);
        if(!newUser){
            return res.status(400).json("There is already user with this Email");
        }
        return res.status(201).json(newUser);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
);
userRouter.post('/createNewUser', async (req:Request,res:Response)  => {
    // ...
    console.log("I am working");
    console.log(req.params.Email);
    console.log(process.env.TOKEN_SECRET)
    const token = generateAccessToken(req.body);
    console.log(token);
    res.json(token);
  
    // ...
  });

  function generateAccessToken(user : userService.UserDTOToken){
    return jwt.sign({id : user.Id,email : user.Email,isAdmin : user.IsAdmin},
         process.env.TOKEN_SECRET, { expiresIn: '1h' });
  }
  export function authenticateToken(req : Request, res : Response, next : NextFunction ) {
    const token = req.header("Authorization")?.replace('Bearer ', '');
    if (token == null) return res.status(401).json("You need viable token");
    try{
        console.log(token);
        console.log(process.env.TOKEN_SECRET);

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(decoded);
        if(!decoded.isAdmin)
        {
            return res.status(403).json("Permission denied");   
        }
        res.setHeader("Authorization",token);
    }
    catch{
        return res.status(401).json("Invalid token");
    }
    return next()
}