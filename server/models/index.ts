import { Sequelize } from 'sequelize';
import { config } from '../config/config';

export const sequelize = new Sequelize(
    String(config.database),
    String(config.username),
    String(config.password),
    {
        host: config.host,
        port: Number(config.port),
        dialect: 'mysql',
        timezone: '+09:00'
    }
)