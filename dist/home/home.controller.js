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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const home_service_1 = require("./home.service");
const home_dto_1 = require("./dto/home.dto.ts/home.dto");
const client_2 = require("@prisma/client");
const user_decorator_1 = require("../user/decorators/user.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
let HomeController = class HomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    getAllHomes() {
        return this.homeService.getAllHomes();
    }
    getHomeById(city, minPrice, maxPrice, propertyType) {
        const price = minPrice || maxPrice
            ? Object.assign(Object.assign({}, (minPrice && { gte: parseFloat(minPrice) })), (maxPrice && { lte: parseFloat(maxPrice) })) : undefined;
        const filters = Object.assign(Object.assign(Object.assign({}, (city && { city })), (price && { price })), (propertyType && { propertyType }));
        return this.homeService.getHomeById(filters);
    }
    createHome(body, user) {
        return this.homeService.createHome(body, user.id);
    }
    async updateHome(id, user, body) {
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        return this.homeService.updateHomeById(id, body);
    }
    async deleteHome(id, user) {
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException('nao podes apagar!');
        }
        console.log('oh, não! apagámos a casa! foi-se :...X ');
        return this.homeService.deleteHouseById(id);
    }
    inquire(homeId, user, { message }) {
        return this.homeService.inquire(user, homeId, message);
    }
    async getHomeMessages(id, user) {
        const realtor = await this.homeService.getRealtorByHomeId(id);
        if (realtor.id !== user.id) {
            throw new common_1.UnauthorizedException('nao podes apagar!');
        }
        return this.homeService.getMessagesByHome(id);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getAllHomes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('minPrice')),
    __param(2, (0, common_1.Query)('maxPrice')),
    __param(3, (0, common_1.Query)('propertyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeById", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_dto_1.CreateHomeDto, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "createHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, home_dto_1.UpdateHomeDto]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "updateHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "deleteHome", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.BUYER),
    (0, common_1.Post)('/:id/inquire'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, home_dto_1.InquireDto]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "inquire", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.UserType.REALTOR),
    (0, common_1.Get)('/:id/messages'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomeMessages", null);
HomeController = __decorate([
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map