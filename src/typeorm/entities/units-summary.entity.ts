import { Column, Entity, ManyToOne } from 'typeorm';
import { UnitType } from './unit-type.entity';
import { UnitAccessibilityPriorityType } from './unit-accessibility-priority-type.entity';
import { Listing } from './listing.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'units_summary' })
class UnitsSummary extends AbstractEntity {
  @ManyToOne(() => UnitType, { eager: true })
  unitType: UnitType;

  @ManyToOne(() => Listing, (listing) => listing.unitsSummary, {})
  listing: Listing;

  @Column({ nullable: true, type: 'integer' })
  monthlyRentMin?: number | null;

  @Column({ nullable: true, type: 'integer' })
  monthlyRentMax?: number | null;

  @Column({ nullable: true, type: 'numeric', precision: 8, scale: 2 })
  monthlyRentAsPercentOfIncome?: string | null;

  @Column({ nullable: true, type: 'integer' })
  amiPercentage?: number | null;

  @Column({ nullable: true, type: 'text' })
  minimumIncomeMin?: string | null;

  @Column({ nullable: true, type: 'text' })
  minimumIncomeMax?: string | null;

  @Column({ nullable: true, type: 'integer' })
  maxOccupancy?: number | null;

  @Column({ nullable: true, type: 'integer' })
  minOccupancy?: number | null;

  @Column({ nullable: true, type: 'integer' })
  floorMin?: number | null;

  @Column({ nullable: true, type: 'integer' })
  floorMax?: number | null;

  @Column({ nullable: true, type: 'numeric', precision: 8, scale: 2 })
  sqFeetMin?: string | null;

  @Column({ nullable: true, type: 'numeric', precision: 8, scale: 2 })
  sqFeetMax?: string | null;

  @ManyToOne(() => UnitAccessibilityPriorityType, {
    eager: true,
    nullable: true,
  })
  priorityType?: UnitAccessibilityPriorityType | null;

  @Column({ nullable: true, type: 'integer' })
  totalCount?: number | null;

  @Column({ nullable: true, type: 'integer' })
  totalAvailable?: number | null;
}

export { UnitsSummary as default, UnitsSummary };
