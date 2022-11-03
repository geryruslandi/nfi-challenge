import Shell from 'shelljs'

export function migrate(done: any) {
    Shell.exec('export APP_ENV=test && yarn migrate', {silent: true}, () => done())

}

export function rollback(done: any) {
    Shell.exec('export APP_ENV=test && yarn rollback', {silent: true}, () => done())
}
