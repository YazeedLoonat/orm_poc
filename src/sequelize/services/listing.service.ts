import { Injectable, Inject } from '@nestjs/common';
import { Listing } from '../entities/listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @Inject('LISTING_REPOSITORY')
    private listingRepository: typeof Listing,
  ) {}

  async findAll(): Promise<Listing[]> {
    return this.listingRepository.findAll<Listing>();
  }
}
