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
exports.createLikedBus = exports.getLikedBusses = exports.deleteBus = exports.updateBus = exports.createBus = exports.getBus = exports.listBusses = void 0;
const client_1 = require("@prisma/client");
const route_service_1 = require("../route/route.service");
const db = new client_1.PrismaClient();
const listBusses = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.bus.findMany({
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true
        }
    });
});
exports.listBusses = listBusses;
const getBus = (VIN) => __awaiter(void 0, void 0, void 0, function* () {
    return db.bus.findUnique({
        where: {
            VIN: VIN
        },
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true
        }
    });
});
exports.getBus = getBus;
const createBus = (bus) => __awaiter(void 0, void 0, void 0, function* () {
    const { VIN, routeId, NumberPlate, Tech_Inspection, Mileage, StandingSpaces, SittingSpaces, WC } = bus;
    const checkIfExist = yield (0, exports.getBus)(bus.VIN);
    if (checkIfExist) {
        return null;
    }
    if (routeId == null) {
        return null;
    }
    const route = yield (0, route_service_1.getRoute)(routeId);
    if (!route) {
        return null;
    }
    return db.bus.create({
        data: {
            VIN,
            routeId,
            NumberPlate,
            Tech_Inspection,
            Mileage,
            StandingSpaces,
            SittingSpaces,
            WC
        },
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true
        }
    });
});
exports.createBus = createBus;
const updateBus = (bus, VIN) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfExist = yield (0, exports.getBus)(VIN);
    if (!checkIfExist) {
        return null;
    }
    const { routeId, NumberPlate, Tech_Inspection, Mileage, StandingSpaces, SittingSpaces, WC } = bus;
    if (routeId == null) {
        return null;
    }
    const route = yield (0, route_service_1.getRoute)(routeId);
    if (!route) {
        return null;
    }
    return db.bus.update({
        where: {
            VIN: VIN
        },
        data: {
            VIN,
            routeId,
            NumberPlate,
            Tech_Inspection,
            Mileage,
            StandingSpaces,
            SittingSpaces,
            WC
        },
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true
        }
    });
});
exports.updateBus = updateBus;
const deleteBus = (VIN) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfExist = yield (0, exports.getBus)(VIN);
    if (!checkIfExist) {
        return null;
    }
    return db.bus.delete({
        where: {
            VIN: VIN
        },
        select: {
            VIN: true,
            routeId: true,
            NumberPlate: true,
            Tech_Inspection: true,
            Mileage: true,
            StandingSpaces: true,
            SittingSpaces: true,
            WC: true
        }
    });
});
exports.deleteBus = deleteBus;
const getLikedBusses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return db.likedbusses.findMany({
        where: {
            userId: userId
        },
        include: {
            bus: true
        }
    });
});
exports.getLikedBusses = getLikedBusses;
const createLikedBus = (userId, busId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfExist = yield (0, exports.getBus)(busId);
    if (checkIfExist) {
        return null;
    }
    return db.likedbusses.create({
        data: {
            userId,
            busId
        },
        select: {
            Id: true,
            userId: true,
            busId: true
        }
    });
});
exports.createLikedBus = createLikedBus;
