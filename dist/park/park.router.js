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
exports.parkRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const parkService = __importStar(require("./park.service"));
exports.parkRouter = express_1.default.Router();
//GET Many
exports.parkRouter.get("/", (0, express_validator_1.query)("pageNumber").optional().isInt({ min: 1 }), (0, express_validator_1.query)("pageSize").optional().isInt({ min: 1 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var pageNumber = parseInt(req.query.pageNumber);
    var pageSize = parseInt(req.query.pageSize);
    try {
        const parks = yield parkService.listParks(pageNumber, pageSize);
        return res.status(200).json(parks);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//Get many routes
exports.parkRouter.get("/:parkId/routes", (0, express_validator_1.param)("parkId").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parkId = parseInt(req.params.parkId, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const routes = yield parkService.listRoutesByPark(parkId);
        if (!routes) {
            return res.status(404).json("No park found with given Id");
        }
        return res.status(200).json(routes);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//Get many busses
exports.parkRouter.get("/:parkId/routes/:Id/busses/", (0, express_validator_1.param)("parkId").isNumeric(), (0, express_validator_1.param)("Id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parkId = parseInt(req.params.parkId, 10);
    const Id = parseInt(req.params.Id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const busses = yield parkService.listBussesByRoute(parkId, Id);
        if (!busses) {
            return res.status(404).json("There is no route or park with specified Ids");
        }
        return res.status(200).json(busses);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Get one 
exports.parkRouter.get("/:id", (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const park = yield parkService.getPark(id);
        if (park) {
            return res.status(200).json(park);
        }
        return res.status(404).json("No park found with given Id");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}));
// POST: Create
// Params : workHours,City,Street,Number,routesNumber
exports.parkRouter.post("/", (0, express_validator_1.body)("City").isString(), (0, express_validator_1.body)("Street").isString(), (0, express_validator_1.body)("Number").isString(), (0, express_validator_1.body)("routesNumber").isInt({ min: 1 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const park = req.body;
        const newPark = yield parkService.createPark(park);
        return res.status(201).json(park);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Update PUT
exports.parkRouter.put("/:id", (0, express_validator_1.param)("id").isNumeric(), (0, express_validator_1.body)("workHours").optional(), (0, express_validator_1.body)("City").optional().isString(), (0, express_validator_1.body)("Street").optional().isString(), (0, express_validator_1.body)("Number").optional().isString(), (0, express_validator_1.body)("routesNumber").optional().isInt({ min: 1 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id, 10);
    try {
        const park = req.body;
        const updatedPark = yield parkService.updatePark(park, id);
        if (!updatedPark) {
            return res.status(404).json("Park with given Id was not found");
        }
        return res.status(200).json(updatedPark);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Delete park DELETE
exports.parkRouter.delete("/:id", (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const deletedPark = yield parkService.deletePark(id);
        if (!deletedPark) {
            return res.status(404).json("Park with given Id was not found");
        }
        return res.status(200).json(deletedPark);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Edge cases for Post,put,patch,delete
exports.parkRouter.post("/:id", (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const park = yield parkService.getPark(id);
    if (park) {
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Park with given Id was not found");
}));
// put
exports.parkRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
//patch
exports.parkRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
//delete
exports.parkRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't delete whole collection, specify Id");
}));
//not found
exports.parkRouter.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json("We could not find the wanted site");
}));
