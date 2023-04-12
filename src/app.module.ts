import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeormService } from './typeorm/services/typeorm.service';
import { ListingModule as typeormListingModule } from './typeorm/module/listing.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaListingService } from './prisma/listing.service';
import { PrismaJurisdictionService } from './prisma/jurisdiction.service';
import { SequelizeService } from './sequelize/services/sequelize.service';
import { ListingModule as sequelizeListingModule } from './sequelize/modules/listing.module';

@Module({
  imports: [typeormListingModule, sequelizeListingModule],
  controllers: [AppController],
  providers: [
    TypeormService,
    PrismaService,
    SequelizeService,
    PrismaListingService,
    PrismaJurisdictionService,
  ],
})
export class AppModule {}
