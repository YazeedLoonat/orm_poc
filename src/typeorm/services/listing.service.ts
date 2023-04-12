import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Listing } from '../entities/listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @Inject('LISTING_REPOSITORY')
    private listingRepository: Repository<Listing>,
  ) {}

  async findAll(): Promise<Listing[]> {
    return this.listingRepository.find();
  }
}
