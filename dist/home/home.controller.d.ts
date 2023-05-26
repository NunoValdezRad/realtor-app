import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/home.dto.ts/home.dto';
import { PropertyType } from '@prisma/client';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getAllHomes(): Promise<import(".prisma/client").Home[]>;
    getHomeById(city?: string, minPrice?: string, maxPrice?: string, propertyType?: PropertyType): Promise<HomeResponseDto[]>;
    createHome(body: CreateHomeDto): Promise<HomeResponseDto>;
    updateHome(id: number, body: UpdateHomeDto): Promise<HomeResponseDto>;
    deleteHome(id: number): Promise<void>;
}
