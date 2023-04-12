import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Address extends AbstractEntity {
  @Column({ type: 'text', nullable: true })
  placeName?: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  county?: string | null;

  @Column({ type: 'text', nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  street: string;

  @Column({ type: 'text', nullable: true })
  street2?: string | null;

  @Column({ type: 'text', nullable: true })
  zipCode: string;

  @Column({ type: 'numeric', nullable: true })
  latitude?: number | null;

  @Column({ type: 'numeric', nullable: true })
  longitude?: number | null;
}
