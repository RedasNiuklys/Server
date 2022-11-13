import {park, prisma, Prisma, PrismaClient} from "@prisma/client"
import { getPark } from "../park/park.service";
import { getRoute } from "../route/route.service";

const db = new PrismaClient();
export type BusDTO = {
    VIN : string,
    routeId:      number| null
    NumberPlate :    string
    Tech_Inspection :  Date
    Mileage : number
    StandingSpaces  : number,
    SittingSpaces : number
    WC : boolean
};

export const listBusses = async() : Promise<BusDTO[]> => {
    return db.bus.findMany({
        select:{
            VIN :true,
            routeId:      true,
            NumberPlate : true,
            Tech_Inspection :  true,
            Mileage : true,
            StandingSpaces  : true,
            SittingSpaces : true,
            WC : true
        }
    });
}
export const getBus =async (VIN :string) : Promise<BusDTO | null> =>{
    return db.bus.findUnique( 
        {
            where : {
                VIN: VIN
            },
            select:{
                VIN :true,
                routeId:      true,
                NumberPlate : true,
                Tech_Inspection :  true,
                Mileage : true,
                StandingSpaces  : true,
                SittingSpaces : true,
                WC : true
            }
        }
    )
}
export const createBus = async (bus : BusDTO) : Promise<BusDTO | null> =>
{
    const {VIN,routeId,NumberPlate,Tech_Inspection,Mileage,StandingSpaces,SittingSpaces,WC} = bus
    const checkIfExist = await getBus(bus.VIN);
    if(checkIfExist)
    {
        return null;
    }
    if(routeId == null)
    {
        return null;
    }
    const route = await getRoute(routeId);
    if(!route){
        return null;
    }
    return db.bus.create({
        data:
        {
            VIN,
            routeId,
            NumberPlate,
            Tech_Inspection,
            Mileage,
            StandingSpaces,
            SittingSpaces,
            WC
        },
        select:
        {
            VIN :true,
            routeId:      true,
            NumberPlate : true,
            Tech_Inspection :  true,
            Mileage : true,
            StandingSpaces  : true,
            SittingSpaces : true,
            WC : true
        }
    })
}
export const updateBus =async (bus:BusDTO, VIN : string) : Promise<BusDTO | null> =>
{
    const checkIfExist = await getBus(VIN);
    if(!checkIfExist)
    {
        return null;
    }
    const {routeId,NumberPlate,Tech_Inspection,Mileage,StandingSpaces,SittingSpaces,WC} = bus
    if(routeId == null)
    {
        return null;
    }

    const route = await getRoute(routeId);
    if(!route){
        return null;
    }
    return db.bus.update({
        where:{
            VIN : VIN
        },
        data:
        {
            VIN,
            routeId,
            NumberPlate,
            Tech_Inspection,
            Mileage,
            StandingSpaces,
            SittingSpaces,
            WC
        },
        select:
        {
            VIN :true,
            routeId:      true,
            NumberPlate : true,
            Tech_Inspection :  true,
            Mileage : true,
            StandingSpaces  : true,
            SittingSpaces : true,
            WC : true
        }
    });
}
export const deleteBus = async (VIN : string)  : Promise<BusDTO | null> =>
{
    const checkIfExist = await getBus(VIN);
    if(!checkIfExist)
    {
        return null;
    }
    return db.bus.delete({
        where:{
            VIN:VIN
        },
        select:{
            VIN :true,
            routeId:      true,
            NumberPlate : true,
            Tech_Inspection :  true,
            Mileage : true,
            StandingSpaces  : true,
            SittingSpaces : true,
            WC : true
        }
    })
}