import {SequelizeStorage, Umzug} from 'umzug'
import {sequelize} from '@src/SequelizeInit'

const umzug = new Umzug({
    migrations: { glob: 'migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

export async function migrate() {
    await umzug.up();

}

export async function rollback() {
    await umzug.down({ to: 0 })
}
