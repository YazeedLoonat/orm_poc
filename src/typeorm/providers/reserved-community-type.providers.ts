import { DataSource } from 'typeorm';
import { ReservedCommunityType } from '../entities/reserved-community-type.entity';

export const reservedCommunityTypeProviders = [
  {
    provide: 'RESERVEDCOMMUNITYTYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReservedCommunityType),
    inject: ['DATA_SOURCE'],
  },
];
