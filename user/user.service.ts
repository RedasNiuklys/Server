import {park, prisma, Prisma, PrismaClient} from "@prisma/client"
import { start } from "repl";
import { getPark } from "../park/park.service";
import bcrypt from "bcrypt";




const db = new PrismaClient();

export type UserDTO = {
    Id : number,
    Email : string,
    Username : string,
    Password : string,
    IsAdmin : boolean,

};
export const login =async (email :string ) : Promise<UserDTO | null> =>{
    return db.user.findFirst( 
        {
            where : {
                Email : email
            },
            select:
            {
                Id : true,
                Email : true,
                Username : true,
                Password : true,
                IsAdmin : true
            }
        }
    )
}
export const createUser = async (user : Omit<UserDTO,"Id">) : Promise<UserDTO | null> =>
{
    const {Email,Username,IsAdmin} = user
    const saltRounds = 8
    var Password : string = user.Password;
    var Password : string = await bcrypt.hash(Password, saltRounds);
    const userLog = login(Email);
    if(userLog != null ) return null;

    return db.user.create({
        data:{
            Email,
            Username,
            Password,
            IsAdmin
            
        },
        select:{
            Id : true,
            Email : true,
            Username : true,
            Password : true,
            IsAdmin : true
        }
    })
}

