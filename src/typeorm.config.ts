import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  logging: true,
  migrationsRun: false,
  migrationsTableName: 'migration',
  migrations: [__dirname + '../../migrations/**/*.ts', __dirname + '../../migrations/**/*.js'],
  synchronize: false,
};

export const appDataSource = new DataSource(typeOrmConfig);

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
