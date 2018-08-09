import mysqlDb, { close } from './';

describe('mysqlDb', () => {
  describe('.connect', () => {
    it('connects to mysql database', async () => {
      const db = mysqlDb({
        client: 'mysql',
        connection: {
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'locatemedb',
        }
      });
      const actual = await db.schema.hasTable('companies');

      expect(actual).toBe(true);
      // node process won't exit while sockets are still connected
      close(db);
    });

    it('connects to locatemedb database by default', async () => {
      const db = mysqlDb();
      const actual = await db.schema.withSchema('locatemedb').hasTable('companies');

      expect(actual).toBe(true);
      close(db);
    });
  });
});
