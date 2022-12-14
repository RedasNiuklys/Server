import express from "express";
import { Request,Response } from "express";
import {body, validationResult,param} from "express-validator";
import { authenticateTokenAdmin, authenticateTokenCurrUser } from "../user/user.router";
import * as busService from "./bus.service";

export const busRouter = express.Router();

busRouter.get("/",async (req:Request,res:Response) => {
    try
    {
        const bus = await busService.listBusses();
        return res.status(200).json(bus);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
// Get one 
busRouter.get("/:id",
param("id").isLength({min : 11, max : 17}).isString(),
async (req:Request,res:Response) =>
{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const bus = await busService.getBus(req.params.id)
        if(bus)    
        {
            return res.status(200).json(bus);
        }
            return res.status(404).json("No bus found with given Id");
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})

// POST: Create
busRouter.post("/",
authenticateTokenAdmin,
body("VIN").isLength({min : 11, max : 17}).isString(),
body("routeId").isInt({min : 1}),
body("Tech_Inspection").isISO8601().toDate(),
body("Mileage").isInt({min : 0}),
body("StandingSpaces").isInt({min : 0}),
body("SittingSpaces").isInt({min :0}),
body("WC").isBoolean(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const bus = req.body;
        const newBus= await busService.createBus(bus);
        if(newBus == null){
            return res.status(400).json("Specified VIN already exist");
        }
        return res.status(201).json(newBus);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
);
busRouter.post("/:userId/:id",
param("id").isLength({min : 11, max : 17}).isString(),
param("userId").isNumeric(),
async (req:Request,res:Response) => {
    const errors = validationResult(req);
    const id = req.params.id;
    const userId = Number(req.params.userId);
    authenticateTokenCurrUser(userId,req,res);
    if(res.statusCode != 200)
    {
        
    }
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const newBus= await busService.createLikedBus(userId,id);
        if(newBus == null){
            return res.status(400).json("Specified VIN already exist");
        }
        return res.status(201).json(newBus);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
});

// Update PUT
busRouter.put("/:id",
authenticateTokenAdmin,
param("id").isLength({min : 11, max : 17}).isString(),
body("routeId").optional().isInt({min : 1}),
body("Tech_Inspection").optional().isISO8601().toDate(),
body("Mileage").optional().isInt({min : 0}),
body("StandingSpaces").optional().isInt({min : 0}),
body("SittingSpaces").optional().isInt({min :0}),
body("WC").optional().isBoolean(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const bus = req.body;
        const updatedBus= await busService.updateBus(bus,req.params.id);
        if(!updatedBus)
        {
            return res.status(404).json("Bus with given Id or route was not found");
        }
        return res.status(200).json(bus);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
)
// Delete bus DELETE
busRouter.delete("/:id",
authenticateTokenAdmin,
param("id").isLength({min : 11, max : 17}).isString(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const deletedBus= await busService.deleteBus(req.params.id);
        if(!deletedBus)
        {
            return res.status(404).json("Bus with given VIN was not found");
        }
        return res.status(200).json(deletedBus);
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
    
})

// Edge cases for Post,put,patch,delete
busRouter.post("/:id",
param("id").isLength({min : 11, max : 17}).isString(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const bus = await busService.getBus(req.params.id);
    if(bus)
    {
        
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Bus with given Id was not found");
})
// put
busRouter.put("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
busRouter.patch("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
busRouter.delete("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't delete whole collection, specify Id");
})
//not found
busRouter.delete("/*",async (req:Request,res:Response) => {
    return res.status(404).json("Your requested website could not be found");
})