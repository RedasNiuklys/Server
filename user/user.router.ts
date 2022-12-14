import express, { NextFunction } from "express";
import { Request,Response } from "express";
import {body, validationResult,param} from "express-validator";
import * as userService from "./user.service";
import * as busService from "../bus/bus.service";
import bcrypt from "bcrypt";
import { decode } from "punycode";

export const userRouter = express.Router();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
// Get one 
userRouter.post("/login",
body("Email").isString(),
body("Password").isString(),
async (req:Request,res:Response) =>
{
    const errors = validationResult(req)
    const email = req.body.Email;
    const password= req.body.Password;

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const user = await userService.login(email,password);
    if(user == null)
    {
        return res.status(401).json("Wrong email or password");
    }
    const token = generateAccessToken(req.body);

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
        console.log(user);
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
    const token = generateAccessToken(req.body);
    console.log(req.body);
    res.json(token);
  });

function generateAccessToken(user : userService.UserDTOToken){
    return jwt.sign({id : user.Id,email : user.Email,AccessLevel : user.AccessLevel},
         process.env.TOKEN_SECRET, { expiresIn: '1h' });
}
export function authenticateTokenAdmin(req : Request, res : Response, next : NextFunction ) {
    const token = req.header("Authorization")?.replace('Bearer ', '');
    if (token == null) return res.status(401).json("You need viable token");
    try{
        //console.log(token);
        //console.log(process.env.TOKEN_SECRET);

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET) 
        console.log(decoded);

        if(decoded.accessLevel !=  2)
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
export function authenticateTokenCurrUser(userId : number,req : Request, res : Response) {
    const token = req.header("Authorization")?.replace('Bearer ', '');
    if (token == null) return res.status(401).json("You need viable token");
    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET) 
        console.log(decoded);

        if(decoded.id !=  userId)
        {
            return res.status(403).json("Permission denied");   
        }
        res.setHeader("Authorization",token);
    }
    catch{
        return res.status(401).json("Invalid token");
    }
    return res.status(200).json("Correct token");
}


userRouter.get("/:id",
authenticateTokenCurrUser,
param("id").isNumeric(),
async (req:Request,res:Response) =>
{
    const id :number = parseInt(req.params.id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const user = await userService.getUser(id)
        if(user)    
        {
            return res.status(200).json(user);
        }
            return res.status(404).json("No user found with given Id");
    } 
    catch(error : any)
    {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
});
userRouter.get(":id/busses",
authenticateTokenCurrUser,
param("id").isNumeric(),
async (req:Request,res:Response) => {
    const id :number = parseInt(req.params.id,10);

    try
    {
        const bus = await busService.getLikedBusses(id);
        return res.status(200).json(bus);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
