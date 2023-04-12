import { DataSource } from 'typeorm';
import { UnitRentType } from '../entities/unit-rent-type.entity';

export const unitRentTypeProviders = [
  {
    provide: 'UNITRENTTYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UnitRentType),
    inject: ['DATA_SOURCE'],
  },
];
