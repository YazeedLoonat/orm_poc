import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { AmiChartItem } from './ami-chart-item.entity';
import { Jurisdiction } from './jurisdiction.entity';

@Entity()
export class AmiChart extends AbstractEntity {
  @Column('jsonb')
  items: AmiChartItem[];

  @Column()
  name: string;

  @ManyToOne(() => Jurisdiction, { eager: true, nullable: false })
  jurisdiction: Jurisdiction;
}
