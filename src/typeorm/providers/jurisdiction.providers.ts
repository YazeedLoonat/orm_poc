import { DataSource } from 'typeorm';
import { Jurisdiction } from '../entities/jurisdiction.entity';

export const jurisdictionProviders = [
  {
    provide: 'JURISDICTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Jurisdiction),
    inject: ['DATA_SOURCE'],
  },
];
