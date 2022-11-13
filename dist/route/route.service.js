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
exports.deleteRoute = exports.updateRoute = exports.createRoute = exports.getRoute = exports.listRoutes = void 0;
const client_1 = require("@prisma/client");
const park_service_1 = require("../park/park.service");
const db = new client_1.PrismaClient();
const listRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.route.findMany({
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true,
            International: true
        }
    });
});
exports.listRoutes = listRoutes;
const getRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.route.findUnique({
        where: {
            Id: id
        },
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true,
            International: true
        }
    });
});
exports.getRoute = getRoute;
const createRoute = (route) => __awaiter(void 0, void 0, void 0, function* () {
    const { parkId, Stops, StartTime, EndTime, Late, LateBy, International } = route;
    const park = yield (0, park_service_1.getPark)(parkId);
    if (!park) {
        return null;
    }
    return db.route.create({
        data: {
            parkId,
            Stops,
            StartTime,
            EndTime,
            Late,
            LateBy,
            International,
        },
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true,
            International: true
        }
    });
});
exports.createRoute = createRoute;
const updateRoute = (route, id) => __awaiter(void 0, void 0, void 0, function* () {
    var findIfExists = yield (0, exports.getRoute)(id);
    if (!findIfExists) {
        return null;
    }
    const { parkId, Stops, StartTime, EndTime, Late, LateBy, International } = route;
    if (parkId) {
        const park = yield (0, park_service_1.getPark)(parkId);
        if (!park) {
            return null;
        }
    }
    return db.route.update({
        where: {
            Id: id
        },
        data: {
            parkId,
            Stops,
            StartTime,
            EndTime,
            Late,
            LateBy,
            International,
        },
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true,
            International: true
        }
    });
});
exports.updateRoute = updateRoute;
const deleteRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var route = yield (0, exports.getRoute)(id);
    if (!route) {
        return null;
    }
    return db.route.delete({
        where: {
            Id: id
        },
        select: {
            Id: true,
            parkId: true,
            Stops: true,
            StartTime: true,
            EndTime: true,
            Late: true,
            LateBy: true,
            International: true
        }
    });
});
exports.deleteRoute = deleteRoute;
