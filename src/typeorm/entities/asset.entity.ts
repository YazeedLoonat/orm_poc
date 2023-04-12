import { AbstractEntity } from './abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'assets' })
export class Asset extends AbstractEntity {
  @Column({ type: 'text' })
  fileId: string;

  @Column({ type: 'text' })
  label: string;
}
