"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async generateJWT(name, id) {
        return jwt.sign({ name, id }, process.env.JSON_TOKEN_KEY, {
            expiresIn: 36000000,
        });
    }
    async signup({ email, password, name, phone }, userType) {
        console.log('entramos no signup');
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (userExists) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prismaService.user.create({
            data: {
                email,
                name,
                phone,
                password: hashedPassword,
                user_type: userType,
            },
        });
        console.log(user);
        return this.generateJWT(user.name, user.id);
    }
    async signin({ email, password }) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        console.log(existingUser);
        if (!existingUser) {
            throw new common_1.HttpException('Invalid credentials', 400);
        }
        const hashedPassword = existingUser.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            throw new common_1.HttpException('Invalid credentials', 400);
        }
        const token = await this.generateJWT(existingUser.name, existingUser.id);
        return token;
    }
    generateProductKey(email, userType) {
        const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
        return bcrypt.hash(string, 10);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map