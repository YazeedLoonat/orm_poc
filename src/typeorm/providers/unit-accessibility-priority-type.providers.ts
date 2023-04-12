import { DataSource } from 'typeorm';
import { UnitAccessibilityPriorityType } from '../entities/unit-accessibility-priority-type.entity';

export const unitAccessibilityPriorityTypeProviders = [
  {
    provide: 'UNITACCESSIBILITYPRIORITYTYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UnitAccessibilityPriorityType),
    inject: ['DATA_SOURCE'],
  },
];
