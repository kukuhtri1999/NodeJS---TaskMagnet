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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthMiddleware {
    static validateRegistration(req, res, next) {
        const { username, email, password } = req.body;
        // Validate username
        if (!username || typeof username !== "string") {
            res.status(400).json({ message: "Invalid username" });
            return;
        }
        // Validate email
        if (!email || typeof email !== "string" || !email.includes("@")) {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }
        // Validate password
        if (!password || typeof password !== "string" || password.length < 6) {
            res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
            return;
        }
        // If all validations pass, proceed to the next middleware/controller
        next();
    }
}
_a = AuthMiddleware;
AuthMiddleware.validateLogin = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Add a 'user' property to the request
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Error validating login:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
];
exports.default = AuthMiddleware;
