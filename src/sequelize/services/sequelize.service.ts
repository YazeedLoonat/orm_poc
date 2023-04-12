import { Injectable } from '@nestjs/common';
import { Listing } from '../entities/listing.entity';
import { ListingService } from '../services/listing.service';

@Injectable()
export class SequelizeService {
  constructor(private listingService: ListingService) {}

  async getRecords(): Promise<Listing[]> {
    return await this.listingService.findAll();
  }
}
