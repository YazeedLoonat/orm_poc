import { SequelizeOptions } from 'sequelize-typescript';
import { Listing } from './entities/listing.entity';

export default {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yazeedloonat',
  password: '',
  database: 'ormtrialdb_sequelize',
  models: [Listing],
} as SequelizeOptions;
