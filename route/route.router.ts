import express from "express";
import { Request,Response } from "express";
import {body, validationResult,param} from "express-validator";
import { authenticateTokenAdmin } from "../user/user.router";
import * as routeService from "./route.service";

export const routeRouter = express.Router();
routeRouter.get("/",async (req:Request,res:Response) => {
    try
    {
        const route = await routeService.listRoutes();
        return res.status(200).json(route);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
// Get one 
routeRouter.get("/:id",
param("id").isNumeric(),
async (req:Request,res:Response) =>
{
    const id :number = parseInt(req.params.id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const route = await routeService.getRoute(id)
        if(route)    
        {
            return res.status(200).json(route);
        }
            return res.status(404).json("No route found with given Id");
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})

// POST: Create
routeRouter.post("/",
authenticateTokenAdmin,
body("parkId").isNumeric(),
body("Stops").isString(),
body("International").isBoolean(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const route = req.body;
        const newRoute = await routeService.createRoute(route);
        if(!newRoute){
            return res.status(400).json("Specified park does not exist");
        }
        return res.status(201).json(newRoute);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
);

// Update PUT
// Params : workHours,City,Street,Number,routesNumber
// Check if there is logic to test return value
routeRouter.put("/:id",
authenticateTokenAdmin,
param("id").isNumeric(),
body("parkId").optional().isNumeric(),
body("Stops").optional().isString(),
body("International").optional().isBoolean(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id : number = parseInt(req.params.id,10);
    try{
        const route = req.body;
        const updatedRoute = await routeService.updateRoute(route,id);
        if(!updatedRoute)
        {
            return res.status(404).json("Route with given Id or park was not found");
        }
        return res.status(200).json(route);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
)
// Delete route DELETE
routeRouter.delete("/:id",
authenticateTokenAdmin,
param("id").isNumeric(),
async (req:Request,res:Response) => {
    const id : number = parseInt(req.params.id,10);

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const deletedRoute = await routeService.deleteRoute(id);
        if(!deletedRoute)
        {
            return res.status(404).json("Route with given Id was not found");
        }
        return res.status(200).json(deletedRoute);
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
    
})
// Edge cases for Post,put,patch,delete
routeRouter.post("/:id",
authenticateTokenAdmin,
param("id").isNumeric(),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id : number = parseInt(req.params.id,10);
    const route = await routeService.getRoute(id);
    if(route)
    {
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Route with given Id was not found");
})
// put
routeRouter.put("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
routeRouter.patch("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
routeRouter.delete("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't delete whole collection, specify Id");
})
//not found
routeRouter.delete("/*",async (req:Request,res:Response) => {
    return res.status(404).json("Your requested website could not be found");
})
