import { DataSourceOptions } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL_TYPEORM,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions;
