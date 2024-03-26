import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const typeOrmConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST_DATASOURCE,
  port: +process.env.POSTGRES_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  migrationsTableName: 'migration',
  migrations: [__dirname + '../../migrations/**/*.ts', __dirname + '../../migrations/**/*.js'],
  synchronize: false,
  logging: true,
} satisfies DataSourceOptions;

export const appDataSource = new DataSource(typeOrmConfig);
