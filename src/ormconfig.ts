import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import AppConfig from './app.config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const { databaseOptions } = new AppConfig().build();

export const ormConfig: MysqlConnectionOptions = {
  username: databaseOptions.user,
  password: databaseOptions.password,
  type: 'mysql',
  port: databaseOptions.dbPort,
  host: databaseOptions.endpoint,
  logging: true,
  database: databaseOptions.dbName,
  synchronize: databaseOptions.tableSchemaAutoupdate,
  migrationsTableName: 'migrations',
  migrationsRun: false,
  maxQueryExecutionTime: 3000,
  entities: ['dist/handlers/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  ssl: process.env.SLL === 'true' ? { rejectUnauthorized: false } : false,
  namingStrategy: new SnakeNamingStrategy(),
};

const ormDataSource = new DataSource(ormConfig);

export default ormDataSource;
