import { Sequelize } from 'sequelize-typescript';
import config from '@src/config/database'

let sequelize: Sequelize;
sequelize =  new Sequelize(config);

export { config, sequelize };
