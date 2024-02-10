import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: process.env.DB_DRIVER as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.AUTH_DB_NAME,
  entities: ['apps/authentication/entities/**/*.*'],
  migrations: ['apps/authentication/migrations/**/*.*'],
});

export default AppDataSource;
