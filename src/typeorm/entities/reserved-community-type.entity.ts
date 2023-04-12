import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Jurisdiction } from './jurisdiction.entity';

@Entity({ name: 'reserved_community_types' })
export class ReservedCommunityType extends AbstractEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @ManyToOne(() => Jurisdiction, { eager: true, nullable: false })
  jurisdiction: Jurisdiction;
}
