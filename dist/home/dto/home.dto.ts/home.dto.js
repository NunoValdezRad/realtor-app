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
exports.UpdateHomeDto = exports.CreateHomeDto = exports.HomeResponseDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class HomeResponseDto {
    numberOfBedrooms() {
        return this.number_of_bedrooms;
    }
    numberOfBathrooms() {
        return this.number_of_bathrooms;
    }
    listedDate() {
        return this.listedDate;
    }
    landSize() {
        return this.landSize;
    }
    constructor(partial) {
        Object.assign(this, partial);
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "number_of_bedrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'numberOfBedrooms' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeResponseDto.prototype, "numberOfBedrooms", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "number_of_bathrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'numberOfBathrooms' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeResponseDto.prototype, "numberOfBathrooms", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "listed_date", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'listedDate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeResponseDto.prototype, "listedDate", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "land_size", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'landSize' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeResponseDto.prototype, "landSize", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeResponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeResponseDto.prototype, "realtor_id", void 0);
exports.HomeResponseDto = HomeResponseDto;
class Image {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Image.prototype, "url", void 0);
class CreateHomeDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHomeDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDto.prototype, "numberOfBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDto.prototype, "numberOfBathrooms", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHomeDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateHomeDto.prototype, "listed_date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Image),
    __metadata("design:type", Array)
], CreateHomeDto.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDto.prototype, "landSize", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    __metadata("design:type", String)
], CreateHomeDto.prototype, "propertyType", void 0);
exports.CreateHomeDto = CreateHomeDto;
class UpdateHomeDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "numberOfBedrooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "numberOfBathrooms", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateHomeDto.prototype, "listed_date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "landSize", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PropertyType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "propertyType", void 0);
exports.UpdateHomeDto = UpdateHomeDto;
//# sourceMappingURL=home.dto.js.map