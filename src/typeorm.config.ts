import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig = {
  type: 'postgres',
  // TODO fix: make env available to typeorm migrations generator
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: +process.env.POSTGRES_PORT ?? 5432,
  username: process.env.DATABASE_USER ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  database: process.env.DATABASE_NAME ?? 'rest_service',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  migrationsTableName: 'migration',
  migrations: [__dirname + '../../migrations/**/*.ts', __dirname + '../../migrations/**/*.js'],
  synchronize: false,
  logging: true,
} satisfies DataSourceOptions;

export const appDataSource = new DataSource(typeOrmConfig);

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
