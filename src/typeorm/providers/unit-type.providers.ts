import { DataSource } from 'typeorm';
import { UnitType } from '../entities/unit-type.entity';

export const unitTypeProviders = [
  {
    provide: 'UNITTYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UnitType),
    inject: ['DATA_SOURCE'],
  },
];
