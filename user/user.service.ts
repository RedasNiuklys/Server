import {PrismaClient} from "@prisma/client"

import bcrypt from "bcrypt";

const db = new PrismaClient();

export type UserDTO = {
    Id : number,
    Email : string,
    Username : string,
    Password : string,
    AccessLevel : number;
};

export type UserDTOToken = {
    Id : number,
    Email : string,
    AccessLevel : number,

}
export const checkEmail = async (Email :string) : Promise<UserDTO | null> =>{
    return db.user.findFirst( 
        {
            where : {
                Email  
            },
            select:
            {
                Id : true,
                Email : true,
                Username : true,
                Password : true,
                AccessLevel : true
            }
        }
    )
}
export const login = async(email: string,pass : string) : Promise<UserDTO | null> =>
{
    const saltRounds = 8;
    var password :string  = await bcrypt.hash(pass, saltRounds);
    console.log(password)
    var user = await checkEmail(email);
    console.log(user);
    if(user)
    {
        if(await bcrypt.compare(pass,user.Password))
        return user;
        else return null;
    }
    return null;
}
export const createUser = async (user : Omit<UserDTO,"Id">) : Promise<UserDTO | null> =>
{
    const {Email,Username,Password} = user
    const saltRounds = 8
    var password : string = await bcrypt.hash(Password, saltRounds);
    console.log(password.length);
    const userLog = await checkEmail(Email);
    console.log(userLog);
    if(userLog != null ) return null;

    return db.user.create({
        data:{
            Email,
            Username,
            Password : password,
            
        },
        select:{
            Id : true,
            Email : true,
            Username : true,
            Password : true,
            AccessLevel : true
        }
    })
}
export const getUser  =async (id : number ) : Promise<UserDTO | null> =>{
    return db.user.findFirst( 
        {
            where : {
                Id : id
            },
            select:
            {
                Id : true,
                Email : true,
                Username : true,
                Password : true,
                AccessLevel : true
            }
        }
    )
}
export const updateUser  =async (id : number,userData : UserDTO ) : Promise<UserDTO | null> =>{
    const {Email,Username,Password,AccessLevel} = userData
    return db.user.update( 
        {
            where : {
                Id : id
            },
            data:{
                Email,
                Username,
                Password,
                AccessLevel
                
            },
            select:{
                Id : true,
                Email : true,
                Username : true,
                Password : true,
                AccessLevel : true
            }
            });
}

export const deleteUser  =async (id : number ) : Promise<UserDTO | null> =>{
    return db.user.findFirst( 
        {
            where : {
                Id : id
            },
            select:
            {
                Id : true,
                Email : true,
                Username : true,
                Password : true,
                AccessLevel : true
            }
        }
    );
}


