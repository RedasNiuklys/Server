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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.login = exports.checkEmail = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = new client_1.PrismaClient();
const checkEmail = (Email) => __awaiter(void 0, void 0, void 0, function* () {
    return db.user.findFirst({
        where: {
            Email
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            AccessLevel: true
        }
    });
});
exports.checkEmail = checkEmail;
const login = (email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 8;
    var password = yield bcrypt_1.default.hash(pass, saltRounds);
    console.log(password);
    var user = yield (0, exports.checkEmail)(email);
    console.log(user);
    if (user) {
        if (yield bcrypt_1.default.compare(pass, user.Password))
            return user;
        else
            return null;
    }
    return null;
});
exports.login = login;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, Username, Password } = user;
    const saltRounds = 8;
    var password = yield bcrypt_1.default.hash(Password, saltRounds);
    console.log(password.length);
    const userLog = yield (0, exports.checkEmail)(Email);
    console.log(userLog);
    if (userLog != null)
        return null;
    return db.user.create({
        data: {
            Email,
            Username,
            Password: password,
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            AccessLevel: true
        }
    });
});
exports.createUser = createUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.user.findFirst({
        where: {
            Id: id
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            AccessLevel: true
        }
    });
});
exports.getUser = getUser;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, Username, Password, AccessLevel } = userData;
    return db.user.update({
        where: {
            Id: id
        },
        data: {
            Email,
            Username,
            Password,
            AccessLevel
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            AccessLevel: true
        }
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db.user.findFirst({
        where: {
            Id: id
        },
        select: {
            Id: true,
            Email: true,
            Username: true,
            Password: true,
            AccessLevel: true
        }
    });
});
exports.deleteUser = deleteUser;
