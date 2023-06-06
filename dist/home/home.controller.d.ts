import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, InquireDto, UpdateHomeDto } from './dto/home.dto.ts/home.dto';
import { PropertyType } from '@prisma/client';
import { UserInfo } from 'src/user/decorators/user.decorator';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getAllHomes(): Promise<import(".prisma/client").Home[]>;
    getHomeById(city?: string, minPrice?: string, maxPrice?: string, propertyType?: PropertyType): Promise<HomeResponseDto[]>;
    createHome(body: CreateHomeDto, user: UserInfo): Promise<HomeResponseDto>;
    updateHome(id: number, user: UserInfo, body: UpdateHomeDto): Promise<HomeResponseDto>;
    deleteHome(id: number, user: UserInfo): Promise<void>;
    inquire(homeId: number, user: UserInfo, { message }: InquireDto): Promise<import(".prisma/client").Message>;
    getHomeMessages(id: number, user: UserInfo): Promise<{
        message: string;
        buyer: {
            name: string;
            email: string;
            phone: string;
        };
    }[]>;
}
