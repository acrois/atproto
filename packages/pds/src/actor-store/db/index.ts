import { DatabaseSchema } from './schema'
import { Database, Migrator } from '../../db'
import migrations from './migrations'
export * from './schema'

export type ActorDb = Database<DatabaseSchema>

export const getDb = async (
  location: string,
  disableWalAutoCheckpoint = false,
): Promise<ActorDb> => {
  const pragmas: Record<string, string> = disableWalAutoCheckpoint
    ? { wal_autocheckpoint: '0' }
    : {}
  return await Database.sqlite(location, { pragmas })
}

export const getMigrator = (db: Database<DatabaseSchema>) => {
  return new Migrator(db.db, migrations)
}
