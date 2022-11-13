"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const park_router_1 = require("./park/park.router");
const route_router_1 = require("./route/route.router");
const bus_router_1 = require("./bus/bus.router");
// Port check
dotenv_1.default.config();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
//Connection to HTTPS server
// const privateKey  = fs.readFileSync('./certs/key-rsa.pem', 'utf8');
// const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');
// const credentials = {key: privateKey, cert: certificate};
const app = (0, express_1.default)();
// var httpsServer = https.createServer(credentials, app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(PORT, () => console.log("Listening on Port 8000"));
//Routers
app.use("/api/parks", park_router_1.parkRouter);
app.use("/api/routes", route_router_1.routeRouter);
app.use("/api/busses", bus_router_1.busRouter);
