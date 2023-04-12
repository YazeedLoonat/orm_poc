import { DataSource } from 'typeorm';
import { AmiChart } from '../entities/ami-chart.entity';

export const amiChartProviders = [
  {
    provide: 'AMICHART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AmiChart),
    inject: ['DATA_SOURCE'],
  },
];
