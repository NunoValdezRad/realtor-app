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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const home_dto_1 = require("./dto/home.dto.ts/home.dto");
let HomeService = class HomeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllHomes() {
        return this.prismaService.home.findMany();
    }
    async getHomeById(filter) {
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                propertyType: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
            },
            where: filter,
        });
        if (!homes.length) {
            throw new common_1.NotFoundException();
        }
        return homes.map((home) => {
            const fetchedHome = Object.assign({}, home);
            console.log(fetchedHome);
            delete fetchedHome.city;
            return new home_dto_1.HomeResponseDto(fetchedHome);
        });
    }
    async createHome({ address, numberOfBathrooms, numberOfBedrooms, city, landSize, propertyType, images, price, }) {
        const home = await this.prismaService.home.create({
            data: {
                address,
                number_of_bathrooms: numberOfBathrooms,
                number_of_bedrooms: numberOfBedrooms,
                city,
                land_size: landSize,
                propertyType,
                price,
                realtor_id: 2,
            },
        });
        const homeImages = images.map((image) => {
            return Object.assign(Object.assign({}, image), { home_id: home.id });
        });
        await this.prismaService.image.createMany({ data: homeImages });
        return new home_dto_1.HomeResponseDto(home);
    }
    async updateHomeById(id, data) {
        const home = this.prismaService.home.findUnique({
            where: { id },
        });
        if (!home)
            throw new common_1.NotFoundException();
        const updatedHome = await this.prismaService.home.update({
            where: { id },
            data,
        });
        return new home_dto_1.HomeResponseDto(updatedHome);
    }
    async deleteHouseById(id) {
        await this.prismaService.image.deleteMany({
            where: {
                home_id: id,
            },
        });
        await this.prismaService.home.delete({
            where: {
                id,
            },
        });
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map