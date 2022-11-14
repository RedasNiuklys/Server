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
exports.authenticateToken = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userService = __importStar(require("./user.service"));
exports.userRouter = express_1.default.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
// Get one 
exports.userRouter.get("/login", (0, express_validator_1.body)("Username").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const username = req.params.Username;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}));
// POST: Create
exports.userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = req.body;
        const newUser = yield userService.createUser(user);
        if (!newUser) {
            return res.status(400).json("There is already user with this Email");
        }
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.userRouter.post('createNewUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ...
    const token = generateAccessToken(req.params.Username);
    console.log(token);
    res.json(token);
    // ...
}));
function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '300s' });
}
function authenticateToken(req, res, next) {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', "");
    if (token == null)
        return res.sendStatus(401).json("You need viable token");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decoded.IsAdmin) {
            return res.sendStatus(403).json("Permission denied");
        }
    }
    catch (_b) {
        return res.sendStatus(401).json("Invalid token");
    }
    return next();
}
exports.authenticateToken = authenticateToken;
