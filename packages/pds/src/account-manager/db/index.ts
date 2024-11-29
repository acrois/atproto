import { Database, Migrator } from '../../db'
import { DatabaseSchema } from './schema'
import migrations from './migrations'

export * from './schema'

export type AccountDb = Database<DatabaseSchema>

export const getDb = async (
  location: string,
  disableWalAutoCheckpoint = false,
): Promise<AccountDb> => {
  const pragmas: Record<string, string> = disableWalAutoCheckpoint
    ? { wal_autocheckpoint: '0' }
    : {}
  return await Database.sqlite(location, { pragmas })
}

export const getMigrator = (db: AccountDb) => {
  return new Migrator(db.db, migrations)
}
