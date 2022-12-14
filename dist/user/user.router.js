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
exports.authenticateTokenCurrUser = exports.authenticateTokenAdmin = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userService = __importStar(require("./user.service"));
const busService = __importStar(require("../bus/bus.service"));
exports.userRouter = express_1.default.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
// Get one 
exports.userRouter.post("/login", (0, express_validator_1.body)("Email").isString(), (0, express_validator_1.body)("Password").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const email = req.body.Email;
    const password = req.body.Password;
    console.log(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = yield userService.login(email, password);
    if (user == null) {
        return res.status(401).json("Wrong email or password");
    }
    // console.log(user.Email)
    const token = generateAccessToken(user);
    // console.log("Message",token);
    return res.status(200).json(token);
}));
// POST: Create
exports.userRouter.post("/register", (0, express_validator_1.body)("Email").isString(), (0, express_validator_1.body)("Username").isString(), (0, express_validator_1.body)("Password").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = req.body;
        // console.log(user);
        const newUser = yield userService.createUser(user);
        console.log(newUser);
        if (!newUser) {
            return res.status(400).json("There is already user with this Email");
        }
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.userRouter.post('/createNewUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = generateAccessToken(req.body);
    // console.log(req.body);
    res.json(token);
}));
function generateAccessToken(user) {
    return jwt.sign({ id: user.Id, email: user.Email, AccessLevel: user.AccessLevel }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}
function authenticateTokenAdmin(req, res, next) {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token == null)
        return res.status(401).json("You need viable token");
    try {
        //console.log(token);
        //console.log(process.env.TOKEN_SECRET);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        if (decoded.AccessLevel > 2) {
            return res.status(403).json("Permission denied");
        }
        res.setHeader("Authorization", token);
    }
    catch (_b) {
        return res.status(401).json("Invalid token");
    }
    return next();
}
exports.authenticateTokenAdmin = authenticateTokenAdmin;
function authenticateTokenCurrUser(userId, req, res) {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (token == null)
        return res.status(401).json("You need viable token");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(decoded);
        if (decoded.id != userId) {
            return res.status(403).json("Permission denied");
        }
        res.setHeader("Authorization", token);
    }
    catch (_b) {
        return res.status(401).json("Invalid token");
    }
    return res.status(200).json("Correct token");
}
exports.authenticateTokenCurrUser = authenticateTokenCurrUser;
exports.userRouter.get("/:id", authenticateTokenCurrUser, (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield userService.getUser(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json("No user found with given Id");
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}));
exports.userRouter.get(":id/busses", authenticateTokenCurrUser, (0, express_validator_1.param)("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const bus = yield busService.getLikedBusses(id);
        return res.status(200).json(bus);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
