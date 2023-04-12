import { DataSource } from 'typeorm';
import { config } from './ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(config);

      return dataSource.initialize();
    },
  },
];

export default new DataSource(config);
