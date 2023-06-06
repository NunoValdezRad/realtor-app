import { PropertyType } from '@prisma/client';
export declare class HomeResponseDto {
    id: number;
    address: string;
    number_of_bedrooms: number;
    numberOfBedrooms(): number;
    number_of_bathrooms: number;
    numberOfBathrooms(): number;
    city: string;
    listed_date: Date;
    listedDate(): () => any;
    price: number;
    land_size: number;
    landSize(): () => any;
    propertyType: PropertyType;
    image: string;
    created_at: Date;
    updated_at: Date;
    realtor_id: number;
    constructor(partial: Partial<HomeResponseDto>);
}
declare class Image {
    url: string;
}
export declare class CreateHomeDto {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    listed_date: Date;
    price: number;
    images: Image[];
    landSize: number;
    propertyType: PropertyType;
}
export declare class UpdateHomeDto {
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    listed_date?: Date;
    price?: number;
    landSize?: number;
    propertyType?: PropertyType;
}
export declare class InquireDto {
    message: string;
}
export {};
