import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'unit_types' })
export class UnitType extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  numBedrooms: number;
}
