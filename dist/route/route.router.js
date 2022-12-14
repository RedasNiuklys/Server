"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_router_1 = require("../user/user.router");
const routeService = __importStar(require("./route.service"));
exports.routeRouter = express_1.default.Router();
exports.routeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const route = yield routeService.listRoutes();
        return res.status(200).json(route);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Get one 
exports.routeRouter.get("/:id", (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const route = yield routeService.getRoute(id);
        if (route) {
            return res.status(200).json(route);
        }
        return res.status(404).json("No route found with given Id");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// POST: Create
exports.routeRouter.post("/", user_router_1.authenticateTokenAdmin, (0, express_validator_1.body)("parkId").isNumeric(), (0, express_validator_1.body)("Stops").isString(), (0, express_validator_1.body)("StartTime").isISO8601().toDate(), (0, express_validator_1.body)("EndTime").isISO8601().toDate(), (0, express_validator_1.body)("Late").isBoolean(), (0, express_validator_1.body)("International").isBoolean(), (0, express_validator_1.body)("LateBy").isISO8601().toDate(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const route = req.body;
        const newRoute = yield routeService.createRoute(route);
        if (!newRoute) {
            return res.status(400).json("Specified park does not exist");
        }
        return res.status(201).json(newRoute);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Update PUT
// Params : workHours,City,Street,Number,routesNumber
// Check if there is logic to test return value
exports.routeRouter.put("/:id", user_router_1.authenticateTokenAdmin, (0, express_validator_1.param)("id").isNumeric(), (0, express_validator_1.body)("parkId").optional().isNumeric(), (0, express_validator_1.body)("Stops").optional().isString(), (0, express_validator_1.body)("StartTime").optional().isISO8601().toDate(), (0, express_validator_1.body)("EndTime").optional().isISO8601().toDate(), (0, express_validator_1.body)("Late").optional().isBoolean(), (0, express_validator_1.body)("International").optional().isBoolean(), (0, express_validator_1.body)("LateBy").optional().isISO8601().toDate(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id, 10);
    try {
        const route = req.body;
        const updatedRoute = yield routeService.updateRoute(route, id);
        if (!updatedRoute) {
            return res.status(404).json("Route with given Id or park was not found");
        }
        return res.status(200).json(route);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Delete route DELETE
exports.routeRouter.delete("/:id", user_router_1.authenticateTokenAdmin, (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const deletedRoute = yield routeService.deleteRoute(id);
        if (!deletedRoute) {
            return res.status(404).json("Route with given Id was not found");
        }
        return res.status(200).json(deletedRoute);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Edge cases for Post,put,patch,delete
exports.routeRouter.post("/:id", user_router_1.authenticateTokenAdmin, (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id, 10);
    const route = yield routeService.getRoute(id);
    if (route) {
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Route with given Id was not found");
}));
// put
exports.routeRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
exports.routeRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
exports.routeRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't delete whole collection, specify Id");
}));
//not found
exports.routeRouter.delete("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json("Your requested website could not be found");
}));
