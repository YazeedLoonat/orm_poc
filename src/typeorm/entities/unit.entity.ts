import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { AmiChart } from './ami-chart.entity';
import { UnitType } from './unit-type.entity';
import { UnitRentType } from './unit-rent-type.entity';
import { UnitAccessibilityPriorityType } from './unit-accessibility-priority-type.entity';
import { UnitAmiChartOverride } from './unit-ami-chart-override.entity';
import { Listing } from './listing.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'units' })
class Unit extends AbstractEntity {
  @ManyToOne(() => AmiChart, { eager: true, nullable: true })
  amiChart?: AmiChart | null;

  @RelationId((unit: Unit) => unit.amiChart)
  amiChartId?: string;

  @Column({ nullable: true, type: 'text' })
  amiPercentage?: string | null;

  @Column({ nullable: true, type: 'text' })
  annualIncomeMin?: string | null;

  @Column({ nullable: true, type: 'text' })
  monthlyIncomeMin?: string | null;

  @Column({ nullable: true, type: 'integer' })
  floor?: number | null;

  @Column({ nullable: true, type: 'text' })
  annualIncomeMax?: string | null;

  @Column({ nullable: true, type: 'integer' })
  maxOccupancy?: number | null;

  @Column({ nullable: true, type: 'integer' })
  minOccupancy?: number | null;

  @Column({ nullable: true, type: 'text' })
  monthlyRent?: string | null;

  @Column({ nullable: true, type: 'integer' })
  numBathrooms?: number | null;

  @Column({ nullable: true, type: 'integer' })
  numBedrooms?: number | null;

  @Column({ nullable: true, type: 'text' })
  number?: string | null;

  @Column({ nullable: true, type: 'numeric', precision: 8, scale: 2 })
  sqFeet?: string | null;

  @Column({ nullable: true, type: 'numeric', precision: 8, scale: 2 })
  monthlyRentAsPercentOfIncome?: string | null;

  @ManyToOne(() => Listing, (listing) => listing.units, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  listing: Listing;

  @Column({ type: 'boolean', nullable: true })
  bmrProgramChart?: boolean | null;

  @ManyToOne(() => UnitType, { eager: true, nullable: true })
  unitType?: UnitType | null;

  @ManyToOne(() => UnitRentType, { eager: true, nullable: true })
  unitRentType?: UnitRentType | null;

  @ManyToOne(() => UnitAccessibilityPriorityType, {
    eager: true,
    nullable: true,
  })
  priorityType?: UnitAccessibilityPriorityType | null;

  @OneToOne(() => UnitAmiChartOverride, { eager: true, cascade: true })
  @JoinColumn()
  amiChartOverride?: UnitAmiChartOverride;
}

export { Unit as default, Unit };
