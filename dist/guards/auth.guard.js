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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, prismaService) {
        this.reflector = reflector;
        this.prismaService = prismaService;
    }
    async canActivate(context) {
        var _a, _b;
        const roles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(roles);
        if (roles === null || roles === void 0 ? void 0 : roles.length) {
            const request = context.switchToHttp().getRequest();
            const token = (_b = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split('Bearer ')[1];
            try {
                const payload = (await jwt.verify(token, process.env.JSON_TOKEN_KEY));
                console.log({
                    payload,
                    message: 'este é o objecto que existe dentro do auth guard! ',
                });
                const user = await this.prismaService.user.findUnique({
                    where: {
                        id: payload.id,
                    },
                });
                if (!user)
                    return false;
                if (roles.includes(user.user_type))
                    return true;
                return false;
            }
            catch (error) {
                return false;
            }
        }
        return true;
        return false;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map