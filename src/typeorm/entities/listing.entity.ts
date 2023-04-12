import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ListingApplicationAddressType } from '../types/listing-application-address-type';
import { ListingReviewOrder } from '../types/listing-review-order-enum';
import { ListingStatus } from '../types/listing-status-enum';
import { AbstractEntity } from './abstract.entity';
import { Address } from './address.entity';
import { ApplicationMethod } from './application-method.entity';
import { Asset } from './asset.entity';
import { Jurisdiction } from './jurisdiction.entity';
import { ListingFeatures } from './listing-features.entity';
import { ListingUtilities } from './listing-utilities.entity';
import { ReservedCommunityType } from './reserved-community-type.entity';
import Unit from './unit.entity';
import UnitsSummary from './units-summary.entity';

@Entity()
export class Listing extends AbstractEntity {
  @Column({ type: 'text', nullable: true })
  additionalApplicationSubmissionNotes?: string | null;

  @Column({ type: 'boolean', nullable: true })
  digitalApplication?: boolean;

  @Column({ type: 'boolean', nullable: true })
  commonDigitalApplication?: boolean;

  @Column({ type: 'boolean', nullable: true })
  paperApplication?: boolean;

  @Column({ type: 'boolean', nullable: true })
  referralOpportunity?: boolean;

  @Column({ type: 'text', nullable: true })
  accessibility?: string | null;

  @Column({ type: 'text', nullable: true })
  amenities?: string | null;

  @Column({ type: 'integer', nullable: true })
  buildingTotalUnits?: number | null;

  @Column({ type: 'text', nullable: true })
  developer?: string | null;

  @Column({ type: 'integer', nullable: true })
  householdSizeMax?: number | null;

  @Column({ type: 'integer', nullable: true })
  householdSizeMin?: number | null;

  @Column({ type: 'text', nullable: true })
  neighborhood?: string | null;

  @Column({ type: 'text', nullable: true })
  petPolicy?: string | null;

  @Column({ type: 'text', nullable: true })
  smokingPolicy?: string | null;

  @Column({ type: 'integer', nullable: true })
  unitsAvailable?: number | null;

  @Column({ type: 'text', nullable: true })
  unitAmenities?: string | null;

  @Column({ type: 'text', nullable: true })
  servicesOffered?: string | null;

  @Column({ type: 'integer', nullable: true })
  yearBuilt?: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  applicationDueDate?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  applicationOpenDate?: Date | null;

  @Column({ type: 'text', nullable: true })
  applicationFee?: string | null;

  @Column({ type: 'text', nullable: true })
  applicationOrganization?: string | null;

  @Column({ type: 'text', nullable: true })
  applicationPickUpAddressOfficeHours?: string | null;

  @Column({ type: 'text', nullable: true })
  applicationDropOffAddressOfficeHours?: string | null;

  @Column({ type: 'text', nullable: true })
  buildingSelectionCriteria?: string | null;

  @Column({ type: 'text', nullable: true })
  costsNotIncluded?: string | null;

  @Column({ type: 'text', nullable: true })
  creditHistory?: string | null;

  @Column({ type: 'text', nullable: true })
  criminalBackground?: string | null;

  @Column({ type: 'text', nullable: true })
  depositMin?: string | null;

  @Column({ type: 'text', nullable: true })
  depositMax?: string | null;

  @Column({ type: 'text', nullable: true })
  depositHelperText?: string | null;

  @Column({ type: 'boolean', nullable: true })
  disableUnitsAccordion?: boolean | null;

  @Column({ type: 'text', nullable: true })
  leasingAgentEmail?: string | null;

  @Column({ type: 'text', nullable: true })
  leasingAgentName?: string | null;

  @Column({ type: 'text', nullable: true })
  leasingAgentOfficeHours?: string | null;

  @Column({ type: 'text', nullable: true })
  leasingAgentPhone?: string | null;

  @Column({ type: 'text', nullable: true })
  leasingAgentTitle?: string | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'timestamptz', nullable: true })
  postmarkedApplicationsReceivedByDate?: Date | null;

  @Column({ type: 'text', nullable: true })
  programRules?: string | null;

  @Column({ type: 'text', nullable: true })
  rentalAssistance?: string | null;

  @Column({ type: 'text', nullable: true })
  rentalHistory?: string | null;

  @Column({ type: 'text', nullable: true })
  requiredDocuments?: string | null;

  @Column({ type: 'text', nullable: true })
  specialNotes?: string | null;

  @Column({ type: 'integer', nullable: true })
  waitlistCurrentSize?: number | null;

  @Column({ type: 'integer', nullable: true })
  waitlistMaxSize?: number | null;

  @Column({ type: 'text', nullable: true })
  whatToExpect?: string | null;

  @Column({ type: 'boolean' })
  displayWaitlistSize: boolean;

  @Column({ type: 'text', nullable: true })
  reservedCommunityDescription?: string | null;

  @Column({ type: 'integer', nullable: true })
  reservedCommunityMinAge?: number | null;

  @Column({ type: 'text', nullable: true })
  resultLink?: string | null;

  @Column({ type: 'boolean', nullable: true })
  isWaitlistOpen?: boolean | null;

  @Column({ type: 'integer', nullable: true })
  waitlistOpenSpots?: number | null;

  @Column({ type: 'boolean', nullable: true })
  customMapPin?: boolean | null;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  closedAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true, default: '1970-01-01' })
  afsLastRunAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true, default: '1970-01-01' })
  lastApplicationUpdateAt?: Date | null;

  // relationships
  @OneToMany(() => ApplicationMethod, (am) => am.listing, {
    cascade: true,
    eager: true,
  })
  applicationMethods: ApplicationMethod[];

  @ManyToOne(() => Asset, { eager: true, nullable: true, cascade: true })
  buildingSelectionCriteriaFile?: Asset | null;

  @ManyToOne(() => Asset, { eager: true, nullable: true, cascade: true })
  result?: Asset | null;

  @Column('jsonb')
  assets: Asset[];

  @ManyToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  buildingAddress: Address;

  @ManyToOne(() => Address, { eager: true, nullable: true, cascade: true })
  applicationPickUpAddress?: Address | null;

  @ManyToOne(() => Address, { eager: true, nullable: true, cascade: true })
  applicationDropOffAddress?: Address | null;

  @ManyToOne(() => Address, { eager: true, nullable: true, cascade: true })
  applicationMailingAddress?: Address | null;

  @ManyToOne(() => Address, { eager: true, nullable: true, cascade: true })
  leasingAgentAddress?: Address | null;

  @Column({ type: 'enum', enum: ListingApplicationAddressType, nullable: true })
  applicationPickUpAddressType?: ListingApplicationAddressType | null;

  @Column({ type: 'enum', enum: ListingApplicationAddressType, nullable: true })
  applicationDropOffAddressType?: ListingApplicationAddressType | null;

  @Column({ type: 'enum', enum: ListingApplicationAddressType, nullable: true })
  applicationMailingAddressType?: ListingApplicationAddressType | null;

  @OneToOne(() => ListingUtilities, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  utilities?: ListingUtilities;

  @OneToOne(() => ListingFeatures, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  features?: ListingFeatures;

  @ManyToOne(() => ReservedCommunityType, { eager: true, nullable: true })
  reservedCommunityType?: ReservedCommunityType;

  @ManyToOne(() => Jurisdiction, { eager: true })
  jurisdiction: Jurisdiction;

  @Column({ type: 'enum', enum: ListingReviewOrder, nullable: true })
  reviewOrderType?: ListingReviewOrder | null;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.pending,
  })
  status: ListingStatus;

  @OneToMany(() => Unit, (unit) => unit.listing, { eager: true, cascade: true })
  units: Unit[];

  @OneToMany(() => UnitsSummary, (summary) => summary.listing, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  unitsSummary: UnitsSummary[];

  /*
    Missing: 
      listingMultiselectQuestions
      events
      applications
      leasingAgents
      images
  */
}
