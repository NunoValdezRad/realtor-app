import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto.ts/home.dto';
import { PropertyType } from '@prisma/client';
interface GetHomesParam {
    city?: string;
    price?: {
        gte?: number;
        lte?: number;
    };
    propertyType?: PropertyType;
}
interface CreateHomeParams {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    listed_date: Date;
    price: number;
    images: {
        url: string;
    }[];
    landSize: number;
    propertyType: PropertyType;
}
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllHomes(): Promise<import(".prisma/client").Home[]>;
    getHomeById(filter: GetHomesParam): Promise<HomeResponseDto[]>;
    createHome({ address, numberOfBathrooms, numberOfBedrooms, city, landSize, propertyType, images, price, }: CreateHomeParams): Promise<HomeResponseDto>;
}
export {};
