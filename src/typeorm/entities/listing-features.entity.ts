import { AbstractEntity } from './abstract.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Listing } from './listing.entity';

@Entity({ name: 'listing_features' })
export class ListingFeatures extends AbstractEntity {
  @OneToOne(() => Listing, (listing) => listing.features)
  listing: Listing;

  @Column({ type: 'boolean', nullable: true })
  elevator?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  wheelchairRamp?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  serviceAnimalsAllowed?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  accessibleParking?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  parkingOnSite?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  inUnitWasherDryer?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  laundryInBuilding?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  barrierFreeEntrance?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  rollInShower?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  grabBars?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  heatingInUnit?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  acInUnit?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  hearing?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  visual?: boolean | null;

  @Column({ type: 'boolean', nullable: true })
  mobility?: boolean | null;
}
