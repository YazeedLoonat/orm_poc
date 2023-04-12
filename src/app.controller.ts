import { Controller, Get } from '@nestjs/common';
import { TypeormService } from './typeorm/services/typeorm.service';
import { PrismaListingService } from './prisma/listing.service';
import { SequelizeService } from './sequelize/services/sequelize.service';

import { listing as PrismaListing } from '@prisma/client';
import { Listing as TypeOrmListing } from './typeorm/entities/listing.entity';
import { Listing as SequelizeListing } from './sequelize/entities/listing.entity';
import { ValidationReturnType } from './typeorm/types/validation-return-type';

@Controller()
export class AppController {
  constructor(
    private readonly typeormService: TypeormService,
    private readonly prismaListingService: PrismaListingService,
    private readonly sequelizeService: SequelizeService,
  ) {}

  @Get('typeorm_find')
  // http://localhost:3000/typeorm_find
  async typeorm_find(): Promise<TypeOrmListing[]> {
    return await this.typeormService.getByFind();
  }

  @Get('typeorm_validate_find')
  // http://localhost:3000/typeorm_validate_find
  async typeorm_validateByFind(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByFind(0, 1000);
  }

  @Get('typeorm_validateByFind_1')
  // http://localhost:3000/typeorm_validateByFind_1
  async typeorm_validateByFind_1(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByFind(0, 1);
  }

  @Get('typeorm_validateByFind_10')
  // http://localhost:3000/typeorm_validateByFind_10
  async typeorm_validateByFind_10(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByFind(0, 10);
  }

  @Get('typeorm_validateByFind_100')
  // http://localhost:3000/typeorm_validateByFind_100
  async typeorm_validateByFind_100(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByFind(0, 100);
  }

  @Get('typeorm_querybuilder')
  // http://localhost:3000/typeorm_querybuilder
  async typeorm_querybuilder(): Promise<TypeOrmListing[]> {
    return await this.typeormService.getByQuerybuilder();
  }

  @Get('typeorm_validate_querybuilder')
  // http://localhost:3000/typeorm_validate_querybuilder
  async typeorm_validateByQuerybuilder(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByQuerybuilder(0, 1000);
  }

  @Get('typeorm_validate_querybuilder_1')
  // http://localhost:3000/typeorm_validate_querybuilder_1
  async typeorm_validate_querybuilder_1(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByQuerybuilder(0, 1);
  }

  @Get('typeorm_validate_querybuilder_10')
  // http://localhost:3000/typeorm_validate_querybuilder_10
  async typeorm_validate_querybuilder_10(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByQuerybuilder(0, 10);
  }

  @Get('typeorm_validate_querybuilder_100')
  // http://localhost:3000/typeorm_validate_querybuilder_100
  async typeorm_validate_querybuilder_100(): Promise<ValidationReturnType> {
    return await this.typeormService.validateByQuerybuilder(0, 100);
  }

  @Get('typeorm_seeding')
  // http://localhost:3000/typeorm_seeding
  async typeorm_seeding(): Promise<boolean> {
    await this.typeormService.seedData();
    return true;
  }

  @Get('prisma_fetch')
  // http://localhost:3000/prisma_fetch
  async primsa_fetch(): Promise<PrismaListing[]> {
    return await this.prismaListingService.getRecords();
  }

  @Get('prisma_validate_fetch')
  // http://localhost:3000/prisma_validate_fetch
  async prisma_validate_fetch(): Promise<ValidationReturnType> {
    return await this.prismaListingService.validateByFind(0, 1000);
  }

  @Get('prisma_validate_fetch_1')
  // http://localhost:3000/prisma_validate_fetch_1
  async prisma_validate_fetch_1(): Promise<ValidationReturnType> {
    return await this.prismaListingService.validateByFind(0, 1);
  }

  @Get('prisma_validate_fetch_10')
  // http://localhost:3000/prisma_validate_fetch_10
  async prisma_validate_fetch_10(): Promise<ValidationReturnType> {
    return await this.prismaListingService.validateByFind(0, 10);
  }

  @Get('prisma_validate_fetch_100')
  // http://localhost:3000/prisma_validate_fetch_100
  async prisma_validate_fetch_100(): Promise<ValidationReturnType> {
    return await this.prismaListingService.validateByFind(0, 100);
  }

  @Get('prisma_seeding')
  // http://localhost:3000/prisma_seeding
  async primsa_seeding(): Promise<boolean> {
    return await this.prismaListingService.seedData();
  }

  @Get('sequelize_fetch')
  // http://localhost:3000/sequelize_fetch
  async sequelize_fetch(): Promise<SequelizeListing[]> {
    return await this.sequelizeService.getRecords();
  }
}
