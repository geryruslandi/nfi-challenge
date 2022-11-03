import Shell from 'shelljs'

export function migrate(done: any) {
    Shell.exec('yarn migrate', {silent: true}, () => done())

}

export function rollback(done: any) {
    Shell.exec('yarn rollback', {silent: true}, () => done())
}
