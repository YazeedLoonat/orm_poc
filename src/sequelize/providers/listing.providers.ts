import { Listing } from '../entities/listing.entity';

export const listingProviders = [
  {
    provide: 'LISTING_REPOSITORY',
    useValue: Listing,
  },
];
