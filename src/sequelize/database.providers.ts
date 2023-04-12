import { Sequelize } from 'sequelize-typescript';
import { Listing } from './entities/listing.entity';
import config from './config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config);
      sequelize.addModels([Listing]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
