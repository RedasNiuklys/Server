import express from "express";
import { Request,Response } from "express";
import {body, param, query, validationResult} from "express-validator";
import { authenticateToken } from "../user/user.router";
import * as parkService from "./park.service";

export const parkRouter = express.Router();

//GET Many
parkRouter.get("/",
query("pageNumber").optional().isInt({min : 1}),
query("pageSize").optional().isInt({min : 1}),
async (req:Request,res:Response) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    var pageNumber : number = parseInt(req.query.pageNumber as string);
    var pageSize : number= parseInt(req.query.pageSize as string);
    try
    {
        const parks = await parkService.listParks(pageNumber,pageSize);
        return res.status(200).json(parks);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
//Get many routes
parkRouter.get("/:parkId/routes",
param("parkId").isNumeric(),
async (req:Request,res:Response) =>
{
    const parkId : number = parseInt(req.params.parkId,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const routes = await parkService.listRoutesByPark(parkId)
        if(!routes)    
        {
            return res.status(404).json("No park found with given Id");
        }
        return res.status(200).json(routes);
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
//Get many busses
parkRouter.get("/:parkId/routes/:Id/busses/",
param("parkId").isNumeric(),
param("Id").isNumeric(),
async (req:Request,res:Response) =>
{
    const parkId : number = parseInt(req.params.parkId,10);
    const Id :number = parseInt(req.params.Id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const busses = await parkService.listBussesByRoute(parkId,Id);
        if(!busses){
            return res.status(404).json("There is no route or park with specified Ids")
        }
        return res.status(200).json(busses);
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
})
// Get one 
parkRouter.get("/:id",
param("id").isNumeric(),
async (req:Request,res:Response) =>
{    
    const id :number = parseInt(req.params.id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const park = await parkService.getPark(id)
        if(park)    
        {
            return res.status(200).json(park);
        }
            return res.status(404).json("No park found with given Id");
    } 
    catch(error : any)
    {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
})

// POST: Create
// Params : workHours,City,Street,Number,routesNumber
parkRouter.post("/",
authenticateToken,
body("City").isString(),
body("Street").isString(),
body("Number").isString(),
body("routesNumber").isInt({min : 1}),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const park = req.body;
        const newPark = await parkService.createPark(park);
        return res.status(201).json(park);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
);

// Update PUT
parkRouter.put("/:id",
authenticateToken,
param("id").isNumeric(),
body("workHours").optional(),
body("City").optional().isString(),
body("Street").optional().isString(),
body("Number").optional().isString(),
body("routesNumber").optional().isInt({min : 1}),
async (req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const id : number = parseInt(req.params.id,10);
    try{
        const park = req.body;
        const updatedPark = await parkService.updatePark(park,id);
        if(!updatedPark)
        {
            return res.status(404).json("Park with given Id was not found");
        }
        return res.status(200).json(updatedPark);
    }
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
}
)
// Delete park DELETE
parkRouter.delete("/:id",
authenticateToken,
param("id").isNumeric(),
async (req:Request,res:Response) => {
    const id : number = parseInt(req.params.id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const deletedPark = await parkService.deletePark(id);
        if(!deletedPark)
        {
            return res.status(404).json("Park with given Id was not found");
        }
        return res.status(200).json(deletedPark);
    } 
    catch(error : any)
    {
        return res.status(500).json(error.message)
    }
    
})
// Edge cases for Post,put,patch,delete
parkRouter.post("/:id",
param("id").isNumeric(),
async (req:Request,res:Response) => {
    const id : number = parseInt(req.params.id,10);
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const park = await parkService.getPark(id);
    if(park)
    {
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Park with given Id was not found");
})
// put
parkRouter.put("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
//patch
parkRouter.patch("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't update whole collection, specify Id");
})
//delete
parkRouter.delete("/",async (req:Request,res:Response) => {
    return res.status(405).json("You can't delete whole collection, specify Id");
})

//not found
parkRouter.get("/*",async (req:Request,res:Response) => {
    return res.status(404).json("We could not find the wanted site");
})