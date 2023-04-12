import { Module } from '@nestjs/common';
import { ListingService } from '../services/listing.service';
import { listingProviders } from '../providers/listing.providers';
import { DatabaseModule } from '../database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ListingService, ...listingProviders],
  exports: [ListingService, ...listingProviders],
})
export class ListingModule {}
