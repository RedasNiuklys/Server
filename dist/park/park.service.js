"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePark = exports.updatePark = exports.createPark = exports.getPark = exports.listBussesByRoute = exports.listRoutesByPark = exports.listParks = void 0;
const client_1 = require("@prisma/client");
const route_service_1 = require("../route/route.service");
const db = new client_1.PrismaClient();
const listParks = (pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    if (pageNumber && pageSize) {
        return db.park.findMany({
            skip: pageNumber > 1 ? pageSize * (pageNumber - 1) : 0,
            take: pageSize,
            select: {
                Id: true,
                workHours: true,
                City: true,
                Street: true,
                Number: true,
                routesNumber: true,
            }
        });
    }
    return db.park.findMany({
        select: {
            Id: true,
            workHours: true,
            City: true,
            Street: true,
            Number: true,
            routesNumber: true,
        }
    });
});
exports.listParks = listParks;
const listRoutesByPark = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.route.findMany({
        where: {
            parkId: id
        },
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            International: true
        }
    });
});
exports.listRoutesByPark = listRoutesByPark;
const listBussesByRoute = (parkId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const park = yield (0, exports.getPark)(parkId);
    if (!park)
        return null;
    const route = yield (0, route_service_1.getRoute)(id);
    if (!route)
        return null;
    return db.bus.findMany({
        where: {
            routeId: id
        },
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true
        }
    });
});
exports.listBussesByRoute = listBussesByRoute;
const getPark = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.park.findUnique({
        where: {
            Id: id
        },
        select: {
            Id: true,
            workHours: true,
            City: true,
            Street: true,
            Number: true,
            routesNumber: true
        }
    });
});
exports.getPark = getPark;
const createPark = (park) => __awaiter(void 0, void 0, void 0, function* () {
    const workHours = park.workHours;
    const { City, Street, Number, routesNumber } = park;
    return db.park.create({
        data: {
            workHours,
            City,
            Street,
            Number,
            routesNumber
        },
        select: {
            Id: true,
            workHours: true,
            City: true,
            Street: true,
            Number: true,
            routesNumber: true
        }
    });
});
exports.createPark = createPark;
const updatePark = (park, id) => __awaiter(void 0, void 0, void 0, function* () {
    var checkIfExist = yield (0, exports.getPark)(id);
    if (!checkIfExist) {
        return null;
    }
    const workHours = park.workHours;
    const { City, Street, Number, routesNumber } = park;
    return db.park.update({
        where: {
            Id: id
        },
        data: {
            workHours,
            City,
            Street,
            Number,
            routesNumber
        },
        select: {
            Id: true,
            workHours: true,
            City: true,
            Street: true,
            Number: true,
            routesNumber: true
        }
    });
});
exports.updatePark = updatePark;
const deletePark = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var park = yield (0, exports.getPark)(id);
    if (!park) {
        return null;
    }
    return db.park.delete({
        where: {
            Id: id
        },
        select: {
            Id: true,
            workHours: true,
            City: true,
            Street: true,
            Number: true,
            routesNumber: true
        }
    });
});
exports.deletePark = deletePark;
