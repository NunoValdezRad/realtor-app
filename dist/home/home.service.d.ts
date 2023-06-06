import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto.ts/home.dto';
import { PropertyType } from '@prisma/client';
import { UserInfo } from 'src/user/decorators/user.decorator';
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
interface UpdateHomeParams {
    id?: number;
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    listed_date?: Date;
    price?: number;
    landSize?: number;
    propertyType?: PropertyType;
}
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllHomes(): Promise<import(".prisma/client").Home[]>;
    getHomeById(filter: GetHomesParam): Promise<HomeResponseDto[]>;
    createHome({ address, numberOfBathrooms, numberOfBedrooms, city, landSize, propertyType, images, price, }: CreateHomeParams, userId: number): Promise<HomeResponseDto>;
    updateHomeById(id: number, data: UpdateHomeParams): Promise<HomeResponseDto>;
    deleteHouseById(id: number): Promise<void>;
    getRealtorByHomeId(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        phone: string;
    }>;
    inquire(buyer: UserInfo, homeId: number, message: string): Promise<import(".prisma/client").Message>;
    getMessagesByHome(homeId: number): import(".prisma/client").Prisma.PrismaPromise<{
        message: string;
        buyer: {
            name: string;
            email: string;
            phone: string;
        };
    }[]>;
}
export {};
