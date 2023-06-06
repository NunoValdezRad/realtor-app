import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserType } from '@prisma/client';
import { HomeService } from './home.service';
import {
  CreateHomeDto,
  HomeResponseDto,
  UpdateHomeDto,
} from './dto/home.dto.ts/home.dto';
import { PropertyType } from '@prisma/client';
import { User, UserInfo } from 'src/user/decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('/')
  getAllHomes() {
    return this.homeService.getAllHomes();
  }

  @Get(':id')
  getHomeById(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };

    return this.homeService.getHomeById(filters);
  }

  @Roles(UserType.REALTOR, UserType.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  createHome(@Body() body: CreateHomeDto, @User() user: UserInfo) {
    // console.log(user);
    return this.homeService.createHome(body, user.id);

    // return user;
  }

  @Put(':id')
  async updateHome(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfo,
    @Body() body: UpdateHomeDto,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(id);
    if (realtor.id !== user.id) {
      throw new UnauthorizedException();
    }
    return this.homeService.updateHomeById(id, body);
  }

  @Delete(':id')
  async deleteHome(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfo,
  ) {
    const realtor = await this.homeService.getRealtorByHomeId(id);

    if (realtor.id !== user.id) {
      throw new UnauthorizedException('nao podes apagar!');
    }
    console.log('oh, não! apagámos a casa! foi-se :...X ');
    return this.homeService.deleteHouseById(id);
  }
}

// Parei aqui porque hoje (dia 26 de Maio) soube que vou para o Rotaro, outro projeto da Rad, e vou colocar isto em pausa!
