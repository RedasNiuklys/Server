import express, { Express,Request,Response,Router } from 'express';
import * as https from 'https';
import * as fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import {parkRouter} from "./park/park.router";
import {routeRouter} from "./route/route.router";
import {busRouter} from "./bus/bus.router";


// Port check
dotenv.config()
if(!process.env.PORT)
{
  process.exit(1);
}
const PORT : number = parseInt(process.env.PORT as string,10); 

//Connection to HTTPS server
const privateKey  = fs.readFileSync('./certs/key-rsa.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const app : Express = express();

var httpsServer = https.createServer(credentials, app);
app.use(cors());
app.use(express.json());

httpsServer.listen(PORT,()=>
console.log("Listening on Port 8000"))


//Routers
app.use("/api/parks", parkRouter);
app.use("/api/routes",routeRouter);
app.use("/api/busses",busRouter)








