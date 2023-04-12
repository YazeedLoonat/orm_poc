import { AbstractEntity } from './abstract.entity';
import { Column, Entity } from 'typeorm';
import { AmiChartItem } from './ami-chart-item.entity';

@Entity({ name: 'unit_ami_chart_overrides' })
export class UnitAmiChartOverride extends AbstractEntity {
  @Column('jsonb')
  items: AmiChartItem[];
}
