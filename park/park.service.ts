import {park, prisma, Prisma, PrismaClient} from "@prisma/client"
import { BusDTO } from "../bus/bus.service";
import { getRoute, RouteDTO } from "../route/route.service";

const db = new PrismaClient();
export type parkDTO = {
    Id : number,
    workHours : Prisma.JsonValue,
    City : string,
    Street : string,
    Number : string,
    routesNumber : number
}

export const listParks = async(pageNumber : number, pageSize : number) : Promise<parkDTO[]> => {
    if(pageNumber && pageSize)
    {
        return db.park.findMany(
            {
                skip : pageNumber > 1 ? pageSize*(pageNumber-1) : 0,
                take : pageSize,
                select:
                {
                    Id : true,
                    workHours : true,
                    City : true,
                    Street : true,
                    Number : true,
                    routesNumber : true,
                }
            }
        );
    }
    return db.park.findMany(
        {
            select:
            {
                Id : true,
                workHours : true,
                City : true,
                Street : true,
                Number : true,
                routesNumber : true,
            }
        }
    );

}
export const listRoutesByPark =async (id :number) : Promise<RouteDTO[] | null> =>{
    return db.route.findMany({
        where:{
            parkId : id
        },
        select:{
            Id : true,
            parkId : true,
            Stops :true,
            International :true
        }
    });
}
export const listBussesByRoute =async (parkId:number,id:number): Promise<BusDTO[] | null> => {
    const park = await getPark(parkId);
    if(!park) return null;
    const route = await getRoute(id);
    if(!route) return null;

    return db.bus.findMany({
        where:{
            routeId : id
        },
        select:{
            VIN :true,
            routeId:      true,
            NumberPlate : true,
            Tech_Inspection :  true,
            Mileage : true,
            StandingSpaces  : true,
            SittingSpaces : true,
            WC : true,
            StartTime : true,
            EndTime :true,
            Late :true,
            LateBy : true
        }
    });
}
export const getPark =async (id :number) : Promise<parkDTO | null> =>{
    return db.park.findUnique( 
        {
            where : {
                Id : id
            },
            select:
            {
                Id: true,
                workHours:true,
                City:true,
                Street:true,
                Number:true,
                routesNumber:true
            }
        }
    )
}
export const  createPark = async (park : Omit<parkDTO,"Id">) : Promise<parkDTO> =>
{
    const workHours = park.workHours as Prisma.JsonArray;
    const {City,Street,Number,routesNumber} = park
    return db.park.create({
        data:
        {
            workHours,
            City,
            Street,
            Number,
            routesNumber
        },
        select:
        {
            Id: true,
            workHours:true,
            City:true,
            Street:true,
            Number:true,
            routesNumber:true
        }
    })
}
export const updatePark =async (park:Omit<parkDTO,"Id">, id : number) : Promise<parkDTO | null> =>
{
    var checkIfExist = await getPark(id);

    if(!checkIfExist)
    {
        return null;
    }
    const workHours = park.workHours as Prisma.JsonArray;

    const {City,Street,Number,routesNumber} = park
    return db.park.update({
        where:{
            Id:id
        },
        data:{
            workHours,
            City,
            Street,
            Number,
            routesNumber
        },
        select:{
            Id: true,
            workHours:true,
            City:true,
            Street:true,
            Number:true,
            routesNumber:true
        }
    })
}
export const deletePark = async (id :number)  : Promise<parkDTO | null> =>
{
    var park = await getPark(id);

    if(!park)
    {
        return null;
    }
    return db.park.delete({
        where:{
            Id :id
        },
        select:{
            Id: true,
            workHours:true,
            City:true,
            Street:true,
            Number:true,
            routesNumber:true
        }
    })
}