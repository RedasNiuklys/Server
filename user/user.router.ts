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
    const username = req.params.Username;
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
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
userRouter.post('createNewUser', async (req:Request,res:Response)  => {
    // ...
  
    const token = generateAccessToken(req.params.Username);
    res.json(token);
  
    // ...
  });

  function generateAccessToken(email : string){
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '300s' });
  }
  export function authenticateToken(req : Request, res : Response, next : NextFunction ) {
    const token = req.header("Authorization")?.replace('Bearer ',"")  
    if (token == null) return res.sendStatus(401).json("You need viable token");
    try{
        const decoded : userService.UserDTO = jwt.verify(token, process.env.TOKEN_SECRET as string)
        if(!decoded.IsAdmin)
        {
            return res.sendStatus(403).json("Permission denied");   
        }
        req.body.
    }
    catch{
        return res.sendStatus(401).json("Invalid token");
    }
    return next()
}