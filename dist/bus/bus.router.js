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
exports.busRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const busService = __importStar(require("./bus.service"));
exports.busRouter = express_1.default.Router();
exports.busRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bus = yield busService.listBusses();
        return res.status(200).json(bus);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Get one 
exports.busRouter.get("/:id", (0, express_validator_1.param)("id").isLength({ min: 11, max: 17 }).isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const bus = yield busService.getBus(req.params.id);
        if (bus) {
            return res.status(200).json(bus);
        }
        return res.status(404).json("No bus found with given Id");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// POST: Create
exports.busRouter.post("/", (0, express_validator_1.body)("VIN").isLength({ min: 11, max: 17 }).isString(), (0, express_validator_1.body)("routeId").isInt({ min: 1 }), (0, express_validator_1.body)("Tech_Inspection").isISO8601().toDate(), (0, express_validator_1.body)("Mileage").isInt({ min: 0 }), (0, express_validator_1.body)("StandingSpaces").isInt({ min: 0 }), (0, express_validator_1.body)("SittingSpaces").isInt({ min: 0 }), (0, express_validator_1.body)("WC").isBoolean(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const bus = req.body;
        const newBus = yield busService.createBus(bus);
        if (newBus == null) {
            return res.status(400).json("Specified VIN already exist");
        }
        return res.status(201).json(newBus);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Update PUT
exports.busRouter.put("/:id", (0, express_validator_1.param)("id").isLength({ min: 11, max: 17 }).isString(), (0, express_validator_1.body)("routeId").optional().isInt({ min: 1 }), (0, express_validator_1.body)("Tech_Inspection").optional().isISO8601().toDate(), (0, express_validator_1.body)("Mileage").optional().isInt({ min: 0 }), (0, express_validator_1.body)("StandingSpaces").optional().isInt({ min: 0 }), (0, express_validator_1.body)("SittingSpaces").optional().isInt({ min: 0 }), (0, express_validator_1.body)("WC").optional().isBoolean(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const bus = req.body;
        const updatedBus = yield busService.updateBus(bus, req.params.id);
        if (!updatedBus) {
            return res.status(404).json("Bus with given Id or route was not found");
        }
        return res.status(200).json(bus);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Delete bus DELETE
exports.busRouter.delete("/:id", (0, express_validator_1.param)("id").isLength({ min: 11, max: 17 }).isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const deletedBus = yield busService.deleteBus(req.params.id);
        if (!deletedBus) {
            return res.status(404).json("Bus with given VIN was not found");
        }
        return res.status(200).json(deletedBus);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
// Edge cases for Post,put,patch,delete
exports.busRouter.post("/:id", (0, express_validator_1.param)("id").isLength({ min: 11, max: 17 }).isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const bus = yield busService.getBus(req.params.id);
    if (bus) {
        return res.status(409).json("There is already entry with this id");
    }
    return res.status(404).json("Bus with given Id was not found");
}));
// put
exports.busRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
exports.busRouter.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't update whole collection, specify Id");
}));
exports.busRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(405).json("You can't delete whole collection, specify Id");
}));
//not found
exports.busRouter.delete("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json("Your requested website could not be found");
}));
