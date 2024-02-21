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
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, firstName, lastName } = req.body;
                // Check if the username or email already exists
                const existingUser = yield prisma.user.findFirst({
                    where: {
                        OR: [{ username }, { email }],
                    },
                });
                if (existingUser) {
                    res.status(400).json({ message: "Username or email already exists" });
                    return;
                }
                // Hash the password before storing it
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Create a new user
                const newUser = yield prisma.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                    },
                });
                res
                    .status(201)
                    .json({ message: "User registered successfully", user: newUser });
            }
            catch (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(500).json({ message: "Internal server error" });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.userId }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h", // You can customize the expiration time
        });
        // Save token to the database
        yield prisma.token.create({
            data: {
                token,
                userId: user.userId,
                expiresAt: new Date(Date.now() + 3600000), // 1 hour in milliseconds
            },
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = AuthController;
