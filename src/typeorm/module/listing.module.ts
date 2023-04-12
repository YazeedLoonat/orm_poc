import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { addressProviders } from '../providers/address.providers';
import { amiChartProviders } from '../providers/ami-chart.providers';
import { assetProviders } from '../providers/asset.providers';
import { jurisdictionProviders } from '../providers/jurisdiction.providers';
import { listingProviders } from '../providers/listing.providers';
import { reservedCommunityTypeProviders } from '../providers/reserved-community-type.providers';
import { unitAccessibilityPriorityTypeProviders } from '../providers/unit-accessibility-priority-type.providers';
import { unitRentTypeProviders } from '../providers/unit-rent-type.providers';
import { unitTypeProviders } from '../providers/unit-type.providers';
import { ListingService } from '../services/listing.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...listingProviders,
    ListingService,
    ...jurisdictionProviders,
    ...assetProviders,
    ...addressProviders,
    ...reservedCommunityTypeProviders,
    ...amiChartProviders,
    ...unitRentTypeProviders,
    ...unitTypeProviders,
    ...unitAccessibilityPriorityTypeProviders,
  ],
  exports: [
    ListingService,
    ...listingProviders,
    ...jurisdictionProviders,
    ...assetProviders,
    ...addressProviders,
    ...reservedCommunityTypeProviders,
    ...amiChartProviders,
    ...unitRentTypeProviders,
    ...unitTypeProviders,
    ...unitAccessibilityPriorityTypeProviders,
  ],
})
export class ListingModule {}
