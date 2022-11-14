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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = new client_1.PrismaClient();
const login = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return db.user.findFirst({
        where: {
            Email: email
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            IsAdmin: true
        }
    });
});
exports.login = login;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, Username, IsAdmin } = user;
    const saltRounds = 8;
    var Password = user.Password;
    var Password = yield bcrypt_1.default.hash(Password, saltRounds);
    const userLog = (0, exports.login)(Email);
    if (userLog != null)
        return null;
    return db.user.create({
        data: {
            Email,
            Username,
            Password,
            IsAdmin
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            IsAdmin: true
        }
    });
});
exports.createUser = createUser;
