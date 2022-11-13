import {park, prisma, Prisma, PrismaClient} from "@prisma/client"
import { start } from "repl";
import { getPark } from "../park/park.service";

const db = new PrismaClient();

export type RouteDTO = {
    Id : number,
    parkId : number,
    Stops :string,
    StartTime : Date,
    EndTime :Date,
    Late :boolean,
    LateBy : Date | null,
    International : boolean
};

export const listRoutes = async() : Promise<RouteDTO[]> => {
    return db.route.findMany({
        select:{
            Id : true,
            parkId : true,
            Stops :true,
            StartTime : true,
            EndTime :true,
            Late :true,
            LateBy : true,
            International :true
        }
    });
}
export const getRoute =async (id :number) : Promise<RouteDTO | null> =>{
    return db.route.findUnique( 
        {
            where : {
                Id : id
            },
            select:
            {
                Id : true,
                parkId : true,
                Stops :true,
                StartTime : true,
                EndTime :true,
                Late :true,
                LateBy : true,
                International :true
            }
        }
    )
}
export const createRoute = async (route : Omit<RouteDTO,"Id">) : Promise<RouteDTO | null> =>
{
    const {parkId,Stops,StartTime,EndTime,Late,LateBy,International} = route
    const park = await getPark(parkId);
    if(!park){
        return null;
    }
    return db.route.create({
        data:{
            parkId,
            Stops,
            StartTime,
            EndTime,
            Late,
            LateBy,
            International,
            
        },
        select:{
            Id : true,
            parkId : true,
            Stops :true,
            StartTime : true,
            EndTime :true,
            Late :true,
            LateBy : true,
            International :true
        }
    })
}
export const updateRoute =async (route:Omit<RouteDTO,"Id">, id : number) : Promise<RouteDTO | null> =>
{
    var findIfExists=  await getRoute(id);
    if(!findIfExists)
    {
        return null;
    }
    const {parkId,Stops,StartTime,EndTime,Late,LateBy,International} = route
    if(parkId)
    {
        const park = await getPark(parkId);
        if(!park){
            return null;
        }
    }

    return db.route.update({
        where:{
            Id:id
        },
        data:{
            parkId,
            Stops,
            StartTime,
            EndTime,
            Late,
            LateBy,
            International,
            
        },
        select:{
            Id : true,
            parkId : true,
            Stops :true,
            StartTime : true,
            EndTime :true,
            Late :true,
            LateBy : true,
            International :true
        }
    });
}
export const deleteRoute = async (id :number)  : Promise<RouteDTO | null> =>
{
    var route =  await getRoute(id);
    if(!route)
    {
        return null;
    }
    return db.route.delete({
        where:{
            Id :id
        },
        select:{
            Id : true,
            parkId : true,
            Stops :true,
            StartTime : true,
            EndTime :true,
            Late :true,
            LateBy : true,
            International :true
        }
    })
}