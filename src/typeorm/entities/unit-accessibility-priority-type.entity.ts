import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'unit_accessibility_priority_types' })
export class UnitAccessibilityPriorityType extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;
}
