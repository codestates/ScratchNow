import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: 'mysql',
  timezone: '+09:00',
};
