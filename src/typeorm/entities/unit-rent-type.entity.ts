import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'unit_rent_types' })
export class UnitRentType extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;
}
