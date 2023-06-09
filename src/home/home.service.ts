import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto.ts/home.dto';
import { PropertyType, UserType } from '@prisma/client';
import { UserInfo } from 'src/user/decorators/user.decorator';

interface GetHomesParam {
  city?: string;
  price?: { gte?: number; lte?: number };
  propertyType?: PropertyType;
}
interface CreateHomeParams {
  address: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  city: string;
  listed_date: Date;
  price: number;
  images: { url: string }[];
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

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllHomes() {
    return this.prismaService.home.findMany();
  }

  async getHomeById(filter: GetHomesParam): Promise<HomeResponseDto[]> {
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
      throw new NotFoundException();
    }

    return homes.map((home) => {
      const fetchedHome = { ...home };
      console.log(fetchedHome);
      delete fetchedHome.city;
      return new HomeResponseDto(fetchedHome);
    });
  }

  async createHome(
    {
      address,
      numberOfBathrooms,
      numberOfBedrooms,
      city,
      landSize,
      propertyType,
      images,
      price,
    }: CreateHomeParams,
    userId: number,
  ) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        number_of_bathrooms: numberOfBathrooms,
        number_of_bedrooms: numberOfBedrooms,
        city,
        land_size: landSize,
        propertyType,
        price,
        realtor_id: userId,
      },
    });
    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });
    await this.prismaService.image.createMany({ data: homeImages });

    // const homeImages = images.map((image) => {
    //   return {
    //     url: image.url,
    //     home_id: home.id,
    //   };
    // });
    // await this.prismaService.image.createMany({ data: homeImages });

    return new HomeResponseDto(home);
  }

  async updateHomeById(id: number, data: UpdateHomeParams) {
    const home = this.prismaService.home.findUnique({
      where: { id },
    });

    if (!home) throw new NotFoundException();

    const updatedHome = await this.prismaService.home.update({
      where: { id },
      data,
    });
    return new HomeResponseDto(updatedHome);
  }

  async deleteHouseById(id: number) {
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

  async getRealtorByHomeId(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
      select: {
        realtor: {
          select: {
            name: true,
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    if (!home) {
      throw new NotFoundException();
    }
    return home.realtor;
  }

  async inquire(buyer: UserInfo, homeId: number, message: string) {
    const realtor = await this.getRealtorByHomeId(homeId);

    return await this.prismaService.message.create({
      data: {
        realtor_id: realtor.id,
        buyer_id: buyer.id,
        home_id: homeId,
        message,
      },
    });
  }

  getMessagesByHome(homeId: number) {
    return this.prismaService.message.findMany({
      where: {
        home_id: homeId,
      },
    });
  }
}
