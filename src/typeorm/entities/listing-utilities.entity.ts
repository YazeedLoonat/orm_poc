import { AbstractEntity } from './abstract.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Listing } from './listing.entity';

@Entity({ name: 'listing_utilities' })
export class ListingUtilities extends AbstractEntity {
  @OneToOne(() => Listing, (listing) => listing.utilities)
  listing: Listing;

  @Column({ type: 'boolean', nullable: true })
  water?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  gas?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  trash?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  sewer?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  electricity?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  cable?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  phone?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  internet?: boolean | null;
}
