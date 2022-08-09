import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === 'production'
            ? '.prod.env' : '.dev.env'
    )
});

module.exports = {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DEV_DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
}